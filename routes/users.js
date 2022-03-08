const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

/* ------------------------------- update user ------------------------------ */
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).send(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if(user===null){
        return res.status(404).send("user do not exist")
      }
      res.status(200).send("user has been updated");
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    return res.status(403).send("You can update only your account!");
  }
});


  
  
/* ------------------------------- delete user ------------------------------ */

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const result=await User.findByIdAndDelete(req.params.id);
      if(result===null){
        res.status(404).send("user does not exist ")
      }
      res.status(200).send("Account has been deleted");
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    return res.status(403).send("You can delete only your account!");
  }
});



/* ------------------------------- get a user ------------------------------- */
 router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).send(other);
  } catch (err) {
    res.status(500).send(err);
  }
}); 

/* ------------------------------ follow a user ----------------------------- */

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userYWTF = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userYWTF.followers.includes(req.body.userId)) {
        await userYWTF.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("user has been followed");
      } else {
        res.status(403).send("you allready follow this user");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send("you cant follow yourself");
  }
}); 

/* ----------------------------- unfollow a user ---------------------------- */

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userYWUF = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (userYWUF .followers.includes(req.body.userId)) {
          await userYWUF.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).send("user has been unfollowed");
        } else {
          res.status(403).send("you dont follow this user");
        }
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send("you cant unfollow yourself");
    }
  });
 
module.exports = router;