import { RetContainer } from './style'

import Test from '../../assets/images/teste.jpg'

import Like from '../../assets/images/heart.svg'
import LikeIsLiked from '../../assets/images/filledHeart.svg'
import Comment from '../../assets/images/comment.svg'
import Share from '../../assets/images/share.svg'
import ReRet from '../../assets/images/retweet.svg'
import Buu from '../Buu'
import { Buser } from '../../types'

type Props = {
  isReret?: boolean
  RefBuu?: boolean
  Media?: boolean
  Detail?: boolean
  ResponseVisualization?: boolean
  content: string
  buser: Buser | undefined | number
}

const Ret = ({
  isReret,
  Media,
  RefBuu,
  Detail,
  ResponseVisualization,
  content,
  buser
}: Props) => {
  return (
    <RetContainer className={Detail ? 'detail' : ''}>
      <img src={Test} alt="Imagem de Perfil" className="avatar" />
      <div className="content">
        <div className="header">
          <h3 className="name">{buser?.name}</h3>
          <span className="username">@joaolubaw</span>
          <span className="divisor">-</span>
          <span className="time">1 min</span>
          {isReret && <span className="reret">ReRetado por @joaolubaw</span>}
        </div>

        <div className="text">
          {RefBuu && (
            <div className="buuResponse">
              <Buu Response />
            </div>
          )}
          {content}
        </div>

        {Media && <img className="media" src={Test} alt="Imagem" />}
        {!ResponseVisualization && (
          <div className="footer">
            <button className="footer-item like">
              <img src={Like} alt="curtir" className="icon" />
              <span>8</span>
            </button>
            <button className="footer-item comment">
              <img src={Comment} alt="comentar" className="icon" />
              <span>8</span>
            </button>
            <button className="footer-item reret">
              <img src={ReRet} alt="fazer Reret" className="icon" />
              <span>8</span>
            </button>
            <button className="footer-item share">
              <img src={Share} alt="compartilhar" className="icon" />
              <span>8</span>
            </button>
          </div>
        )}
      </div>
    </RetContainer>
  )
}

export default Ret
