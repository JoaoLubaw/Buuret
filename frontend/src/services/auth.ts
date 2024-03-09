import axios from 'axios'
import { handleError } from '../Helpers/ErrorHandle'
import { Buser, Buu, Ret } from '../types'

const apiURL = 'http://joaolubaw.pythonanywhere.com/'

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<Buser>(apiURL + 'api/token/', {
      email: email,
      password: password
    })

    return data
  } catch (error) {
    handleError(error)
  }
}

export const registerAPI = async (
  email: string,
  password: string,
  name: string,
  username: string,
  birthdate: string,
  buus_received: Buu[],
  description: '',
  liked: Ret[],
  telephone?: string
) => {
  try {
    const data = await axios.post<Buser>(apiURL + 'busers/', {
      email: email,
      password: password,
      name: name,
      username: username,
      birthdate: birthdate,
      telephone: telephone,
      buus_received: [] as Buu[],
      description: '',
      liked: [] as Ret[]
    })

    return data
  } catch (error) {
    handleError(error)
  }
}
