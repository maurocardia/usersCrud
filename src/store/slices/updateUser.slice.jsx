import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { getUsersThunk } from "./users.slice";

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {},
  reducers: {
    setUpdateUser: (state, action) => {
      const updateUser = action.payload;
      return updateUser;
    },
  },
});

export const getUserIdThunk = (id) => (dispatch) => {
  return axios
    .get(`https://gorest.co.in/public/v2/users/${id}`, getConfig())
    .then((res) => dispatch(setUpdateUser(res.data)))
    .catch((error) => console.log(error));
};

export const deleteUserThunk = (id) => (dispatch) => {
  return axios
    .delete(`https://gorest.co.in/public/v2/users/${id}`, getConfig())
    .then((res) => dispatch(getUsersThunk()))
    .catch((error) => console.log(error));
};

export const { setUpdateUser } = updateUserSlice.actions;

export default updateUserSlice.reducer;
