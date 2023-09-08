import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import api from '../api'
import { User, Login, UserAuthentication } from './model'
import { Response as BaseResp } from '../common'

const clientLogin = createAsyncThunk(
    'login/fetch', 
    async (loginData: Login) => {
        try {
            const response = await api.post('/v1/client/login', loginData)
            return response.data as BaseResp
        } catch (error) {
            throw error   
        }
    }
)

const userProfile = createAsyncThunk('profile/fetch', async () => {
    const response = await api.get('/v1/user/profile')
    if (!response.ok) {
        throw new Error(response.problem)
    }
    return response.data
})

export { clientLogin, userProfile }