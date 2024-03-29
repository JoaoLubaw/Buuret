import { Overlay } from '../../pages/Home/styles'
import MakeRet from '../MakeRet'
import { PopMakeRetContainer } from './styles'

import Close from '../../assets/images/x.svg'
import Ret from '../Ret'
import Buu from '../Buu'
import { Buu as BuuType, Ret as RetType } from '../../types'

type Props = {
  closePopMakeRet: () => void
  response?: boolean
  buuResponse?: boolean
  buu?: BuuType
  ret?: RetType | null
}

const PopMakeRet = ({
  closePopMakeRet,
  response,
  buuResponse,
  buu,
  ret
}: Props) => {
  return (
    <>
      <Overlay onClick={closePopMakeRet} />
      <PopMakeRetContainer>
        <header>
          <button onClick={closePopMakeRet}>
            <img src={Close} alt="fechar" />
          </button>
        </header>
        {response && ret && (
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
            ResponseVisualization
            ret={ret}
          />
        )}
        {buuResponse && buu && (
          <div className="buuVisualizer">
            <Buu Response content={buu.content} openned={true} />
          </div>
        )}
        <MakeRet
          closePopMakeRet={closePopMakeRet}
          Pop
          Detail
          BuuToRespond={buu}
          ret={ret}
        />
      </PopMakeRetContainer>
    </>
  )
}

export default PopMakeRet
