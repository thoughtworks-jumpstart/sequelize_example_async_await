const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const BlogModel = require("./models/blog");
const TagModel = require("./models/tag");

const sequelize = new Sequelize("test-db-1", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false
});

const User = UserModel(sequelize, Sequelize);

const BlogTag = sequelize.define("blog_tag", {});
const Blog = BlogModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

Blog.belongsToMany(Tag, { through: BlogTag, unique: false });
Tag.belongsToMany(Blog, { through: BlogTag, unique: false });
Blog.belongsTo(User);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Blog,
  Tag
};
