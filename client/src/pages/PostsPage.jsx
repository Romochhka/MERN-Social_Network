import React, {useEffect} from 'react';
import axios from "../utils/axios.js";
import {PostItem} from '../components/PostItem.jsx';

export const PostsPage = () => {
	const [posts, setPosts] = React.useState([]);
	const fetchMyPosts = async () => {
		try {
			const { data } = await axios.get('/posts/user/me')
			setPosts(data)
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchMyPosts()
	},[])

	return <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>{posts?.map((post, index) => (
		<PostItem post={post} key={index} /> ))}
	</div>
}

export default PostsPage;