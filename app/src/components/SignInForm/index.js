import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {
  Container,
  Header,
  ModalTitle,
  InputGroup,
  Label,
  Input,
  Actions,
  FormSend,
  ForgotPassword,
} from "./styles";

const SignInForm = (props) => {

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function handlePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility)
  }

  function handleModal() {
    props.onBackPress(false);
  }

  return (
    <Container isVisible={true} onBackButtonPress={handleModal}>
      <Header>
        {props.children}
        <ModalTitle>Sign in</ModalTitle>
        <View></View>
        </Header>
      <InputGroup>
        <Label>Email</Label>
        <Input />
      </InputGroup>
      <InputGroup>
        <Label>Password</Label>
        <Input secureTextEntry={passwordVisibility ? false : true} autoCompleteType="off" />
        <TouchableOpacity style={{ position: "absolute", top: 40, right: 12 }} onPress={handlePasswordVisibility}>
          <Icon name={passwordVisibility ? "eye-slash" : "eye"} size={20} color="#162335" />
        </TouchableOpacity>
      </InputGroup>
      <Actions>
        <FormSend>
          <Text
            style={{
              color: "#fff",
              fontFamily: "GothamMedium",
              fontSize: 18,
            }}
          >
            Sign in
          </Text>
        </FormSend>
        <ForgotPassword>
          <Text
            style={{
              fontFamily: "GothamMedium",
              fontSize: 12,
            }}
          >
            Can't remember your password? Click here
          </Text>
        </ForgotPassword>
      </Actions>
    </Container>
  );
};

export default SignInForm;
