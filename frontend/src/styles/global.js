import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --theme-main-color: 26, 122, 191;

    --theme-header: #fff;

    --theme-background: #edf0f4;
    --theme-color: #353c41;
    --container-width: 1630px;
    --border--radius: 5px;
    --box-shadow: 0 0 40px 0 rgba(94, 92, 154, .08);
    --box--backgroundColor: #fff;

    --input--border: rgba(113, 128, 150, .4);
    --input--border-focusShadow: rgba( var(--theme-main-color), .3) 0 0 0 4px;

    --button--background-hover: rgba(255, 255, 255, .1);
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

a {
  color: rgb( var(--theme-main-color) );
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
`;

export default GlobalStyle;