import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Buser } from '../types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://joaolubaw.pythonanywhere.com/',
    prepareHeaders: (headers, { getState }) => {
      // Recuperando o token do localStorage
      const token = localStorage.getItem('token')

      // Se houver um token, adicione-o ao cabeçalho de autorização
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    getBusers: builder.query({
      query: () => 'busers/'
    }),
    getaBuser: builder.query<Buser, string>({
      query: (username) => `busers/${username}/`
    }),
    getRets: builder.query({
      query: () => 'rets/'
    }),
    getBuus: builder.query({
      query: () => 'buus/'
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
    })
  })
})

export const {
  useGetBusersQuery,
  useGetaBuserQuery,
  useGetRetsQuery,
  useGetBuusQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useSendBuuMutation,
  useMakeRetMutation,
  useUpdateBuuMutation
} = api

export default api
