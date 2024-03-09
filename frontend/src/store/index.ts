import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import api from '../services/api'

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false // Desabilitar verificação de serialização
    }).concat(api.middleware)
})

export default store

// Defina o tipo RootState para tipagem
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
