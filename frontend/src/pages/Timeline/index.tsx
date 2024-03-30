import MakeRet from '../../components/MakeRet'
import Ret from '../../components/Ret'
import Layout from '../../components/Layout'

import { TimelineContainer } from './styles'
import { useGetTimelineQuery, useMakeRetMutation } from '../../services/api'
import { Ret as RetType } from '../../types'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import MediaZoom from '../../components/MediaZoom'
import PopMakeRet from '../../components/PopMakeRet'
import { customEventTarget } from '../../services/events'

const Timeline = () => {
  const { data, isLoading, error, refetch } = useGetTimelineQuery('')
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null) // Estado para controlar a imagem selecionada
  const [openMedia, setOpenMedia] = useState(false)
  const filteredTimeline = data?.filter((ret) => ret.replyto == null)

  console.log(filteredTimeline)

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

  const closePopMakeRet = () => {
    setShowPopMakeRet(false)
    desbloquearScroll()
  }

  //Pop

  const handleUpdateRet = () => {
    refetch()
    console.log('estou tentando')
  }

  const openMediaZoom = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl)
    setOpenMedia(true)
  }

  const closeMediaZoom = () => {
    setSelectedMedia(null)
    setOpenMedia(false)
  }

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
        </header>
        <MakeRet />
        {filteredTimeline &&
          filteredTimeline.map((ret: RetType) => (
            <Ret
              update={handleUpdateRet}
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
              openPop={openPopMakeRet}
              ret={ret}
            />
          ))}
        <MediaZoom
          mediaURL={selectedMedia}
          Open={openMedia}
          close={closeMediaZoom}
        />
        {showPopMakeRet && (
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
