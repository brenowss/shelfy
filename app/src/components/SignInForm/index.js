import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Context } from "../../services/UserContext";

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
  ErrorMessage
} from "./styles";

const SignInForm = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { control, handleSubmit, errors } = useForm();

  const { handleLogin, wrongCredentials } = useContext(Context)

  function handlePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
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
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <Input onChangeText={(value) => onChange(value)} value={value} />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
        {wrongCredentials && <ErrorMessage>Your email or password is incorrect!</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Password</Label>
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <Input
              secureTextEntry={passwordVisibility ? false : true}
              autoCompleteType="off"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && <ErrorMessage>Password is required.</ErrorMessage>}
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 12 }}
          onPress={handlePasswordVisibility}
        >
          <Icon
            name={passwordVisibility ? "eye-slash" : "eye"}
            size={20}
            color="#162335"
          />
        </TouchableOpacity>
      </InputGroup>
      <Actions>
        <FormSend onPress={handleSubmit(handleLogin)}>
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
