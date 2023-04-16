const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage',
      {
        logged_in: req.session.logged_id,
        user_id: req.session.user_id,
        user_name: req.session.user_name
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router;