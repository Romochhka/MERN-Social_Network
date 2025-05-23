import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	username: { type: String },
	title: { type: String, required: true },
	text: { type: String, required: true },
	imgUrl: {type: String, default: ''},
	views: {type: Number, default: 0},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
	comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},
	{ timestamps: true },
	)
export default mongoose.model('Post', postSchema)