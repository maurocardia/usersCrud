import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setProducts:(state, action)=>{
            const user = action.payload
            return user
        }
    }
})
export const getUsersThunk = () => (dispatch) => {
    return axios.get("https://gorest.co.in/public/v2/users",getConfig())
        .then((res) => dispatch(setProducts(res.data)))
        
}



export const { setProducts } = userSlice.actions;

export default userSlice.reducer;
