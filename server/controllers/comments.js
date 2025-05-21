import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
	try {
		const { postId, comment } = req.body

		if (!comment) return res.status(400).json({ message: 'Комментарий пустой' })

		const newComment = new Comment({ comment, post: postId })
		await newComment.save()

		await Post.findByIdAndUpdate(postId, {
			$push: { comments: newComment._id },
		})

		res.status(201).json(newComment)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Что-то пошло не так' })
	}
}
