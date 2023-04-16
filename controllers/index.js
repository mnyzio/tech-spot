const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
// const postRoutes = require("./posts");
const userRoutes = require("./userRoutes");


router.use('/', homeRoutes);
// router.use('/posts', postRoutes);
router.use('/', userRoutes);

// Fallback route for when a user attempts to visit routes that don't exist
router.get('*', (req, res) => {
    res.render('unknown', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        user_name: req.session.user_name
    },
    )
});

module.exports = router;