import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create Post
export const createPost = async (req, res) => {
	try {
		const { title, text } = req.body
		const user = await User.findById(req.userId)

		let fileName = ''
		if (req.files && req.files.image) {
			fileName = Date.now().toString() + req.files.image.name
			const __dirname = dirname(fileURLToPath(import.meta.url))
			await req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
		}

		const newPost = new Post({
			username: user.username,
			title,
			text,
			imgUrl: fileName,
			author: req.userId,
		})

		await newPost.save()

		await User.findByIdAndUpdate(req.userId, {
			$push: { posts: newPost._id },
		})

		return res.status(201).json(newPost)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так' })
	}
}

// Get All Posts
export const getAll = async (req, res) => {
	try {
		const posts = await Post.find().sort('-createdAt')
		const popularPosts = await Post.find().limit(5).sort('-views')

		if (!posts) {
			return res.json({ message: 'Постов нет' })
		}

		res.json({ posts, popularPosts })
	} catch (error) {
		res.status(500).json({ message: 'Что-то пошло не так.' })
	}
}

// Get By Id
export const getById = async (req, res) => {
	try {
		const post = await Post.findOneAndUpdate(
			{ _id: req.params.id },
			{ $inc: { views: 1 } },
			{ new: true }
		)

		if (!post) {
			return res.status(404).json({ message: 'Пост не найден' })
		}

		res.json(post)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так.' })
	}
}

// Get My Posts
export const getMyPosts = async (req, res) => {
	try {
		const user = await User.findById(req.userId)
		const list = await Promise.all(
			user.posts.map((post) => {
				return Post.findById(post._id)
			})
		)

		res.json(list)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так.' })
	}
}

// Remove post
export const removePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id)
		if(!post) return res.json({message: 'Такого поста не существует'})

		await User.findByIdAndUpdate(req.userId, {
			$pull: { posts: req.params.id },
		})

		res.json({ id: req.params.id })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так.' })
	}
}

export const updatePost = async (req, res) => {
	try {
		const { title, text, id } = req.body
		const post = await Post.findById(req.params.id)

		if (req.files && req.files.image) {
			let fileName = Date.now().toString() + req.files.image.name
			const __dirname = dirname(fileURLToPath(import.meta.url))
			await req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
			post.imgUrl = fileName || ''
		}

		post.title = title
		post.text = text

		await post.save()

		res.json(post )
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так.' })
	}
}

// Get Post Comments
export const getPostComments = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) return res.status(404).json({ message: 'Пост не найден' })

		const comments = await Comment.find({
			_id: { $in: post.comments }
		}).sort('-createdAt')

		res.json(comments)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Не удалось получить комментарии' })
	}
}



