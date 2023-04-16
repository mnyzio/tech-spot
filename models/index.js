const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Answer, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Answer.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Answer, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Answer.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };