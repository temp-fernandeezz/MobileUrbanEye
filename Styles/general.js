import colors from './colors';
import fonts from './fonts';
import metrics from './metrics';


const baseStyles = {
  buttonRounds: {
    alignItems: 'center', // Centralizado Vertifcal
    justifyContent: 'center', // Centralizado horizontal
    width: 120, //largura
    height: 40, // altura.
    marginTop: 20, // Margens
    marginHorizontal: 20, // Margens
    paddingHorizontal: 10, // Define um preenchimento horizontal interno de 10 unidades dentro do botão.
    textAlign: 'center', // Alinha o texto dentro do botão ao centro.
    alignSelf: 'center', // Alinha o botão ao centro no contêiner.
    borderRadius: 5, // Arredonda os cantos do botão.
  },
  text: {
    fontFamily: fonts.trebuchet,

  },
  container: {
    flex: 1, //ocupa o espaço da tela toda
  },
};

// Estilos específicos
const general = {
  containerBetween: {
    flex: 1, //ocupa o espaço da tela toda
    justifyContent: 'space-between' //Primeiro item é colocado no inicio, o ultimo no final e os demais ficam com espaçamento igual entre eles.
  },
  containerCenter:{
    flex: 1, //ocupa o espaço da tela toda
    alignItems: 'center', //centralizado horizontal
    justifyContent: 'center', //centralizado vertical
     marginHorizontal: 10
  },
  containerBetweenCenter: {
    flex: 1, 
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between' 
  },
  backgroundBlack: {
    backgroundColor: colors.black,
  },
  backgroundverdeEscuro: {
    backgroundColor: colors.verdeEscuro,
  },
  backgroundGold:{
    backgroundColor: colors.bold,
  },
  rowContainer: {
    flexDirection: 'row', //Colocca olbjetos alinhados em mesma linha
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center'
  },
  textWhiteTitle: {
    ...baseStyles.text,
    fontSize: fonts.big,
    color: colors.white,
  },
  textGreenTitle: {
    ...baseStyles.text,
    fontSize: 48,
    color: colors.verdeMedio,
    fontWeight: 'bold'  
  },
  textWhiteMedium: {
    ...baseStyles.text,
    fontSize: fonts.medium,
    color: colors.white,
  },
  textWhite: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.white,
  },
  textWhiteSmall: {
    ...baseStyles.text,
    fontSize: fonts.small,
    color: colors.white,
  },
  textBlackTitle: {
    ...baseStyles.text,
    fontSize: fonts.big,
    color: colors.black,
     fontWeight: 'bold'  
  },
  textBlackBig:{
    ...baseStyles.text,
    fontSize: fonts.big,
    color: colors.black,
  },

  textBlackMedium: {
    ...baseStyles.text,
    fontSize: fonts.medium,
    color: colors.black,
  },
  textBlack: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.black,
    textAlign: 'center'
  },
  textBlackSmall: {
    ...baseStyles.text,
    fontSize: fonts.small,
    color: colors.black,
  },
  buttonTransparent: {
    ...baseStyles.buttonRounds,
    backgroundColor: 'transparent', //Transparente
    borderWidth: 1, //Largura da Borda
    borderColor: colors.verdeMedio, //Cor Borda
  },
  buttonGold: {
    ...baseStyles.buttonRounds,
    backgroundColor: colors.verdeMedio,
  },
  textVerdeClaro: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.verdeClaro,
    textAlign: 'center',
    fontWeight: 'bold'
  }
};



export default general;
