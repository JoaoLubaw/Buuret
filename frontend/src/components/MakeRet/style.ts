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

    .SelectedImageDIV {
      width: 100%;
      margin-bottom: 16px;
      align-items: center;
      position: relative;

      .SelectedImage {
        width: 80%;
        margin: 0 auto;
        position: relative;

        img {
          width: 100%;
        }

        button,
        .exclude {
          width: 16px;
          height: 16px;
          background: none;
          border: none;
        }

        button {
          position: absolute;
          right: -20px;
          top: 2px;
        }
      }
    }
  }

  .avatar {
    height: 56px;
    width: 56px;
    object-fit: cover;
    border-radius: 50%;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid RGB(1, 1, 1, 0.1);

    img {
      height: 28px;
      width: 28px;
      cursor: pointer;
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
