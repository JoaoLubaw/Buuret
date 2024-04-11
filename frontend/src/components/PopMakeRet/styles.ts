import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const PopMakeRetContainer = styled.div`
  position: fixed;
  width: 40vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 20px;
  z-index: 2;

  header {
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);
    button {
      margin: 4px;
      height: 32px;
      background: none;
      border: none;

      img {
        height: 32px;
      }
    }
  }

  .buuVisualizer {
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.desktop}) {
    width: 60vw;
  }

  @media (max-width: ${breakpoints.mobileG}) {
    width: 96vw;
  }
`
