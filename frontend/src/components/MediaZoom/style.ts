import styled from 'styled-components'

export const MediaZoomContainer = styled.div`
  display: flex;
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  justify-content: center;
  content-align: center;

  .image {
    max-width: 80vw;
    max-height: 80vh;
    position: relative;
    text-align: center;

    .media {
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
      align-items: center;
    }

    .close {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -3%;
      background: none;
      border: none;
      width: 16px;

      img {
        width: 16px;
      }
    }
  }
`
