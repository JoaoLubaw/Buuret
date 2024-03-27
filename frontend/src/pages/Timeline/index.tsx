import MakeRet from '../../components/MakeRet'
import Ret from '../../components/Ret'
import Layout from '../../components/Layout'

import { TimelineContainer } from './styles'
import { useGetTimelineQuery } from '../../services/api'
import { Ret as RetType } from '../../types'

const Timeline = () => {
  const { data, isLoading, error } = useGetTimelineQuery('')

  return (
    <Layout page="timeline">
      <TimelineContainer className="timeline">
        <header>
          <h2>Página Inicial</h2>
        </header>
        <MakeRet />
        {data &&
          data.map((ret: RetType) => (
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
            />
          ))}
      </TimelineContainer>
    </Layout>
  )
}

export default Timeline
