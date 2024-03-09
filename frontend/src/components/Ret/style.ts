import styled from 'styled-components'
import { colors } from '../../styles'

export const RetContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  border-bottom: 1px solid RGB(1, 1, 1, 0.1);
  font-family: 'Roboto', sans-serif;

  .avatar {
    height: 48px;
    border-radius: 50%;
  }

  .header {
    display: flex;
    align-items: center;

    h3 {
      margin-right: 4px;
      font-size: 16px;
    }

    span {
      font-size: 12px;
      opacity: 80%;
    }

    .reret {
      margin-left: 8px;
      font-size: 14px;
      font-weight: bold;
      color: ${colors.blue};
    }

    .divisor {
      margin: 0 2px;
    }
  }

  .content {
    margin-left: 8px;
  }

  .buuResponse {
    width: 100%;
    align-items: center;
  }

  .text {
    margin-top: 4px;
    width: 90%;
    font-size: 16px;
  }

  .media {
    width: 90%;
    height: 336px;
    object-fit: cover;
    border-radius: 50px;
    margin-top: 12px;

    cursor: zoom-in;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    width: 90%;

    .footer-item {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      font-size: 14px;
      align-items: center;

      img {
        text-align: center;
        height: 29px;
        margin-right: 4px;
      }
    }
  }

  &.detail {
    .text {
      margin-top: 4px;
      width: 90%;
      font-size: 20px;
    }

    .avatar {
      height: 56px;
      border-radius: 50%;
    }

    h3 {
      margin-right: 4px;
      font-size: 18px;
    }

    span {
      font-size: 16px;
      opacity: 80%;
    }
  }
`
