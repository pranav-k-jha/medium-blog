import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

// Hono app with environment and variable types
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for JWT verification
blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = jwt.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(401);
    return c.json({ error: "unauthorized" });
    }
    //@ts-ignore
    c.set("userId", user.id);
    await next();
  } catch (e) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
});

// POST endpoint to create a blog
blogRouter.post("/", async (c) => {
  const authorId = c.get("userId");
  if (!authorId) {
    c.status(400);
    return c.json({ error: "User ID not found" });
  }

  // Initialize PrismaClient inside the handler
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  const body = await c.req.json();
  if (!body.title || !body.content) {
    c.status(400);
    return c.json({ error: "Title and content are required" });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
});

// GET endpoint to fetch all blogs
blogRouter.get("/bulk", async (c) => {
  // Initialize PrismaClient inside the handler
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany();
    return c.json({ blogs });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
});

export default blogRouter;
