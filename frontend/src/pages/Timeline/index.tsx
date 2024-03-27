import MakeRet from '../../components/MakeRet'
import Ret from '../../components/Ret'
import Layout from '../../components/Layout'

import { TimelineContainer } from './styles'
import { useGetTimelineQuery, useMakeRetMutation } from '../../services/api'
import { Ret as RetType } from '../../types'
import { toast } from 'react-toastify'
import { useState } from 'react'
import MediaZoom from '../../components/MediaZoom'

const Timeline = () => {
  const { data, isLoading, error } = useGetTimelineQuery('')
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null) // Estado para controlar a imagem selecionada
  const [openMedia, setOpenMedia] = useState(false)

  const openMediaZoom = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl)
    setOpenMedia(true)
  }

  const closeMediaZoom = () => {
    setSelectedMedia(null)
    setOpenMedia(false)
  }

  return (
    <Layout page="timeline">
      <TimelineContainer className="timeline">
        <header>
          <h2>Página Inicial</h2>
        </header>
        <MakeRet />
        {data &&
          data.map((ret: RetType) => (
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
            />
          ))}
        <MediaZoom
          mediaURL={selectedMedia}
          Open={openMedia}
          close={closeMediaZoom}
        />
      </TimelineContainer>
    </Layout>
  )
}

export default Timeline
