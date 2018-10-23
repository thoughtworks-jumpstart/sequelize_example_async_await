const express = require("express");

// dependencies
const { User, Blog, Tag } = require("./sequelize");

const app = express();
app.use(express.json());

// API ENDPOINTS

// create a user
app.post("/api/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
// get all users
app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get("/api/tags", async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

// create a blog post
app.post("/api/blogs", async (req, res, next) => {
  const body = req.body;
  try {
    // either find a tag with name or create a new one
    const tags = body.tags.map(tag =>
      Tag.findOrCreate({
        where: { name: tag.name },
        defaults: { name: tag.name }
      }).spread((tag, created) => tag)
    );

    const retrievedUser = await User.findById(body.userId);
    if (retrievedUser) {
      const createdBlog = await Blog.create(body);
      const resolvedTags = await Promise.all(tags);
      await createdBlog.addTags(resolvedTags);
      const blogWithTags = await Blog.findOne({
        where: { id: createdBlog.id },
        include: [User, Tag]
      });
      res.json(blogWithTags);
    } else {
      res
        .status(400)
        .json({ err: `User with id = [${body.userId}] doesn\'t exist.` });
    }
  } catch (error) {
    next(error);
  }
});

// find blogs belonging to one user or all blogs
app.get("/api/blogs/:userId?", async (req, res) => {
  let query;
  if (req.params.userId) {
    query = Blog.findAll({
      include: [
        { model: User, where: { id: req.params.userId } },
        { model: Tag }
      ]
    });
  } else {
    query = Blog.findAll({ include: [Tag, User] });
  }
  const blogs = await query;
  res.json(blogs);
});

// find blogs by tag
app.get("/api/blogs/tags/:tag", async (req, res) => {
  const blogs = await Blog.findAll({
    include: [{ model: Tag, where: { name: req.params.tag } }]
  });

  res.json(blogs);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
