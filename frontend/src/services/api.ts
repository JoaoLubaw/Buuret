import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Buser, Buu, Ret } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useAuth } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://joaolubaw.pythonanywhere.com/',
    prepareHeaders: (headers, { getState }) => {
      // Recuperando o token do localStorage
      const token = localStorage.getItem('token')
      const csrftoken = Cookies.get('csrftoken')

      // Se houver um token, adicione-o ao cabeçalho de autorização
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      if (csrftoken) {
        headers.set('X-CSRFToken', csrftoken)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    getBusers: builder.query({
      query: () => ({
        url: 'busers/sugg/'
      })
    }),
    getaBuu: builder.query<Buu, number | undefined | null>({
      query: (id) => {
        if (typeof id === 'number') {
          return {
            url: `buus/${id}/`
          }
        } else {
          return ''
        }
      }
    }),

    getBuus: builder.query({
      query: () => ({
        url: 'buus/'
      })
    }),
    getTimeline: builder.query<Ret[], string>({
      query: () => `rets/timeline/`
    }),
    getaBuser: builder.query<Buser, string>({
      query: (username) => `busers/${username}/`
    }),
    getaRet: builder.query<Ret, string>({
      query: (id) => `rets/${id}/`
    }),
    getaBuserRets: builder.query<Ret[], string>({
      query: (username) => `rets/user/${username}/`
    }),
    updateBuu: builder.mutation({
      query: ({ id, newData }) => ({
        url: `buus/${id}/`,
        method: 'PUT',
        body: newData
      })
    }),
    createUser: builder.mutation({
      query: (buser) => ({
        url: 'users/',
        method: 'POST',
        body: buser
      })
    }),
    sendBuu: builder.mutation({
      query: (buu) => ({
        url: 'buus/',
        method: 'POST',
        body: buu
      })
    }),
    makeRet: builder.mutation({
      query: (ret) => ({
        url: 'rets/',
        method: 'POST',
        body: ret
      })
    }),
    makeReret: builder.mutation({
      query: (retID: string) => ({
        url: `rets/${retID}/reret/`,
        method: 'POST'
      })
    }),
    updateUser: builder.mutation({
      query: ({ username, newData }) => ({
        url: `busers/${username}/`,
        method: 'PUT',
        body: newData
      })
    }),
    follow: builder.mutation({
      query: (username) => ({
        url: `busers/${username}/follow/`,
        method: 'POST'
      })
    }),
    unfollow: builder.mutation({
      query: (username) => ({
        url: `busers/${username}/unfollow/`,
        method: 'POST'
      })
    }),
    likeRet: builder.mutation({
      query: (retID: string) => ({
        url: `rets/${retID}/like/`,
        method: 'POST'
      })
    }),
    searchBuser: builder.query({
      query: (search) => ({
        url: `busers/search/?q=${search}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetBusersQuery,
  useGetaBuserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useSendBuuMutation,
  useMakeRetMutation,
  useUpdateBuuMutation,
  useFollowMutation,
  useGetTimelineQuery,
  useUnfollowMutation,
  useGetBuusQuery,
  useLikeRetMutation,
  useGetaBuserRetsQuery,
  useGetaBuuQuery,
  useGetaRetQuery,
  useMakeReretMutation,
  useSearchBuserQuery
} = api

const logoutBuser = (navigate: any) => {
  localStorage.removeItem('token')
  localStorage.removeItem('buser')
  navigate('/login')
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Verifique se o erro é uma resposta 401
    if (error.response.status === 401) {
      const navigate = useNavigate()
      logoutBuser(navigate)
    }
    return Promise.reject(error)
  }
)

export default api
