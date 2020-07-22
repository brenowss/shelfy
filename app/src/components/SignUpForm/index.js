import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
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
  ErrorMessage,
  Success,
  SuccessTitle,
} from "./styles";

const SignUpForm = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { control, handleSubmit, errors } = useForm();

  const {
    handleRegister,
    existentEmail,
    setExistentEmail,
    success,
    setSuccess,
  } = useContext(Context);

  function handlePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  function handleModal() {
    props.onBackPress(false);
  }

  function matchPasswords() {
    setTimeout(() => {
      if (password !== passwordConfirm) {
        setPasswordMismatch(true);
      }
      if (password === passwordConfirm) {
        setPasswordMismatch(false);
      }
    }, 500);
  }

  useEffect(() => {
    matchPasswords();
  }, [password, passwordConfirm]);

  useEffect(() => {
    setExistentEmail(false);
    setSuccess(false)
  }, []);

  return (
    <Container isVisible={true} onBackButtonPress={handleModal}>
      <Header>
        {props.children}
        <ModalTitle>Sign up</ModalTitle>
        <View></View>
      </Header>

      {!success ? (
        <ScrollView>
          <InputGroup>
            <Label>Email</Label>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
            {existentEmail && (
              <ErrorMessage>Email already in use.</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Username</Label>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="username"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.username && (
              <ErrorMessage>Username is required.</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  secureTextEntry={passwordVisibility ? false : true}
                  autoCompleteType="off"
                  onChangeText={(value) => {
                    onChange(value);
                    setPassword(value);
                  }}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.password && (
              <ErrorMessage>Password is required.</ErrorMessage>
            )}
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
          <InputGroup>
            <Label>Confirm your password</Label>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  secureTextEntry={passwordVisibility ? false : true}
                  autoCompleteType="off"
                  onChangeText={(value) => {
                    onChange(value);
                    setPasswordConfirm(value);
                  }}
                  value={value}
                />
              )}
              name="passwordConfirmation"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.passwordConfirmation && (
              <ErrorMessage>Password is required.</ErrorMessage>
            )}
            {passwordMismatch && (
              <ErrorMessage>Passwords must match.</ErrorMessage>
            )}
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
            <FormSend onPress={handleSubmit(handleRegister)}>
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
          </Actions>
        </ScrollView>
      ) : (
        <Animatable.View
          animation="fadeIn"
          duration={1400}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Success source={require("../../assets/success.png")} />
          <SuccessTitle>Succesfully registered</SuccessTitle>
        </Animatable.View>
      )}
    </Container>
  );
};

export default SignUpForm;
