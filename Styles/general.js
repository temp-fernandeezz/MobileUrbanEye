import colors from './colors';
import fonts from './fonts';
import metrics from './metrics';

const baseStyles = {
  buttonRounds: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  text: {
    fontFamily: fonts.trebuchet,
  },
  container: {
    flex: 1,
  },
};

// Estilos gerais utilizados
const general = {
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBetweenCenter: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  backgroundBlack: {
    backgroundColor: colors.black,
  },
  backgroundverdeEscuro: {
    backgroundColor: colors.verdeEscuro,
  },
  windowRegister: {
    width: metrics.screenWidth * 0.9,
    height: metrics.screenHeight * 0.8,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'left',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  textWhiteTitle: {
    ...baseStyles.text,
    fontSize: fonts.big,
    color: colors.white,
  },
  buttonTransparent: {
    ...baseStyles.buttonRounds,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.verdeMedio,
  },
  buttonVerde: {
    ...baseStyles.buttonRounds,
    backgroundColor: colors.verdeMedio,
  },
  imageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    opacity: 0.8,
  },
  overlayContainer: {
    width: 350,
    height: 150,
    borderWidth: 3,
    borderColor: '#006f4c',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 600, 
  },
  map: {
    width: '100%',
    height: 600,
  },
  textWhite: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.white,
  },
  notificationBox: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.verdeMedio,
  },
  textBlackRegular: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.black,
    marginRight: 10,
    width: 100,
  },
  textWhiteRegular: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.white,
  },
  textInputBorder: {
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: fonts.regular,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.verdeEscuro,
    borderRadius: 10,
    marginVertical: 8,
  },
  textVerdeClaro: {
    ...baseStyles.text,
    fontSize: fonts.regular,
    color: colors.verdeClaro,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  windowsLogin:{
     width: metrics.screenWidth * 0.9,
     height: metrics.screenHeight * 0.4,
     borderRadius: 50,
     backgroundColor: colors.white,
     alignItems: 'left', 
     justifyContent: 'center',
     paddingHorizontal: 10,
  }, 
  titleLogado: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 30,
    fontStyle: 'italic',
  },
  textInputNovaReclamacao: {
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: fonts.regular,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: colors.verdeEscuro,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
  },
  textInputDescricaoNovaReclamacao: {
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: fonts.regular,
    height: 120,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: colors.verdeEscuro,
    borderRadius: 10,
    marginVertical: 8
  },
  cepContainer: {
  padding: 16,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
cepInput: {
  height: 40,
  width: '70%',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  
},
cepButtonBuscar: {
  backgroundColor: '#007a53',
  padding: 10,
  borderRadius: 5,
},
backgroundClaro:{
    backgroundColor: colors.claro,
  },
  
};

export default general;
