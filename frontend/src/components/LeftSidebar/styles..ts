import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const LeftContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 16px;
  border-right: 1px solid rgba(1, 1, 1, 0.1);

  .logo {
    position: absolute;
    height: 48px;
    left: 8px;
    top: 8px;
  }

  .buttons {
    max-width: 264px;
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    gap: 48px;

    .PageButton {
      display: flex;
      align-items: center;
      margin-right: 32px;
      gap: 8px;
      border: none;
      background: none;

      span {
        text-align: center;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 20px;
      }

      .active {
        color: ${colors.blue};
      }

      img {
        height: 24px;
      }
    }
  }

  .profile {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 264px;
    width: 100%;

    button {
      border: none;
      background: none;
      font-weight: bold;
      font-size: 24px;
    }

    .logout {
      height: 16px;

      img {
        height: 16px;
      }
    }

    .profile-infos {
      display: flex;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;

      .username {
        margin-left: 8px;

        h4 {
          font-size: 16px;
        }

        span {
          font-size: 12px;
          opacity: 50%;
        }
      }

      img {
        margin-left: 8px;
        height: 48px;
        width: 48px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  @media (max-width: ${breakpoints.mobileG}) {
    display: none;
  }

  @media (max-width: ${breakpoints.desktopG}) {
    max-width: 12%;
    padding-right: 12px;

    .logo {
      position: relative;
      left: 0;
      top: 0;
      margin: 16px auto;
    }

    .buttons {
      margin-top: 16px;

      .PageButton {
        margin: 0 auto;

        span {
          display: none;
        }
      }
    }

    .profile {
      flex-direction: column;
      margin: 32px auto;

      button {
        margin-top: 8px;
      }

      .username {
        display: none;
      }

      .profile-infos img {
        margin-left: 0;
        height: 32px;
        width: 32px;
      }
    }
  }
`

export const RetButton = styled.button`
  width: 100%;
  background-color: ${colors.blue};
  color: ${colors.white};
  border: none;
  border-radius: 48px;

  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 16px;
  padding: 8px;

  img {
    height: 14px;
    width: 14px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 50%;
  }
`
