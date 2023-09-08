"use client"

import { persistor, store } from "./store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { AuthProvider } from "./Auth"

export const ReduxProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={store}>    
            <PersistGate loading={null} persistor={persistor}>
                <AuthProvider>{children}</AuthProvider>
            </PersistGate>
        </Provider>
    )
}