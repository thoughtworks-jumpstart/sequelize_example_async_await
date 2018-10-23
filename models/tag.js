const TagModel = (sequelize, type) => {
  return sequelize.define('tag', {
    id:{
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING
  })
}

module.exports = TagModel;