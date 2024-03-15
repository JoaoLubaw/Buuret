import React, { useEffect, useState } from 'react'
import { Buu as BuuType } from '../../types'
import Layout from '../../components/Layout'
import { MyBuusContainer } from './styles'
import Buu from '../../components/Buu'
import { fetchBuserData, getBuserData } from '../../services/auth'
import { useUpdateBuuMutation } from '../../services/api'

const MyBuus = () => {
  const [buus, setBuus] = useState<BuuType[]>([]) // Defina um estado para armazenar os Buus
  const token: string | null = localStorage.getItem('token')
  const [updateBuuMutation] = useUpdateBuuMutation() // Use o hook de mutação diretamente

  const handleOpenBuu = async (buuId: number) => {
    try {
      const buuToUpdate = buus.find((buu) => buu.id === buuId)

      const updatedBuu = { ...buuToUpdate, opened: true }
      await updateBuuMutation({ id: buuId, newData: updatedBuu })
    } catch (error) {
      console.error('Erro ao abrir o Buu:', error)
    }
  }

  useEffect(() => {
    const fetchBuus = async () => {
      try {
        if (token) {
          const userId = await fetchBuserData(token)
          const buusData = await getBuserData(token, userId)
          setBuus(buusData.buus_received)
        }
      } catch (error) {
        console.error('Erro ao obter os Buus:', error)
      }
    }

    fetchBuus()
  }, [token])

  return (
    <Layout page="buus">
      <MyBuusContainer>
        <header>
          <h2>Meus Buus</h2>
        </header>
        {buus.map((buu) => (
          <Buu
            key={buu.id}
            content={buu.content}
            handleOpen={() => handleOpenBuu(buu.id)}
            openned={buu.opened}
            id={buu.id}
          />
        ))}
      </MyBuusContainer>
    </Layout>
  )
}

export default MyBuus
