const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/Auth");
const router = express.Router();
// models
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//@Route    POST api/posts
//@desc     create posts
//@access   Private

router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // according to the token we will find the user
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
//@Route    Get api/posts
//@desc     Get all posts
//@access   Private only if you logged in

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@Route    Get api/posts/:d
//@desc     Get post by id
//@access   Private only if you logged in

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
});

//@Route    Delete api/posts/:d
//@desc     Delete post by id
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    // Check user only the user that has token can delete not all users
    if (post.user.toString() !== req.params.id) {
      return res.status(401).json({ msg: "User is not authorized" });
    }
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
});

//@Route    Put api/posts/like/:d
//@desc     Like a post
//@access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has already been liked by this user or no
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@Route    Put api/posts/unlike/:d
//@desc     unLike a post
//@access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has already been liked by this user or no
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post has not yet been liked" });
    }
    // Get remove index
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@Route    POST api/posts/comment/:id
//@desc     create comment for post
//@access   Private

router.post(
  "/comment/:id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // according to the token we will find the user
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@Route    Delete api/posts/comment/:id/:comment_id
//@desc     delete comment from the post
//@access   Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Get the comment from the post <Pull out comment>
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure exist
    if (!comment) {
      return res.status(404).json({ msg: "comment does not exist" });
    }
    // Make sure that the user who is deleting the comment same user who made a comment <Check user authorization>
    if (comment.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "user not authorized" });
    }
    // Get remove index
    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
