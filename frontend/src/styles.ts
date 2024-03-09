import styled, { createGlobalStyle } from 'styled-components'

export const breakpoints = {
  desktopG: '1440px',
  desktop: '1024px',
  tablet: '768px'
}

export const colors = {
  black: '#000000',
  blue: '#007CCD',
  white: '#FFFFFF',
  grey: '#D9D9D9'
}

export const MainContainer = styled.div`
  position: relative;
  margin-left: 20%;
  margin-right: 20%;
`

export const GlobalCss = createGlobalStyle`
* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
  color: ${colors.black};
  list-style: none;
}

input:focus, textarea:focus, select:focus {
  outline: none;
}

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.desktop}) {
      max-width: 80%;
    }
  }

  button {
    cursor: pointer;
  }
`
