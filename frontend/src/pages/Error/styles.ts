import styled from 'styled-components'
import { colors } from '../../styles'

export const ErrorContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100vh;
  text-align: center;

  .message {
    margin-top: 20%;
    padding: 10%;

    h2 {
      font-size: 24px;
      color: ${colors.blue};
    }

    img {
      height: 24px;
    }
  }

  header {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);

    justify-content: space-between;
    align-items: center;

    .division {
      display: flex;
    }

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    button {
      background: none;
      border: none;
      height: 24px;
      margin-right: 4px;

      img {
        height: 24px;
      }
    }
  }
`
