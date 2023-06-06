
import {} from 'styled-components';
import type { Theme } from '@morten-olsen/x-ui';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // extends the global DefaultTheme with our ThemeType.
}