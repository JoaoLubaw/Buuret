import Test from '../../assets/images/teste.jpg'
import Img from '../../assets/images/Img.svg'
import { MakeRetContainer } from './style'
import React, { ReactEventHandler, useState } from 'react'
import { useMakeRetMutation } from '../../services/api'
import { Buser, Buu, Ret } from '../../types'

type Props = {
  Pop?: boolean
  Detail?: boolean
}

const MakeRet = ({ Pop, Detail }: Props) => {
  const loggedBuser = JSON.parse(localStorage.getItem('buser') || '{}') as Buser
  const [makeRet, { isLoading, isError, error }] = useMakeRetMutation()
  const [text, setText] = useState('')
  const textareaRef = React.createRef<HTMLTextAreaElement>()
  const [retToPost, setRetToPost] = useState<Ret>({
    user: loggedBuser?.id,
    likes: [],
    content: '',
    media: null,
    comret: false,
    replies: [],
    rerets: [],
    isreret: false,
    refbuu: null
  })

  const handleRetIT = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setRetToPost({
      ...retToPost,
      content: text
    })
    console.log(retToPost)

    makeRet(retToPost)
  }

  const handleChange = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }
  return (
    <MakeRetContainer>
      <img src={Test} alt="Imagem de Perfil" />

      <form>
        <textarea
          ref={textareaRef}
          value={text}
          className={Pop ? 'Pop' : ''}
          onChange={(e) => {
            setText(e.target.value)
            handleChange()
          }}
          placeholder={
            Detail ? 'O que você quer responder?' : 'No que você está pensando?'
          }
        ></textarea>

        <div className="footer">
          <img src={Img} alt="Importar Imagens" />
          <button onClick={handleRetIT}>Ret-it</button>
        </div>
      </form>
    </MakeRetContainer>
  )
}

export default MakeRet
