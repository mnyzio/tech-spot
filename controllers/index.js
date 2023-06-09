const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const postRoutes = require("./posts/postRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./comments/commentRoutes");


router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Fallback route for when a user attempts to visit routes that don't exist
router.get('*', (req, res) => {
    res.render('unknown', {
        logged_in: req.session.logged_in,
        session_user_id: req.session.user_id,
        session_user_name: req.session.user_name
    },
    )
});

module.exports = router;