import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const HomeContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  width: 100%;
  margin: 6% auto;
  position: relative;

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    width: 80%;
    justify-content: center;
    margin: 4% auto;

    .BuuretImg {
      max-width: 100%;
      text-align: center;
    }
  }
`

export const HomeButton = styled.button`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 20px;
  padding: 6px 12px;
  background: none;
  border: 1px solid ${colors.black};
  cursor: pointer;
`

export const Form = styled.div`
  max-width: 400px;

  h2 {
    font-weight: normal;
    font-size: 32px;

    span {
      font-weight: bold;
    }
  }

  .login {
    display: block;
    margin-top: 15%;
    font-family: 'Roboto Condensed', sans-serif;

    input {
      width: 100%;
      font-size: 24px;
      padding: 6px 10px;
      margin-bottom: 8px;
    }

    .passwordInput {
      display: flex;
      position: relative;

      button,
      img {
        transition: all 0.5s ease;
        height: 32px;
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 3px;
        right: 2px;
      }
    }

    a {
      display: block;
      text-decoration: none;
      font-size: 16px;
    }

    .loginButton {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
  }

  .create {
    border-top: 1px solid RGB(1, 1, 1, 0.3);
    padding-top: 24px;

    h3 {
      font-size: 20px;
      margin-bottom: 8px;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;

    h2 {
      text-align: center;
      margin-top: 8%;
    }

    .create {
      text-align: end;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    .create {
      margin-bottom: 8%;
    }
  }
`

export const Footer = styled.footer`
  text-align: center;
  margin-bottom: 4px;

  h4 {
    font-family: 'Libre Barcode 39 Extended Text', system-ui;
    font-size: 48px;
    font-weight: normal;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 3% 0px;

    h4 {
      font-size: 32px;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

export const Overlay = styled.div`
  position: fixed;
  user-select: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.black};
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.3s ease;
  pointer-events: auto;
  z-index: 1;
`

export const CreateAccount = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: 1;

  background-color: ${colors.white};
  padding: 80px 48px;
  border-radius: 2px;

  .Cardheader {
    text-align: center;
    position: absolute;

    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      height: 56px;
    }
  }

  .CardX {
    background: none;
    border: none;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;

    img {
      height: 16px;
    }
  }

  h2 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  form {
    width: 800px;

    .error-message {
      font-size: 12px;
    }

    input {
      margin: 6px 0;
      border: 1px solid rgb(0, 0, 0, 0.7);
      max-width: 100%;
      font-size: 20px;
      padding: 6px 10px;

      &.error {
        border: 1px solid red;
      }
    }

    #email {
      width: 100%;
    }

    .Division1 {
      display: flex;
      justify-content: space-between;

      .name {
        width: 60%;

        input {
          width: 100%;
        }
      }

      .username {
        width: 39%;

        input {
          width: 100%;
        }
      }
    }

    .Division2 {
      display: flex;
      justify-content: space-between;

      .input-container {
        width: 49%;

        input {
          width: 100%;
        }
      }
    }

    .checkbox {
      input {
        height: 10px;
      }
      span {
        margin-left: 2px;
        font-size: 12px;
      }
    }

    .button {
      display: flex;
      justify-content: flex-end;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 80%;

    form {
      width: 100%;

      input {
        font-size: 16px;
      }

      .checkbox {
        margin: 8px 0;
      }
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    form input {
      font-size: 12px;
    }
  }
`
