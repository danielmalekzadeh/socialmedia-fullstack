import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  followUser,
  getUser,
  updateUser,
  UnFollowUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id/follow", authMiddleware, followUser);
router.put("/:id/unfollow", authMiddleware, UnFollowUser);

export default router;
