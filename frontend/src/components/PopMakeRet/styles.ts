import styled from 'styled-components'
import { colors } from '../../styles'

export const PopMakeRetContainer = styled.div`
  position: fixed;
  width: 40vw;
  max-height: 40vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 20px;

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
`
