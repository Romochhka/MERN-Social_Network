import React from 'react';
import {useDispatch} from "react-redux";
import {createPost} from "../redux/features/post/postSlice.js";
import {useNavigate} from "react-router-dom";

const AddPostPage = () => {
	const [title, setTitle] = React.useState('');
	const [text, setText] = React.useState('');
	const [image, setImage] = React.useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = () => {
		try {
			const data = new FormData();
			data.append("title", title);
			data.append("text", text);
			data.append("image", image);
			dispatch(createPost(data))
			navigate('/')
		} catch (error) {
			console.log(error);
		}
	}
	const clearFormHandler = () => {
		setTitle('');
		setText('')
	}

	return <form className="w-1/3 mx-auto py-10"
	onSubmit={(e) => {e.preventDefault();}}
	>
		<label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
			Прикрепить изображение:
		<input type = "file" className='hidden' onChange={e => setImage(e.target.files[0])}/>
		</label>
		<div className='flex object-cover py-2'>
			{ image && (
				<img src={URL.createObjectURL(image)} alt={image.name} />
			) }
		</div>

		<label className='text-xs text-white opacity-70'>
			Заголовок поста:
			<input
				type = "text"
				value = {title}
				onChange={e => setTitle(e.target.value)}
				placeholder='Заголовок'
				className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
			/>
		</label>
		<label className='text-xs text-white opacity-70'>
			Текст поста:
			<textarea
				placeholder='Текст поста'
				onChange={e => setText(e.target.value)}
				value={text}
				className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
			/>
		</label>
		<div className="flex gap-8 items-center justify-center mt-4">
			<button
				type='submit'
			onClick={submitHandler}
				className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
				Добавить
			</button>
			<button
				onClick={clearFormHandler}
				className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
				Отменить
			</button>
		</div>
	</form>
};

export default AddPostPage;