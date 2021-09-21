import 'styled-components';
import theme from './theme';

declare module 'styled-components'{ //faz a inferencia de objetos, ou seja, analisa o tipo passado e cria uma tipagem
  type ThemeType = typeof theme
  export interface DefaultTheme extends ThemeType {}
}