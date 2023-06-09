const router = require("express").Router();
const { User } = require("../models");

// Displays login page
router.get("/login", (req, res) => {  
  try {
    res.render("login");
  } catch (err) {
    res.status(404).json(err);
  }
});

// Displays signup page
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(404).json(err);
  }
});

// Handles user regitration
router.post("/signup", async (req, res) => {
  try {
    // Check to see if provided e-mail already exists in database
    const users = await User.findOne({
      where: {
        email: req.body.email
      }            
    });

    // If e-mail found return else create new account
    if (users) {
      res.status(400).json({message: "User already exists."});
      return
    }    

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.user_id;
      req.session.user_name = userData.name;

      res.status(200).json(userData);
    });  
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handles login validation
router.post("/login", async (req, res) => {  
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.user_id;
      req.session.user_name = userData.name;

      console.log("You are now logged in!");
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deletes session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;