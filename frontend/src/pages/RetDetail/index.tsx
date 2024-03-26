import MakeRet from '../../components/MakeRet'
import Layout from '../../components/Layout'
import { RetDetailContainer } from './styles'
import Ret from '../../components/Ret'

import Back from '../../assets/images/arrow.svg'

const RetDetail = () => {
  return (
    <Layout page="timeline">
      <RetDetailContainer>
        <header>
          <button>
            <img src={Back} alt="Voltar" />
          </button>
          <h2>Ret</h2>
        </header>
        {/*<Ret Detail />*/}
        <MakeRet Detail />
      </RetDetailContainer>
    </Layout>
  )
}

export default RetDetail
