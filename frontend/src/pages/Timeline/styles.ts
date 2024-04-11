import styled from 'styled-components'
import { colors } from '../../styles'

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  margin: 0 auto; /* Centraliza horizontalmente */
  height: 100vh; /* Define a altura total da tela */
  position: relative;
  font-family: 'Roboto', sans-serif;

  header {
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);
    display: flex;
    justify-content: space-between;

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .newRetButton {
    height: 48px;
    width: 48px;
    position: fixed;
    bottom: 12vh;
    right: 2vw;

    button {
      height: 100%;
      width: 100%;
      border: none;
      background-color: ${colors.blue};
      border-radius: 50%;

      img {
        height: 80%;
        width: 80%;
      }
    }
  }
`
