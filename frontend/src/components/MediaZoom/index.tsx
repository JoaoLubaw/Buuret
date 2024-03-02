import { Overlay } from '../../pages/Home/styles'

import Test from '../../assets/images/teste.jpg'
import Close from '../../assets/images/x.svg'
import { MediaZoomContainer } from './style'
import { useState } from 'react'

const MediaZoom = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMedia = () => {
    setIsOpen(false)
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
              <img className="media" src={Test} alt="imagem" />
            </div>
          </MediaZoomContainer>
        </>
      )}
    </>
  )
}

export default MediaZoom
