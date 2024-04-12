import styled from 'styled-components'
import { colors } from '../../styles'

export const SearchContainer = styled.div`
  .search {
    display: flex;
    content-align: center;
    background-color: ${colors.grey};
    padding: 6px;
    border-radius: 24px;
    margin-bottom: 8px;

    img {
      opacity: 50%;
      height: 24px;
      width: 24px;
      margin-right: 8px;
    }

    input {
      width: 88%;
      background: none;
      border: none;
      font-family: 'Roboto', sans-serif;
      opacity: 80%;
    }
  }

  .results {
    background-color: none;

    .user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid RGB(1, 1, 1, 0.05);
      margin-bottom: 6px;
      cursor: pointer;
    }

    .profile-infos {
      padding-top: 8px;
      display: flex;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;

      img {
        height: 56px;
        width: 56px;
        object-fit: cover;
        border-radius: 50%;
      }

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
    }
  }
  }
`
