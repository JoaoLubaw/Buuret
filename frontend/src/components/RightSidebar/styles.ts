import styled from 'styled-components'
import { colors } from '../../styles'

export const RightSidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
  border-left: 1px solid RGB(1, 1, 1, 0.1);
  height: 100vh;

  font-family: 'Roboto', sans-serif;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .search {
    display: flex;
    content-align: center;
    background-color: ${colors.grey};
    padding: 6px;
    border-radius: 24px;

    img {
      opacity: 50%;
      height: 24px;
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

  .followMore {
    background-color: RGB(1,1,1,0.05);
    padding: 16px;
    border-radius: 24px;

    .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid RGB(1, 1, 1, 0.05);
    margin-bottom: 6px;

    button {
      background:none;
      border: 1px solid ${colors.blue};
      color: ${colors.blue};
      font-weight: bold;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      border-radius: 50px;
      width: 80px;
      height: 33px;
    }
    }

    .profile-infos {
      padding-top: 8px;
      display: flex;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;

      img {
        height: 56px;
        border-radius: 50%;
      }

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
    }
  }
`
