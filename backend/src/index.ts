import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());
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
