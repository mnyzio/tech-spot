const router = require('express').Router();
const { query } = require('express');
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

// Show support page
router.get('/support', async (req, res) => {
  try {   

    res.render('support',
      {        
        logged_in: req.session.logged_in,
        session_user_id: req.session.user_id,
        session_user_name: req.session.user_name
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Search route
router.get('/search/:query', async (req, res) => {
  try {   
    const searchPhrase = req.params.query;

    const searchedData = await Post.findAll({
      where: {
        post_title: {
          [Op.like]: `%${req.params.query}%`
        }
      },
      include: [{ model: Comment }, { model: User, attributes: { exclude: ["password"] } }],
    })
    const searched = await searchedData.map((e) => e.get({ plain: true }));
    console.log("🚀 ~ file: homeRoutes.js:83 ~ router.get ~ searched:", searched)
    
    res.render('searched_posts',
      {        
        searched,
        searchPhrase,
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