import { ErrorContainer } from './styles'

import Alert from '../../assets/images/exclamation.svg'

const Error = () => {
  return (
    <ErrorContainer>
      <div className="message">
        <h2>Ooops</h2>
        <p>
          Parece que não há nada aqui... Será que você não digitou algo errado?
        </p>
        <img src={Alert} alt="Erro" />
      </div>
    </ErrorContainer>
  )
}

export default Error
