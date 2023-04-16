const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ raw: true });
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



module.exports = router;