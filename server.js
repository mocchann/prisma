const { PrismaClient } = require("@prisma/client");

const express = require("express");
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    }
  });
  return res.json(post);
});

app.post("/", async (req, res) => {
  const { title, body } = req.body;
  const posts = await prisma.post.create({
    data: {
      title: title,
      body: body,
    },
  });
  return res.json(posts);
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const posts = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      body: body,
    },
  });
  return res.json(posts);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletePost = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(deletePost);
});

app.listen(PORT, () => {
  console.log("server 起動中...");
});
