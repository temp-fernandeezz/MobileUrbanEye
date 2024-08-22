import React from "react";
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styles from "../Styles/styles";
import CarrosselInfoSobre from "./ScrollViewSobre";

const TelaInicial = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.backgroundBlack}>
          <ImageBackground
            source={require("../Images/fundoCidade.jpg")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 400,
              opacity: 0.8,
            }}
            resizeMode="cover"
          >
            <View
              style={{
                width: 350,
                height: 350,
                borderWidth: 3,
                borderColor: "#006f4c",
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.containerCenter}>
                <Text style={styles.textWhiteTitle}>UrbanEye</Text>
                <View style={styles.rowContainer}>
                  <TouchableOpacity style={styles.buttonVerde}>
                    <Text style={styles.textWhite}>Buscar Locais</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonTransparent}>
                    <Text style={styles.textWhite}>Realizar Reclamação</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.backgroundverdeEscuro}>
          <CarrosselInfoSobre />
        </View>
        <View style={styles.backgroundClaro}>
          <View
            style={[
              styles.containerCenter,
              { alignItems: "center", justifyContent: "center", margin: 15 },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
              Serviços da UrbanEye
            </Text>
            <Text
              style={[
                styles.textBlackMedium,
                { textAlign: "center", marginBottom: 30 },
              ]}
            >
              Explore os serviços especializados oferecidos pela UrbanEye...
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 15,
            }}
          >
            <Text style={[styles.textBlack, { fontWeight: "bold" }]}>
              Pesquisas e Consultas
            </Text>
            <Image
              source={require("../Images/exemploplanetamapa.jpg")}
              style={{ width: "70%", maxHeight: 200, resizeMode: "contain" }}
            />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={[
                  styles.textBlackMedium,
                  { textAlign: "justify", marginBottom: 30 },
                ]}
              >
                Com o UrbanEye, você tem acesso a informações detalhadas sobre
                os riscos da sua região. Nossa equipe de desenvolvedores está
                comprometida em fornecer dados precisos e atualizados para
                ajudar você a identificar áreas de risco e tomar decisões
                informadas. Experimente uma abordagem que prioriza sua segurança
                e bem-estar, mantendo você informado sobre os riscos ao seu
                redor. Mantenha-se seguro e protegido com o UrbanEye!
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 15,
            }}
          >
            <Text style={[styles.textBlack, { fontWeight: "bold" }]}>
              Gerenciamento de Reclamações
            </Text>
            <Image
              source={require("../Images/mapearReclamacao.jpg")}
              style={{ width: "70%", maxHeight: 200, resizeMode: "contain" }}
            />
            <View style={styles.containerCenter}>
              <Text
                style={[
                  styles.textBlackMedium,
                  { textAlign: "justify", marginBottom: 30 },
                ]}
              >
                Aproveite os serviços de gestão de reclamações da UrbanEye para
                manter nossos mapas atualizados. Nossa equipe garante que todas
                as preocupações sejam ouvidas e atendidas quando possível,
                promovendo um ambiente responsivo e de apoio.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.backgroundverdeEscuro]}>
          <ImageBackground
            source={require("../Images/meioAmbiente.jpg")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 200,
              opacity: 0.7,
            }}
            resizeMode="cover"
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "right",
                marginRight: "55%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Mantenha-se sempre informado sobre nosso blog.
              </Text>
              <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.buttonTransparent}>
                  <Text style={styles.textWhite}>Blog</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaInicial;
