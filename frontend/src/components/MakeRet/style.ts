import styled from 'styled-components'
import { colors } from '../../styles'

export const MakeRetContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  border-bottom: 12px solid RGB(1, 1, 1, 0.1);

  form {
    width: 90%;
    margin-left: 16px;

    textarea {
      border: none;
      width: 100%;
      margin-bottom: 16px;
      resize: none;
      font-family: 'Roboto', sans-serif;
      overflow: hidden;
      height: auto;
      max-height: 40vh;
      min-height: 100px;
      font-size: 20px;
    }
  }

  img {
    height: 56px;
    border-radius: 50%;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid RGB(1, 1, 1, 0.1);

    img {
      height: 28px;
    }

    button {
      background-color: ${colors.blue};
      color: ${colors.white};
      font-size: 14px;
      font-weight: bold;
      border: none;
      border-radius: 20px;
      padding: 8px;
    }
  }
`
