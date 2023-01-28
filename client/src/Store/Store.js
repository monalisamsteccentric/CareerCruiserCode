import {configureStore} from '@reduxjs/toolkit'
import dataReducer from '../Features/DataSlice'
import messageReducer from '../Features/MessageSlice'
import authReducer from '../Features/AuthSlice'
import userReducer from '../Features/UserSlice'




export const store = configureStore({
    reducer: {
       data: dataReducer,
       messages: messageReducer,
       auth: authReducer,
       user: userReducer,
    }
})
