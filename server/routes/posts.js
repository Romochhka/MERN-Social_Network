import { Router } from "express";
import fileUpload from "express-fileupload";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost,getAll, getById } from "../controllers/posts.js";

const router = new Router();
// Create Post
router.post('/', checkAuth, fileUpload(), createPost);

// Get All Posts
router.get('/', getAll);

// Get by Id
router.get('/:id', getById);

export default router;
