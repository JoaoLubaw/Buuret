import styled from 'styled-components'

export const RetDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  margin: 0 auto; /* Centraliza horizontalmente */
  height: 100vh; /* Define a altura total da tela */
  position: relative;
  font-family: 'Roboto', sans-serif;

  header {
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .division {
      display: flex;
    }

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    button {
      background: none;
      border: none;
      height: 24px;
      margin-right: 4px;

      img {
        height: 24px;
      }
    }
  }
`
