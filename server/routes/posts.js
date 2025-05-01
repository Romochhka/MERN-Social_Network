import { Router } from "express";
import fileUpload from "express-fileupload";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost,getAll } from "../controllers/posts.js";

const router = new Router();
// Create Post
router.post('/', checkAuth, fileUpload(), createPost);

// Get All Posts
router.get('/', getAll);

export default router;
