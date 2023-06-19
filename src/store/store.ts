import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userSlice } from './features/userSlice';

const store = configureStore({
	reducer: userSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useStoreDispatch: () => typeof store.dispatch = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
