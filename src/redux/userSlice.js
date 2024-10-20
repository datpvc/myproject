import { createSlice } from '@reduxjs/toolkit';
import { userInfoLocal } from '../services/local.service';

let initialState = {
  userInfo: userInfoLocal.get(),
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
