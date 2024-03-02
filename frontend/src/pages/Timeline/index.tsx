import MakeRet from '../../components/MakeRet'
import Ret from '../../components/Ret'
import Layout from '../../components/Layout'

import { TimelineContainer } from './styles'

const Timeline = () => {
  return (
    <Layout page="timeline">
      <TimelineContainer className="timeline">
        <header>
          <h2>Página Inicial</h2>
        </header>
        <MakeRet />
        <Ret />
        <Ret Media />
        <Ret isReret />
        <Ret RefBuu />
        <Ret />
        <Ret />
      </TimelineContainer>
    </Layout>
  )
}

export default Timeline
