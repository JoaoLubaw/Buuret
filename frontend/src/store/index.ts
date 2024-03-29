import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import api from '../services/api'
import buus_receivedReducer from './reducers/BuusReceivedReducer'

const store = configureStore({
  reducer: {
    buus: buus_receivedReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export default store

// Defina o tipo RootState para tipagem
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
