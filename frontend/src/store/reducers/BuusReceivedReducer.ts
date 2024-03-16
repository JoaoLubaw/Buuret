import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Buu } from '../../types'
import { useGetaBuserQuery } from '../../services/api'

interface BuusState {
  buus: Buu[] | null
}

// Estado inicial
const initialState: BuusState = {
  buus: null
}

const buusSlice = createSlice({
  name: 'buus',
  initialState,
  reducers: {
    setBuus: (state, action: PayloadAction<Buu[]>) => {
      state.buus = action.payload
    }
  }
})

export const { setBuus } = buusSlice.actions

export const fetchBuus = (username: string) => async (dispatch: any) => {
  const { data } = await useGetaBuserQuery(username)
  const buus = data?.buus_received || [] // Verifica se data é undefined e fornece um array vazio como padrão
  dispatch(setBuus(buus))
}

export default buusSlice.reducer
