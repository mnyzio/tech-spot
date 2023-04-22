const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Views = require('./Views');

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.belongsToMany(User, {
  through: {
    model: Views,
  },
  foreignKey: "post_id",
});

User.belongsToMany(Post, {
  through: {
    model: Views,
  },
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment, Views };