import Test from '../../assets/images/teste.jpg'
import Img from '../../assets/images/Img.svg'
import { MakeRetContainer } from './style'
import React, { ReactEventHandler, useState } from 'react'
import { useMakeRetMutation } from '../../services/api'
import { Buser, Buu, Ret } from '../../types'
import { toast } from 'react-toastify'

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
    user: loggedBuser,
    likes: [],
    content: '',
    media: null,
    comret: false,
    replies: [],
    rerets: [],
    isreret: false,
    refbuu: null
  })

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    const textarea = textareaRef.current

    const newText = e.target.value.toString()
    setText(e.target.value)

    const updatedRet = { ...retToPost, content: newText }
    setRetToPost(updatedRet)

    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }

  const handleRetIT = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    makeRet(retToPost)
    setText('')

    console.log(retToPost)
    toast.success('Ret feito!')
  }

  return (
    <MakeRetContainer>
      <img src={Test} alt="Imagem de Perfil" />

      <form>
        <textarea
          ref={textareaRef}
          className={Pop ? 'Pop' : ''}
          onChange={(e) => handleChange(e)}
          value={text}
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
