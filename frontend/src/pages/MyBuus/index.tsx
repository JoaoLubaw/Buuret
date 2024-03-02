import MakeRet from '../../components/MakeRet'
import Layout from '../../components/Layout'
import { MyBuusContainer } from './styles'
import Buu from '../../components/Buu'

const MyBuus = () => {
  return (
    <Layout page="buus">
      <MyBuusContainer>
        <header>
          <h2>Meus Buus</h2>
        </header>
        <Buu />
        <Buu />
        <Buu />
      </MyBuusContainer>
    </Layout>
  )
}

export default MyBuus
