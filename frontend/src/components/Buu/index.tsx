import React, { useState } from 'react'
import { BuuContainer } from './styles'
import Ghost from '../../assets/images/ghost.svg'
import Reply from '../../assets/images/reply.svg'
import { Buser, Buu as Buutype } from '../../types' // Importe o tipo Buu

type Props = {
  Response?: boolean
  content?: string | undefined
  openned?: boolean
  handleOpen?: () => void
  id?: number
  openPopMakeRet?: (buu: Buutype) => void
  sender?: number | Buser | undefined
  receiver?: number | Buser | undefined
}

const Buu = ({
  Response,
  content,
  openned = false,
  handleOpen,
  id,
  openPopMakeRet,
  receiver,
  sender
}: Props) => {
  const [opennedBuu, setOpennedBuu] = useState(openned)

  const toggleOpen = () => {
    setOpennedBuu(true)
    handleOpen && handleOpen()
  }

  const handleOpenPopMakeRet = () => {
    if (content) {
      const temporaryBuu: Buutype = {
        id: id ?? 0, // Defina um valor padrão para id se for indefinido
        content,
        opened: openned,
        receiver: receiver,
        sender: sender
      }
      openPopMakeRet && openPopMakeRet(temporaryBuu)
    }
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
            <button onClick={handleOpenPopMakeRet}>
              <img src={Reply} alt="Responda" /> Responder em Ret
            </button>
          </div>
        </>
      )}
    </BuuContainer>
  )
}

export default Buu
