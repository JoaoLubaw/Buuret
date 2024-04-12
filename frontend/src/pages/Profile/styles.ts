import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Define a altura total da tela */
  position: relative;
  font-family: 'Roboto', sans-serif;

  .loader {
    margin: 0 auto;
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

  .hero {
    .background {
      height: 16vw;
      width: 100%;
      object-fit: cover;
    }

    .labelIMG,
    .labelIMG img {
      width: 22px;
      cursor: pointer;
    }

    .changeDescArea {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }

    .labelIMG--back,
    .labelIMG--back img {
      margin-left: 2px;
      cursor: pointer;
    }

    .profile-info {
      margin-left: 2vw;

      .profile {
        height: 15vw;
        width: 15vw;
        background-size: cover; /* faz a imagem preencher todo o contêiner */
        border-radius: 50%;
        margin-top: -4vw;
        border: 1px solid ${colors.white};
        object-fit: cover;

        @media (max-width: ${breakpoints.tablet}) {
          height: 32vw;
          width: 32vw;
        }
      }

      .user-edit {
        display: flex;
        justify-content: space-between;

        @media (max-width: ${breakpoints.tablet}) {
          .EditButton {
            height: 48px;
          }
        }

        button {
          margin-right: 2vw;
          margin-top: 4px;

          height: 32px;
          font-weight: bold;
          color: ${colors.blue};
          font-size: 14px;
          background: none;
          border: 1px solid ${colors.blue};
          border-radius: 50px;
          padding: 4px;

          @media (max-width: ${breakpoints.tablet}) {
            height: 24px;
          }
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
          width: 90%;
          height: 28px;
          margin-bottom: 0;
          margin-right: 10%;
          border: 1px solid RGB(0, 124, 205, 0.1);
          padding: 2px;
          overflow: hidden;
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
        min-height: 64px;
        width: 100%;

        textarea {
          font-family: 'Roboto', Sans-Serif;
          font-size: 16px;
          resize: none;
          border: none;
          width: 90%;
        }

        .edditing {
          border: 1px solid RGB(0, 124, 205, 0.1);
          padding: 2px;
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

        span {
          color: ${colors.blue};
        }

        img {
          height: 12px;
          fill: ${colors.blue};
        }

        @media (max-width: ${breakpoints.tablet}) {
          border-radius: 50%;
          height: 32px;
          width: 32px;

          span {
            display: none;
          }

          img {
            height: 18px;
          }
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
