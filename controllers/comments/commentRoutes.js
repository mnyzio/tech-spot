const router = require('express').Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        // Update comment count
        const toPost = await Post.findByPk(req.body.post_id);

        toPost.post_comment_count += 1;
        await toPost.save();

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;