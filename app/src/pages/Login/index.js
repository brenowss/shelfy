import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";
import Svg, { Path } from "react-native-svg";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import SignInForm from "../../components/SignInForm";

import {
  Container,
  BannerContainer,
  Logo,
  Texts,
  Heading,
  AppName,
  Lema,
  Actions,
  ActionButton,
} from "./styles";

const Login = () => {
  const [modalState, setModalState] = useState(false);

  function handleModal() {
    setModalState(!modalState);
  }

  return (
    <View>
      <BannerContainer>
        <Svg height="60%" width="100%">
          <Path
            d="M0 209.5C77.6997 190.758 167.059 131.226 242.08 139.258C259.127 141.02 374 187 423 177C508.5 170 507.616 198.609 523.5 209.5L523.5 4.57764e-05L233.999 3.57262e-05L1.83151e-05 3.05281e-05L0 209.5Z"
            fill="#F0F0F0"
          />
        </Svg>
        <Logo source={require("../../assets/logo.png")} />
      </BannerContainer>
      <Animatable.View animation="slideInUp">
        <Container>
          <Texts>
            <Heading>Welcome to</Heading>
            <AppName>Shelfy</AppName>
            <Lema>
              Your new way of keeping track of your reads and finding new books
              that match your taste.
            </Lema>
          </Texts>
          <Actions>
            <ActionButton
              style={{ backgroundColor: "#266EF1" }}
              onPress={handleModal}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "GothamMedium",
                  fontSize: 18,
                }}
              >
                Sign in using your email{" "}
                <Icon name="arrow-right" size={18} style={{ marginLeft: 5 }} />
              </Text>
            </ActionButton>
            <ActionButton style={{ backgroundColor: "#eee" }}>
              <Text
                style={{
                  color: "#000",
                  fontFamily: "GothamMedium",
                  fontSize: 18,
                }}
              >
                Sign in using Google{" "}
                <Icon
                  name="google"
                  color="#4285F4"
                  size={18}
                  style={{ marginLeft: 5 }}
                />
              </Text>
            </ActionButton>
            <Text
              style={{
                fontFamily: "GothamMedium",
                fontSize: 18,
                color: "#717171",
                textAlign: "center",
                marginTop: 12,
              }}
            >
              Don’t have an account yet?
            </Text>
            <ActionButton style={{ backgroundColor: "#4376A8" }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "GothamMedium",
                  fontSize: 18,
                }}
              >
                Sign up right now{" "}
                <Icon name="arrow-right" size={18} style={{ marginLeft: 5 }} />
              </Text>
            </ActionButton>
          </Actions>
        </Container>
      </Animatable.View>
      {modalState && (
        <SignInForm>
          <TouchableOpacity onPress={handleModal} style={{ width: 50, height: 35 }}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </SignInForm>
      )}
    </View>
  );
};

export default Login;
