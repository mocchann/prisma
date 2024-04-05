const { PrismaClient } = require("@prisma/client");

const express = require("express");
const app = express();
const PORT = 8000;

const prisma = new PrismaClient();
app.use(express.json());

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

app.listen(PORT, () => {
  console.log("server 起動中...");
});
