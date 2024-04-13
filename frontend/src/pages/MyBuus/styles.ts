import styled from 'styled-components'

export const MyBuusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  margin: 0 auto; /* Centraliza horizontalmente */
  height: 100vh; /* Define a altura total da tela */
  position: relative;
  font-family: 'Roboto', sans-serif;

  .noBuus {
    text-align: center;
    padding: 16px;
    font-size: 22px;
    display: block;

    img {
      margin-top: 2vh;
      width: 30%;
    }
  }

  header {
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid RGB(1, 1, 1, 0.1);
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`
