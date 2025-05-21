import { Router } from "express";
import fileUpload from "express-fileupload";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost,getAll, getById,getMyPosts,removePost, updatePost,getPostComments} from "../controllers/posts.js";

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

// Get Post Comments
router.get('/comments/:id', getPostComments);

// Update Post
router.put('/:id',checkAuth, fileUpload(), updatePost);

export default router;
