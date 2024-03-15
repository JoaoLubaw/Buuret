import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Buser, Buu } from '../../types'
import { useGetaBuserQuery } from '../../services/api'
import { useAuth } from '../../contexts/authContext'

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
      const { buser } = useAuth()
      const buserID = buser?.id
      const { data, isLoading, isError } = useGetaBuserQuery(buserID)

      const getBuus = data.received_bus

      state.buus = action.payload
    }
  }
})

// Exporte as actions geradas pelo slice
export const { setBuus } = buusSlice.actions

// Exporte o reducer do slice
export default buusSlice.reducer
