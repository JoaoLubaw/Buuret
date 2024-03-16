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
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);
  }

  .hero {
    .background {
      max-height: 10vw;
      width: 100%;
      object-fit: cover;
    }

    .profile-info {
      margin-left: 2vw;

      .profile {
        height: 8vw;
        border-radius: 50%;
        margin-top: -4vw;
        border: 1px solid ${colors.white};
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
        h4 {
          font-size: 20px;
          font-weight: bold;
        }
        span {
          font-size: 12px;
          font-weight: normal;
          opacity: 50%;
        }
      }

      .description {
        margin-top: 8px;
        padding-bottom: 4px;

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
        width: 70%;
        font-size: 16px;
        border: 1px solid ${colors.blue};
        border-radius: 10px;
        height: 64px;
        resize: none;
        padding: 4px;
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
