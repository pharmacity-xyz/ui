import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { logInApi, signUpApi } from 'services/auth/authServices'
import { ISignUpApiData } from 'services/auth/types'

export const AUTH_ACTION = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
}

interface IAuthContext {
  token: string | null
  loginError: boolean
  login: (emailAddress: string, pass: string) => Promise<void>
  register: (req: ISignUpApiData) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  const register = async (req: ISignUpApiData) => {
    try {
      if (req.password !== req.confirmPassword) {
        toast.error('Password and Confirm Passowrd does not match')
        return
      }

      await signUpApi(req)
      router.push('/login')
      toast.success('Successfully created')
    } catch (error) {
      console.error(error)
      toast.error('Register Failed')
    }
  }

  const login = async (emailAddress, pass) => {
    try {
      const res = await logInApi({
        email: emailAddress,
        password: pass,
      })

      console.log()

      setToken(res.data)

      localStorage.setItem('token', res.data)

      router.push('/')
      setLoginError(false)
    } catch (e) {
      setLoginError(true)
    }
  }

  const logout = () => {
    setToken(null)

    localStorage.removeItem('token')

    if (router.pathname === '/') {
      window.location.reload()
    }

    router.push('/')
    toast.success('Signed Out')
  }

  return (
    <AuthContext.Provider
      value={{ login, register, logout, token, loginError }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context as IAuthContext
}
