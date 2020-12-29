import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --theme-background: #edf0f4;
    --theme-color: #353c41;
    --container-width: 1630px;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  font-size: 10px;
}

body {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  line-height: 1.5;
  background-color: var(--theme-background);
  color: var(--theme-color);
  height: 100%;
  margin: 0;
}
`;

export default GlobalStyle;