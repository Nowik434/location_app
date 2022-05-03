const User = require("../models/User");
const Users = require("../models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// GET
router.get("/", async (req, res) => {
  try {
    const users = await Users.find().select('username email firstName lastName long lat userType topics');;
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});



//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      long: req.body.long,
      lat: req.body.lat,
      userType: req.body.userType,
      topics: []
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password");

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password");

    //send response
    res.status(200).json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      long: user.long,
      lat: user.lat,
      userType: user.userType,
      topics: user.topics
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
