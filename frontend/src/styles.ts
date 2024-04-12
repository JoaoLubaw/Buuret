import styled, { createGlobalStyle } from 'styled-components'

export const breakpoints = {
  desktopG: '1439px',
  desktop: '1024px',
  tablet: '768px',
  mobileG: '426px',
  mobile: '375px'
}

export const colors = {
  black: '#000000',
  blue: '#007CCD',
  white: '#FFFFFF',
  grey: '#D9D9D9'
}

export const MainContainer = styled.div`
  position: relative;

  @media (min-width: ${breakpoints.mobileG}) and (max-width: ${breakpoints.desktop}) {
    margin-left: 12%;
    margin-right: 0;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-left: 12%;
    margin-right: 30%;
  }

  @media (min-width: ${breakpoints.desktopG}) {
    margin-left: 20%;
    margin-right: 30%;
  }
`

export const GlobalCss = createGlobalStyle`
* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
  color: ${colors.black};
  list-style: none;
}

img {
  user-select: none;
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

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  position: relative;

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
`
