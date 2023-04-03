const User = require('./User');
const Post = require('./Project');
const Comment = require('./Project');



User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


Post.hasMany(Comment, 

    )

Comment.belongsTo(Post,

    )


Comment.belongsTo(User, 
    
    )

User.hasMany(Comment, 
    
    )

module.exports = { User, Project };