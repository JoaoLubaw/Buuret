import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Buser, Ret } from '../types'
import Cookies from 'js-cookie'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://joaolubaw.pythonanywhere.com/',
    prepareHeaders: (headers, { getState }) => {
      // Recuperando o token do localStorage
      const token = localStorage.getItem('token')
      const csrftoken = Cookies.get('csrftoken')

      console.log('csrf:   ' + csrftoken)

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
    getTimeline: builder.query<Ret[], string>({
      query: () => `rets/timeline/`
    }),
    getaBuser: builder.query<Buser, string>({
      query: (username) => `busers/${username}/`
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
  useUnfollowMutation
} = api

export default api
