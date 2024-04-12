import styled from 'styled-components'
import { colors } from '../../styles'

import Ghost from '../../assets/images/ghost.svg'

type Props = {
  opened: boolean
}

export const BuuContainer = styled.div<Props>`
  width: 80%;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;

  .card {
    border: 2px solid ${colors.blue};
    border-radius: 25px;
    position: relative;

    border-radius: 25px;
    padding: 24px;
    transition: background-color 0.5s ease; /* Adiciona transição de cor de fundo */
    background-color: ${(props) =>
      props.opened
        ? 'transparent'
        : colors.blue}; /* Altera a cor de fundo com base no estado */
  }

  .ghost {
    position: absolute;
    height: 64px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 1s ease; /* Adiciona transição para a opacidade */
    opacity: ${(props) =>
      props.opened ? '0' : '1'}; /* Define a opacidade com base no estado */
  }

  span {
    resize: none;
    border: none;
    heigh: auto;
    width: 100%;
    align-items: center;

    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    color: ${colors.blue};
  }

  .toOpen {
    cursor: pointer;
    transition: background-color 0.5s ease; /* Adiciona transição de cor de fundo */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .buttonWrapper {
    position: relative;
    width: 100%;
    margin-bottom: 24px;
  }

  .toOpenButton {
    display: none;
  }

  button {
    align-self: flex-end;
    display: flex;
    align-items: center;
    font-weight: bold;
    background: none;
    border: none;
    height: 16px;
    font-size: 16px;
    position: absolute;
    top: 4px;
    right: 0;

    img {
      height: 24px;
      transform: scaleX(-1);
    }
  }

  &.Response {
    margin: 16px auto;
  }
`
