import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://joaolubaw.pythonanywhere.com/'
  }),
  endpoints: (builder) => ({
    getBusers: builder.query({
      query: () => 'busers/'
    }),
    getaBuser: builder.query({
      query: (id) => `busers/${id}/`
    }),
    getRets: builder.query({
      query: () => 'rets/'
    }),
    getBuus: builder.query({
      query: () => 'buus/'
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
      query: ({ id, newData }) => ({
        url: `busers/${id}/`,
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
  useMakeRetMutation
} = api

export default api
