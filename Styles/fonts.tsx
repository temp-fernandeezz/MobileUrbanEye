import * as Font from 'expo-font';

const fonts = {
  big: 36,
  input: 16,
  regular: 14,
  medium: 12,
  small: 11,
  bold: 'bold',
  libreFranklinThin: 'LibreFranklin-Thin',
  playwrite: 'PlaywriteITModerna-Regular',
};

// Função para carregar as fontes
export const loadFonts = async () => {
  await Font.loadAsync({
    'LibreFranklin-Thin': require('../assets/fonts/LibreFranklin-Thin.ttf'),
    'PlaywriteITModerna-Regular': require('../assets/fonts/PlaywriteITModerna-Regular.ttf'),
  });
};

export default fonts;
