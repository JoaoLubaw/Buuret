import styled from 'styled-components'
import { colors } from '../../styles'

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

  border-right: 1px solid RGB(1,1,1,0.1);

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
      border:none;
      background:none;
      font-weight: bold;
      font-size: 24px;
    }

    .logout {
      height:16px;

      img {
        height:16px;
      }
    }


    .profile-infos {
      display: flex;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;

      .username {
        margin-left: 8px;

        h4{
          font-size;16px;
        }

        span {
          font-size: 12px;
          opacity: 50%;
        }
      }

      img {
        height: 56px;
        width: 56px;
        object-fit: cover;
        border-radius: 50%;
      }
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
`
