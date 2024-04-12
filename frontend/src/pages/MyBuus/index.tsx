import React, { useEffect, useState } from 'react'
import { Buser, Buu as BuuType } from '../../types'
import Layout from '../../components/Layout'
import { MyBuusContainer } from './styles'
import Buu from '../../components/Buu'
import { useUpdateBuuMutation, useGetBuusQuery } from '../../services/api'
import PopMakeRet from '../../components/PopMakeRet'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'
import { SyncLoader } from 'react-spinners'
import { colors } from '../../styles'

const MyBuus = () => {
  const [buus, setBuus] = useState<BuuType[]>([])
  const token: string | null = localStorage.getItem('token')
  const [updateBuuMutation] = useUpdateBuuMutation()
  const { data, isLoading } = useGetBuusQuery(token)
  const [showPopMakeRet, setShowPopMakeRet] = useState(false)
  const [selectedBuu, setSelectedBuu] = useState<BuuType | null>(null)
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser

  //Resize

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 425)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 425)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //Resize

  function bloquearScroll() {
    document.body.style.overflow = 'hidden'
  }

  function desbloquearScroll() {
    document.body.style.overflow = ''
  }

  const openPopMakeRet = (BuuSelected: BuuType) => {
    setShowPopMakeRet(true)
    setSelectedBuu(BuuSelected)
    bloquearScroll()
  }

  const closePopMakeRet = () => {
    setShowPopMakeRet(false)
    desbloquearScroll()
  }

  const handleOpenBuu = async (buuId: number) => {
    try {
      const buuToUpdate = buus.find((buu) => buu.id === buuId)
      if (buuToUpdate) {
        // Verifica se o Buu foi encontrado
        const updatedBuu = { ...buuToUpdate, opened: true }
        await updateBuuMutation({ id: buuId, newData: updatedBuu })
      }
    } catch (error) {
      console.error('Erro ao abrir o Buu:', error)
    }
  }

  useEffect(() => {
    if (data) {
      const sortedBuus = [...data]
      sortedBuus.sort((a: BuuType, b: BuuType) => b.id - a.id)
      setBuus(sortedBuus)
    }
  }, [data])

  return (
    <Layout page="buus">
      <MyBuusContainer>
        <header>
          <h2>Meus Buus</h2>
          {isSmallScreen ? (
            <img
              src={loggedBuser?.profile ? loggedBuser.profile : DefaultProfile}
              alt="Imagem de perfil"
              className="avatar"
            />
          ) : (
            <></>
          )}
        </header>
        {isLoading ? <SyncLoader color={colors.blue} /> : <> </>}
        {buus.map((buu) => (
          <Buu
            key={buu.id}
            content={buu.content}
            handleOpen={() => handleOpenBuu(buu.id)}
            opened={buu.opened}
            id={buu.id}
            openPopMakeRet={openPopMakeRet}
            receiver={buu.receiver}
            sender={buu.sender}
          />
        ))}
      </MyBuusContainer>
      {showPopMakeRet && selectedBuu && (
        <PopMakeRet
          buu={selectedBuu} // Passa o Buu completo para o componente PopMakeRet
          closePopMakeRet={closePopMakeRet}
          buuResponse
        />
      )}
    </Layout>
  )
}

export default MyBuus
