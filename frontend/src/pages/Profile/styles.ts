import styled from 'styled-components'
import { colors } from '../../styles'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Define a altura total da tela */
  position: relative;
  font-family: 'Roboto', sans-serif;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);

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

  .hero {
    .background {
      height: 10vw;
      width: 100%;
      object-fit: cover;
    }

    .change-background-button {
      position: absolute; /* Adiciona posicionamento absoluto */
      top: 10px; /* Define a distância do topo */
      right: 10px; /* Define a distância da direita */
    }

    .profile-info {
      margin-left: 2vw;

      .profile {
        height: 8vw;
        width: 8vw;
        background-size: cover; /* faz a imagem preencher todo o contêiner */
        border-radius: 50%;
        margin-top: -4vw;
        border: 1px solid ${colors.white};
        object-fit: cover;
      }

      .user-edit {
        display: flex;
        justify-content: space-between;

        button {
          margin-right: 2vw;
          height: 32px;
          font-weight: bold;
          color: ${colors.blue};
          font-size: 14px;
          background: none;
          border: 1px solid ${colors.blue};
          border-radius: 50px;
          padding: 4px;
        }
      }

      .username {
        width: 80%;

        h4 {
          font-family: 'Roboto', Sans-Serif;
          font-size: 20px;
          font-weight: bold;
          width: 100%;
        }

        textarea {
          font-family: 'Roboto', Sans-Serif;
          font-size: 20px;
          font-weight: bold;
          resize: none;
          border: none;
          width: 100%;
          height: 24px;
          margin-bottom: 0;
        }

        span {
          font-size: 12px;
          font-weight: normal;
          opacity: 50%;
        }
      }

      .description {
        margin-top: 8px;
        padding-bottom: 24px;
        min-height: 64px; /* Defina uma altura mínima */
        width: 100%;

        textarea {
          font-family: 'Roboto', Sans-Serif;
          font-size: 16px;
          resize: none;
          border: none;
          width: 90%;
        }
      }

      .count {
        display: flex;
        gap: 16px;
        font-size: 14px;

        button {
          margin-right: 2vw;
          height: 32px;
          font-weight: bold;
          color: ${colors.blue};
          font-size: 14px;
          background: none;
          border: 1px solid ${colors.blue};
          border-radius: 50px;
          padding: 4px;
        }

        span {
          opacity: 50%;
          font-weight: normal;
        }
      }
    }

    .buuSender {
      padding-left: 2vw;
      margin-top: 16px;
      font-family: 'Roboto', Sans-Serif;
      display: flex;
      gap: 8px;
      align-items: center;

      textarea {
        font-family: 'Roboto', Sans-Serif;
        width: 70%;
        font-size: 16px;
        border: 1px solid ${colors.blue};
        border-radius: 10px;
        height: 64px;
        resize: none;
        padding: 6px;
      }

      button {
        height: 32px;
        font-weight: bold;
        color: ${colors.blue};
        font-size: 14px;
        background: none;
        border: 1px solid ${colors.blue};
        border-radius: 50px;
        padding: 4px;
        align-items: center;

        img {
          height: 12px;
          fill: ${colors.blue};
        }
      }
    }

    .footer {
      padding-left: 2vw;
      padding-bottom: 8px;
      margin-top: 16px;
      border-bottom: 2px solid RGB(1, 1, 1, 0.2);
    }
  }
`
