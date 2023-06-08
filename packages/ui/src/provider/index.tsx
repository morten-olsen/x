import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { dark } from '../theme';
import { styles } from '../components';
type UIProviderProps = {
  children: React.ReactNode;
};
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');
const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    overflow-wrap: break-word;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  html, body {
    height: 100%;
    overscroll-behavior: none;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg.base};
    color: ${({ theme }) => theme.colors.text.base};
    margin: 0;
    padding: 0;
    ${styles.body}
  }
`;

const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export { UIProvider };
