import Post from '../models/Post.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create Post
export const createPost = async (req, res) => {
	try {
		const { title, text } = req.body;
		const user = await User.findById(req.userId);

		let fileName = '';
		if (req.files && req.files.image) {
			fileName = Date.now().toString() + req.files.image.name;
			const __dirname = dirname(fileURLToPath(import.meta.url));
			await req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
		}

		const newPost = new Post({
			username: user.username,
			title,
			text,
			imgUrl: fileName,
			author: req.userId,
		});

		await newPost.save();

		await User.findByIdAndUpdate(req.userId, {
			$push: { posts: newPost._id },
		});

		return res.status(201).json(newPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'что-то пошло не так' });
	}
};

//get All Posts
export const getAll = async (req, res) => {
	try {
		const posts = await Post.find().sort('-createdAt')
		const popularPosts = await Post.find().limit(5).sort('-views')
		if (!posts) {
			return res.json({ message: 'Постов нет'})
		}
		res.json({posts, popularPosts});
	} catch (error) {
		res.json({ message: 'Что-то пошло не так.'})
	}
}

//get by Id
export const getById = async (req, res) => {
	try {
		const post = await Post.findOneAndUpdate(
			{ _id: req.params.id },
			{ $inc: { views: 1 } },
			{ new: true }
		)

		if (!post) return res.status(404).json({ message: 'Пост не найден' })

		res.json(post)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так.' })
	}
}
