import { Overlay } from '../../pages/Home/styles'
import MakeRet from '../MakeRet'
import { PopMakeRetContainer } from './styles'

import Close from '../../assets/images/x.svg'
import Ret from '../Ret'
import Buu from '../Buu'

type Props = {
  closePopMakeRet: () => void
  response?: boolean
  buuResponse?: boolean
}

const PopMakeRet = ({ closePopMakeRet, response, buuResponse }: Props) => {
  return (
    <>
      <Overlay onClick={closePopMakeRet} />
      <PopMakeRetContainer>
        <header>
          <button onClick={closePopMakeRet}>
            <img src={Close} alt="fechar" />
          </button>
        </header>
        {response && <Ret ResponseVisualization />}
        {buuResponse && (
          <div className="buuVisualizer">
            <Buu Response />
          </div>
        )}
        <MakeRet Pop Detail />
      </PopMakeRetContainer>
    </>
  )
}

export default PopMakeRet
