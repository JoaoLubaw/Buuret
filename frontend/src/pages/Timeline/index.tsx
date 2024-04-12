import MakeRet from '../../components/MakeRet'
import Ret from '../../components/Ret'
import Layout from '../../components/Layout'

import { TimelineContainer } from './styles'
import DefaultProfile from '../../assets/images/DefaultProfile.jpg'
import Write from '../../assets/images/write.svg'

import { useGetTimelineQuery, useMakeRetMutation } from '../../services/api'
import { Buser, Ret as RetType } from '../../types'
import { useEffect, useState } from 'react'
import MediaZoom from '../../components/MediaZoom'
import PopMakeRet from '../../components/PopMakeRet'
import { customEventTarget } from '../../services/events'
import { LoaderContainer, colors } from '../../styles'
import { SyncLoader } from 'react-spinners'

const Timeline = () => {
  const { data, isLoading, error, refetch } = useGetTimelineQuery('')
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null) // Estado para controlar a imagem selecionada
  const [openMedia, setOpenMedia] = useState(false)
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

  //Pop
  const [showPopMakeRet, setShowPopMakeRet] = useState(false)
  const [selectedRet, setSelectedRet] = useState<RetType | null>(null)

  function bloquearScroll() {
    document.body.style.overflow = 'hidden'
  }

  function desbloquearScroll() {
    document.body.style.overflow = ''
  }

  const openPopMakeRet = (selRec: RetType) => {
    setShowPopMakeRet(true)
    setSelectedRet(selRec)
    bloquearScroll()
  }

  const openPopMakeRetSMALL = () => {
    setShowPopMakeRet(true)
    bloquearScroll()
  }

  const closePopMakeRet = () => {
    setShowPopMakeRet(false)
    desbloquearScroll()
  }

  // /Pop

  //OpenMedia
  const openMediaZoom = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl)
    setOpenMedia(true)
  }

  const closeMediaZoom = () => {
    setSelectedMedia(null)
    setOpenMedia(false)
  }
  // /OpenMedia

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }

    customEventTarget.addEventListener('newRet', handleUpdate)

    return () => {
      customEventTarget.removeEventListener('newRet', handleUpdate)
    }
  }, [refetch])

  return (
    <Layout page="timeline">
      <TimelineContainer className="timeline">
        <header>
          <h2>Página Inicial</h2>
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
        <MakeRet />
        {isLoading && (
          <LoaderContainer>
            <SyncLoader className="loader" color={colors.blue} />
          </LoaderContainer>
        )}
        {data &&
          data.map((ret: RetType, index: number) => (
            <Ret
              datetime={ret.datetime ? ret.datetime : ''}
              buser={ret.user}
              content={ret.content}
              key={ret.id}
              reret_count={ret.reret_count}
              likes_count={ret.likes_count}
              replies_count={ret.replies_count}
              id={ret.id}
              likes={ret.likes}
              Media={ret.media}
              openMediaZoom={openMediaZoom} // Passar a função como prop
              RefBuu={ret.refbuu}
              openPop={(ret) => openPopMakeRet(ret)}
              ret={ret}
              className={
                index === data.length - 1 && isSmallScreen ? 'last-item' : ''
              }
            />
          ))}
        <MediaZoom
          mediaURL={selectedMedia}
          Open={openMedia}
          close={closeMediaZoom}
        />

        {isSmallScreen && (
          <div className="newRetButton">
            <button onClick={() => openPopMakeRetSMALL()}>
              <img src={Write} alt="Fazer Ret" />
            </button>
          </div>
        )}

        {showPopMakeRet && <PopMakeRet closePopMakeRet={closePopMakeRet} />}

        {showPopMakeRet && selectedRet && (
          <PopMakeRet
            closePopMakeRet={closePopMakeRet}
            response
            ret={selectedRet}
          />
        )}
      </TimelineContainer>
    </Layout>
  )
}

export default Timeline
