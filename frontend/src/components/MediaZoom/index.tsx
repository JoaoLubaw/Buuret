import { Overlay } from '../../pages/Home/styles'
import Close from '../../assets/images/x.svg'
import { MediaZoomContainer } from './style'
import { useState, useEffect } from 'react'

type Props = {
  mediaURL: string | null
  Open: boolean
  close: () => void
}

const MediaZoom = ({ mediaURL, close, Open }: Props) => {
  const [isOpen, setIsOpen] = useState(Open)

  useEffect(() => {
    setIsOpen(Open)
  }, [Open])

  const closeMedia = () => {
    setIsOpen(false)
    close()
  }

  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={closeMedia} />
          <MediaZoomContainer>
            <div className="image">
              <button className="close" onClick={closeMedia}>
                <img src={Close} alt="Fechar" />
              </button>
              {mediaURL && (
                <img className="media" src={mediaURL} alt="imagem" />
              )}
            </div>
          </MediaZoomContainer>
        </>
      )}
    </>
  )
}

export default MediaZoom
