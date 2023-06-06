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
  }

  button {
    all: unset;
    cursor: pointer;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg.base};
    color: ${({ theme }) => theme.colors.text.base};
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: ${({ theme }) => theme.lineHeights.base};
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
