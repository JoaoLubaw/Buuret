import React, { createContext, useEffect, useState } from 'react'
import { Buser, Buu, Ret } from '../types'
import { useNavigate } from 'react-router-dom'
import {
  fetchBuserData,
  getBuserData,
  loginAPI,
  registerAPI
} from '../services/auth'
import { toast } from 'react-toastify'
import axios from 'axios'

type BuserContextType = {
  buser: Buser | null
  token: string | null
  registerBuser: (
    email: string,
    password: string,
    name: string,
    username: string,
    birthdate: string,
    buus_received: Buu[],
    description: string,
    liked: Ret[],
    rets: Ret[],
    telephone?: string | undefined
  ) => void
  loginBuser: (username: string, password: string) => void
  logout: () => void
  isLoggedIn: () => boolean
}

type Props = { children: React.ReactNode }

const BuserContext = createContext<BuserContextType>({} as BuserContextType)

export const BuserProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [buser, setBuser] = useState<Buser | null>(null)

  useEffect(() => {
    const buser = localStorage.getItem('buser')
    const token = localStorage.getItem('token')
    if (buser && token) {
      setBuser(JSON.parse(buser))
      setToken(token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
    setIsReady(true)
  }, [])

  const registerBuser = async (
    email: string,
    password: string,
    name: string,
    username: string,
    birthdate: string,
    buus_received: Buu[],
    description: string,
    liked: Ret[],
    rets: Ret[],
    telephone?: string | undefined
  ) => {
    await registerAPI(
      email,
      password,
      name,
      username,
      birthdate,
      buus_received,
      description,
      liked,
      rets,
      telephone
    ).then((res) => {
      if (res) {
        if (res && res.data && res.data.token) {
          localStorage.setItem('token', res.data.token)
        }

        const buserObj = {
          email: res?.data.email,
          password: res?.data.password,
          name: res?.data.name,
          username: res?.data.username,
          birthdate: res?.data.birthdate,
          buus_received: res?.data.buus_received,
          description: res?.data.description,
          liked: res?.data.liked,
          rets: res?.data.rets,
          telephone: res?.data.telephone
        }
        localStorage.setItem('buser', JSON.stringify(buserObj))
        if (res && res.data && res.data.token !== undefined) {
          setToken(res.data.token)
        }
        toast.success('Cadastro pronto! Agora é só entrar.')
        navigate('/login')
      }
    })
  }

  const loginBuser = async (username: string, password: string) => {
    await loginAPI(username, password).then((res) => {
      if (res && res.data) {
        localStorage.setItem('token', res.data.access)
        setToken(res.data.access)

        localStorage.setItem('BuserUsername', username)
        fetchBuserData(res.data.access, username)
      }

      toast.success('Bem vindo!')
      navigate('/')
    })
  }

  const isLoggedIn = () => {
    return !!buser
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('buser')
    setBuser(null)
    setToken('')
    navigate('/login')
  }

  return (
    <BuserContext.Provider
      value={{
        loginBuser,
        buser,
        token,
        logout,
        isLoggedIn,
        registerBuser
      }}
    >
      {isReady ? children : null}
    </BuserContext.Provider>
  )
}

export const useAuth = () => React.useContext(BuserContext)
