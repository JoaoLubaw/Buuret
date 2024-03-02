import Test from '../../assets/images/teste.jpg'
import Img from '../../assets/images/Img.svg'
import { MakeRetContainer } from './style'
import React, { useState } from 'react'

type Props = {
  Pop?: boolean
  Detail?: boolean
}

const MakeRet = ({ Pop, Detail }: Props) => {
  const [text, setText] = useState('')
  const textareaRef = React.createRef<HTMLTextAreaElement>()

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
          <button>Ret-it</button>
        </div>
      </form>
    </MakeRetContainer>
  )
}

export default MakeRet
