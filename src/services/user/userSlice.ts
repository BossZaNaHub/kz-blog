import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit'
import { User, UserAuthentication } from './model'
import { clientLogin } from '.'

interface UserState {
    data: UserAuthentication | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    // error: SerializedError | null
}

// Async thunk for API call
const initialState: UserState = {
    data: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        clientLogout: (state) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(clientLogin.pending, (state) => {
                // console.log('pending: ', state)
                state.isLoading = true
                state.error = null
                state.data = null
                state.isAuthenticated = false
            })
            .addCase(clientLogin.fulfilled, (state, action) => {
                // console.log('fulfilled: ', state, action.payload)
                state.isLoading = false
                const { payload } = action
                console.log('payload: ', payload)
                if (payload.code == 0) {
                    let userData = payload.data as UserAuthentication
                    state.data = userData
                    state.isAuthenticated = true
                } else {
                    state.error =  payload.message
                }
            })
            .addCase(clientLogin.rejected, (state, action) => {
                console.log('rejected error: ', state, action)
                state.isLoading = false
                const { payload } = action
                
                // state.error =  payload.message
            })
    }
})

export default userSlice.reducer