import { configureStore } from '@reduxjs/toolkit'
import  updateUserSlice  from './slices/updateUser.slice'
import  userSlice from './slices/users.slice'

export default configureStore({
  reducer: {
    users: userSlice,
    updateUser: updateUserSlice
	}
})