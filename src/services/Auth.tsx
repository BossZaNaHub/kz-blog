"use client"

import { ReactNode, createContext, useContext} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Login, User, UserAuthentication, clientLogin, clientLogout } from "./user"
import { RootStore } from "."
import { useRouter } from "next/navigation"

interface AuthProviderConfig {
    children: ReactNode
}

type AuthProviderContext = {
    user: UserAuthentication | null
    isAuthenticated: boolean
    login: (data: Login) => void
    logout: () => void
}

const AuthContext = createContext<AuthProviderContext | null>({
    user: null,
    isAuthenticated: false,
    login: (data: Login) => {},
    logout: () => {}
})

export const AuthProvider = ({ children }: AuthProviderConfig) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state: RootStore) => state.user.data)
    const isAuthenticated = useSelector((state: RootStore) => state.user.isAuthenticated)

    const login = (data: Login) => {
        console.log("...login", data)
        dispatch(clientLogin(login))
    }

    const logout = () => {
        console.log("...logout")
        dispatch(clientLogout())
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
      }
    return context
}