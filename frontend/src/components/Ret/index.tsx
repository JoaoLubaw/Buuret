import { RetContainer } from './style'

import DefaultProfile from '../../assets/images/DefaultProfile.jpg'

import Like from '../../assets/images/heart.svg'
import LikeIsLiked from '../../assets/images/filledHeart.svg'
import Comment from '../../assets/images/comment.svg'
import Share from '../../assets/images/share.svg'
import ReRet from '../../assets/images/retweet.svg'
import Buu from '../Buu'
import { Buser } from '../../types'
import { format } from 'date-fns'

type Props = {
  isReret?: boolean
  RefBuu?: boolean
  Media?: boolean
  Detail?: boolean
  ResponseVisualization?: boolean
  content: string
  buser: Buser | undefined
  datetime: Date | string
  likes_count: number | undefined
  replies_count: number | undefined
  reret_count: number | undefined
}

const Ret = ({
  isReret,
  Media,
  RefBuu,
  Detail,
  ResponseVisualization,
  content,
  buser,
  datetime,
  likes_count,
  replies_count,
  reret_count
}: Props) => {
  const formattedDatetime = datetime ? format(datetime, 'dd/MM/yyyy HH:mm') : ''

  return (
    <RetContainer className={Detail ? 'detail' : ''}>
      {buser?.profile ? (
        <img src={buser.profile} alt="Imagem de Perfil" className="avatar" />
      ) : (
        <img src={DefaultProfile} alt="Imagem de Perfil" className="avatar" />
      )}
      <div className="content">
        <div className="header">
          <h3 className="name">{buser?.name}</h3>
          <span className="username">@{buser?.username}</span>
          <span className="divisor">-</span>
          <span className="time">{formattedDatetime}</span>
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

        {Media && <img className="media" src={DefaultProfile} alt="Imagem" />}
        {!ResponseVisualization && (
          <div className="footer">
            <button className="footer-item like">
              <img src={Like} alt="curtir" className="icon" />
              <span>{likes_count}</span>
            </button>
            <button className="footer-item comment">
              <img src={Comment} alt="comentar" className="icon" />
              <span>{replies_count}</span>
            </button>
            <button className="footer-item reret">
              <img src={ReRet} alt="fazer Reret" className="icon" />
              <span>{reret_count}</span>
            </button>
            <button className="footer-item share">
              <img src={Share} alt="compartilhar" className="icon" />
            </button>
          </div>
        )}
      </div>
    </RetContainer>
  )
}

export default Ret
