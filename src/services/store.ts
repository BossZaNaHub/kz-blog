'use cliient'

interface Config {
    key: string
    storage: WebStorage
    version: number
}

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { 
    FLUSH, 
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    WebStorage,
    persistReducer,
    persistStore 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/userSlice'

const persistConfig: Config = {
    key: 'root',
    storage: storage,
    version: 1
}

const rootReducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            // },
        })
    },
})

export const persistor = persistStore(store)

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
