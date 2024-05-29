import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  return c.text("Sign Up");
});

app.post("/api/v1/signin", (c) => {
  return c.text("Sign In");
});

app.post("/api/v1/blog", (c) => {
  return c.text("post");
});

app.put("/api/v1/blog", (c) => {
  return c.text("put");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("get id");
});

export default app;
