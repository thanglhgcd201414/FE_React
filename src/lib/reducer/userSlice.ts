import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user.types';

export interface IUserState {
  userData: IUser | undefined;
}

const initialState: IUserState = {
  userData: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      state = { ...state, userData: action.payload };
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
