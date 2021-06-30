import { DefaultTheme } from 'react-native-paper';

const blue = '#147efb';
const colors = {
  ...DefaultTheme.colors,
  primary: blue,
  accent: blue
};
export const theme = { ...DefaultTheme, colors };
export default theme;
