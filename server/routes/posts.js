import { Router } from "express";
import fileUpload from "express-fileupload";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost,getAll, getById,getMyPosts,removePost } from "../controllers/posts.js";

const router = new Router();
// Create Post
router.post('/', checkAuth, fileUpload(), createPost);

// Get All Posts
router.get('/', getAll);

// Get by Id
router.get('/:id', getById);

// Get My Posts
router.get('/user/me',checkAuth, getMyPosts);

// Remove Post
router.delete('/:id',checkAuth, removePost);

export default router;
