import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserSlice = createSlice({
    name: 'updateSlice',
    initialState: {},
    reducers: {
        setUpdateUser:(state, action)=>{
            const updateUser = action.payload
            return updateUser
        }
    }
})



export const { setUpdateUser } = updateUserSlice.actions
export default updateUserSlice.reducer;
