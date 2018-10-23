const BlogModel = (sequelize, type) => {
  return sequelize.define('blog', {
    id:{
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: type.STRING
  })
}

module.exports = BlogModel;