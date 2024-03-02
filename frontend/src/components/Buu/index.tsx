import { useState } from 'react'
import { BuuContainer } from './styles'

import Ghost from '../../assets/images/ghost.svg'
import Reply from '../../assets/images/reply.svg'

type Props = {
  Response?: boolean
}

const Buu = ({ Response }: Props) => {
  const [openned, setOpenned] = useState(false)

  const OpenBuu = () => {
    setOpenned(true)
  }

  return (
    <BuuContainer className={Response ? 'Response' : ''} openned={openned}>
      <div
        onClick={() => OpenBuu()}
        className={openned ? 'oppened card' : 'toOpen card'}
      >
        <span>
          lore maodsa oahdfasodj a aifba fdabaibs da bndaisb ibaf aisbf iabs
          fibas ifba iabs iabd
        </span>
        <img
          src={Ghost}
          className={openned ? 'oppenedIMG ghost' : 'ghost'}
          alt="Buu"
        />
      </div>
      {!Response && (
        <>
          <div
            className={openned ? 'buttonWrapper' : 'toOpenButton buttonWrapper'}
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
