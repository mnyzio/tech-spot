const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

// Show homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }, { model: User, attributes: { exclude: ["password"] } }],
    });

    const posts = await postData.map(post => post.get({ plain: true }));

    res.render('homepage',
      {
        posts,
        logged_in: req.session.logged_in,
        session_user_id: req.session.user_id,
        session_user_name: req.session.user_name
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
})

// Show dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {

    const userPosts = await User.findByPk(req.session.user_id,{
      attributes: { exclude: ["password"]},
      include: [{ model: Post }],
    });

    const posts = await userPosts.get({ plain: true });
    console.log("🚀 ~ file: homeRoutes.js:39 ~ router.get ~ posts:", posts)

    res.render('dashboard',
      { 
        ...posts,
        logged_in: req.session.logged_in,
        session_user_id: req.session.user_id,
        session_user_name: req.session.user_name
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;