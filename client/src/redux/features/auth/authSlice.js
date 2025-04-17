import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
	user: null,
	token: null,
	isLoading: false,
	status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async (username,password) => try {
	const { data }= await axios.post('/auth/register', {
		username,
		password,
	})
	if (data.token) {
		window.localStorage.setItem('token', data.token)
	}
} catch (error) {
	console.log(error)
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
})

export default authSlice.reducer