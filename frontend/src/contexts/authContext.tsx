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
import { SyncLoader } from 'react-spinners'
import { colors } from '../styles'

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
    telephone?: string | undefined,
    resetForm?: () => void,
    closeCreate?: () => void
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
  const [isLoading, setIsLoading] = useState(false)

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
    telephone?: string | undefined,
    resetForm?: () => void,
    closeCreate?: () => void
  ) => {
    const res = await registerAPI(
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
    )
    if (res && res.data && resetForm && closeCreate) {
      toast.success('Cadastro pronto! Agora é só entrar.')
      resetForm()
      closeCreate()
    } else {
      toast.error('O nome de usuário já está em uso. Por favor, escolha outro.')
    }
  }

  const fetchUserData = async (token: string, username: string) => {
    try {
      const userData = await fetchBuserData(token, username)
      setBuser(userData)
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    }
  }

  const isLoggedIn = () => {
    return !!buser
  }

  const loginBuser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password)
      if (res && res.data) {
        setIsLoading(true) // Ativar carregamento
        localStorage.setItem('token', res.data.access)
        setToken(res.data.access)
        await fetchUserData(res.data.access, username)
        setIsLoading(false) // Desativar carregamento
        toast.success('Bem vindo!')
        navigate('/')
      } else {
        toast.error('Usuário ou senha incorretos')
      }
    } catch (error) {
      setIsLoading(false) // Desativar carregamento em caso de erro
      toast.error('Erro ao fazer login. Tente novamente mais tarde.')
      console.error('Erro ao fazer login:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('buser')
    setBuser(null)
    setToken(null)
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
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <SyncLoader color={colors.blue} />
        </div>
      ) : (
        isReady && children
      )}
    </BuserContext.Provider>
  )
}

export const useAuth = () => React.useContext(BuserContext)
