import axios from 'axios'
import { handleError } from '../Helpers/ErrorHandle'
import { Buser, Buu, LoginBuser, Ret } from '../types'

const apiURL = 'https://joaolubaw.pythonanywhere.com/'

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<LoginBuser>(apiURL + 'api/token/', {
      username: username,
      password: password
    })

    console.log(data)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const fetchBuserData = async (token: string) => {
  try {
    const response = await axios.get(apiURL + 'busers/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userData = response.data
    console.log(userData)

    localStorage.setItem('buser', JSON.stringify(userData))
  } catch (error) {
    console.error('Erro ao obter os dados do usuário:', error)
  }
}

export const registerAPI = async (
  email: string,
  password: string,
  name: string,
  username: string,
  birthdate: string,
  buus_received: Buu[],
  description: string,
  liked: Ret[],
  rets: Ret[],
  telephone?: string
) => {
  try {
    const data = await axios.post<Buser>(apiURL + 'busers/', {
      email: email,
      password: password,
      name: name,
      username: username,
      birthdate: birthdate,
      buus_received: buus_received,
      description: description,
      liked: liked,
      rets: rets,
      telephone: telephone
    })

    return data
  } catch (error) {
    handleError(error)
  }
}
