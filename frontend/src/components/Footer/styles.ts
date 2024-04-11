import styled from 'styled-components'
import { colors } from '../../styles'

export const FooterContainer = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  height: 10vh;
  width: 100%;
  background-color: ${colors.white};
  padding: 16px;
  border-top: 1px solid rgba(1, 1, 1, 0.1);
  margin-top: -10vh;

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .PageButton {
      align-items: center;
      border: none;
      background: none;
      padding: 8px;

      img {
        height: 36px;
      }
    }

    .logout {
      img {
        height: 24px;
      }
    }
  }
`
