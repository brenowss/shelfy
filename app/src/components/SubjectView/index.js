import React from "react";
import { Text } from "react-native";

import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import { Container, Header, Title } from "./styles";

const SubjectView = (props) => {
  return (
    <Animatable.View animation="fadeIn" duration={400}>
      <LinearGradient
        colors={[props.subject.color, "#fffffe"]}
        style={{
          width: "100%",
          height: 330,
        }}
      >
        <Container>
          <Header>{props.children}</Header>
          <Title>{props.subject.name}</Title>
        </Container>
      </LinearGradient>
    </Animatable.View>
  );
};

export default SubjectView;
