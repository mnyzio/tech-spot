const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

// Show homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }, { model: User, attributes: { exclude: ["password"] }}],      
    });

    const posts = await postData.map(post => post.get({ plain: true }));
    console.log("🚀 ~ file: homeRoutes.js:8 ~ router.get ~ posts:", posts)

    res.render('homepage',
      {
        posts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        user_name: req.session.user_name
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
})

// Show dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('homepage');
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;