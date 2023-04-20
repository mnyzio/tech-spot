const router = require('express').Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// Display new post form
router.get('/create', withAuth, async (req, res) => {
    try {
        res.render('create_post', {
            logged_in: req.session.logged_in,
            session_user_id: req.session.user_id,
            session_user_name: req.session.user_name
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Create new post
router.post('/create', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        if (!newPost) {
            res.status(400).json({message: "Post not added"});
            return;
        };

        res.render('dashboard', {
            logged_in: req.session.logged_in,
            session_user_id: req.session.user_id,
            session_user_name: req.session.user_name
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Display details for existing post
router.get('/:id', withAuth, async (req, res) => {
    try {
        // Look for post with id passed as query param
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ["password"] },                    
                },
                {
                    model: Comment,
                    include: [ { model: User } ],
                    attributes: { exclude: ["password"] },
                },                
            ],
        });
        
        // Update view count
        postData.post_view_count += 1;
        await postData.save();

        // If no result found return with message
        if (!postData) {
            res.status(404).json({ message: "Post not found" });
            return;
        };
        
        const post = await postData.get({ plain: true });
        console.log("🚀 ~ file: postRoutes.js:41 ~ router.get ~ post:", post)
        res.render('post', {
            post,
            logged_in: req.session.logged_in,
            session_user_id: req.session.user_id,
            session_user_name: req.session.user_name,
        });
        // res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
});


// Delete post by id
// Display details for existing post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Look for post with id passed as query param
        const deletedPost = await Post.destroy({
            where: {
                post_id: req.params.id, 
            },
        });
        
        // If no result found return with message
        if (!deletedPost) {
            res.status(404).json({ message: "Post not found" });
            return;
        };
        
        res.status(200).json(deletedPost)
    } catch (err) {
        res.status(500).json(err);
    }
});












module.exports = router;