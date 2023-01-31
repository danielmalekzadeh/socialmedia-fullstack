import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get User
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json({ message: "No such user exists." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(403)
      .json({ message: "Access Denied. you can only update your own profile" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId == id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(403)
      .json({ message: "Access denied. you can only delete your own page." });
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json({ message: "Action forbidden." });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { followings: id } });
        res.status(200).json({ message: "User followed!" });
      } else {
        res.status(403).json({ message: "User is already followed by you." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Unfollow a user
export const UnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json({ message: "Action forbidden." });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { followings: id } });
        res.status(200).json({ message: "User unfollowed!" });
      } else {
        res.status(403).json({ message: "User is not followed by you." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
