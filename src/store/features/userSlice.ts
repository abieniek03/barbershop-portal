import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axiosInstance';

export interface IUserData {
	user: {
		id?: string;
		email: string;
		firstName: string;
		lastName: string;
		password: string;
		passwordRepeat: string;
		rank: string;
	};
}

const initialState: IUserData = {
	user: {
		id: '',
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		passwordRepeat: '',
		rank: '',
	},
};

export const fetchUserData = createAsyncThunk('userdata/fetch', async (userID: string) => {
	try {
		const response = await axios.get(`/auth/${userID}`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			const { user } = action.payload;
			state.user = user;
		});
	},
});

export default userSlice.reducer;
