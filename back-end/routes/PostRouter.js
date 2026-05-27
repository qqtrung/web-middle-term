const express = require("express");

const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET || "trungvutru2k5_jwt_secret";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (typeof token !== "undefined") {
    jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
      if (err) {
        res.status(403).send("Invalid token");
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
}

const User = require("../db/model").User;
const Post = require("../db/model").Post;
const Comment = require("../db/model").Comment;

router.post("/login", async (req, res) => {

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  req.session.username = user.username;

  jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" }, (err, token) => {
    if (err)
      return res.status(500).send("Error generating token");
    res.json({ token });
  });

});

router.post("/logout", async (req, res) => {

  req.session.destroy((err) => {

    if (err) {
      res.status(500).send("Error logging out");
    }

    else {
      res.status(200).json({ message: "Logged out successfully" });
    }

  });

});

router.get("/stats/", async (req, res) => {

  try {
    const posts = await Post.find({});

    let userPostCount = {};

    for (let i = 0; i < posts.length; i++) {
      let username = posts[i].username;
      if (!userPostCount[username]) userPostCount[username] = { postCount: 1 };
      else userPostCount[username].postCount++;
    }

    res.send(userPostCount);
  }

  catch (error) {
    res.status(500).send(error);
  }

});

router.post("/newpost", async (req, res) => {

  try {

    const post = new Post({
      slug: req.body.slug,
      title: req.body.title,
      description: req.body.description,
      username: req.body.username
    });

    await post.save();
    res.send("OK");
  }
  catch (error) {
    res.status(500).send(error);
  }

});

router.get("/posts", async (req, res) => {

  try {
    const posts = await Post.find({});
    res.send(posts);
  }

  catch (error) {
    res.status(500).send({ error });
  }

});

router.get("/post/:slug", verifyToken, async (req, res) => {

  if (req.session.username) {

    try {

      const post = await Post.findOne({ slug: req.params.slug });
      const comments = await Comment.find();

      let commentOfPost = [];
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].slug == post.slug) {
          commentOfPost.push({
            username: comments[i].username,
            content: comments[i].content
          });
        }
      }

      res.send({
        post: post,
        commentOfPost: commentOfPost,
      });
    }

    catch (error) {
      res.status(500).send({ error });
    }
  }

  else {
    res.status(500).send("Unauthorized");
  }

});

router.post("/post/:slug/comment", verifyToken, async (req, res) => {

  if (req.session.username) {

    const comment = new Comment({
      username: req.body.username,
      slug: req.params.slug,
      content: req.body.content
    })

    await comment.save();
    res.send("OK");
  }

  else {
    res.status(500).send("Unauthorized");
  }

});

module.exports = router;
