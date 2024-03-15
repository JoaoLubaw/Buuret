import React, { useState } from 'react'
import { BuuContainer } from './styles'
import Ghost from '../../assets/images/ghost.svg'
import Reply from '../../assets/images/reply.svg'

type Props = {
  Response?: boolean
  content?: string
  openned?: boolean
  handleOpen?: () => void
  id?: number // Adicione a propriedade "id" para identificar exclusivamente cada Buu
}

const Buu = ({ Response, content, openned = false, handleOpen, id }: Props) => {
  const [opennedBuu, setOpennedBuu] = useState(openned)

  const toggleOpen = () => {
    setOpennedBuu((prevOpenned) => !prevOpenned) // Alterna entre true e false
    handleOpen && handleOpen() // Chama a função para atualizar o estado na API
  }

  return (
    <BuuContainer className={Response ? 'Response' : ''} openned={opennedBuu}>
      <div
        onClick={toggleOpen}
        className={opennedBuu ? 'oppened card' : 'toOpen card'}
      >
        <span>{content}</span>
        <img
          src={Ghost}
          className={opennedBuu ? 'oppenedIMG ghost' : 'ghost'}
          alt="Buu"
        />
      </div>
      {!Response && (
        <>
          <div
            className={
              opennedBuu ? 'buttonWrapper' : 'toOpenButton buttonWrapper'
            }
          >
            <button>
              <img src={Reply} alt="Responda" /> Responder em Ret
            </button>
          </div>
        </>
      )}
    </BuuContainer>
  )
}

export default Buu
