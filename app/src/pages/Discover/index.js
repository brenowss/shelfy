import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Constants from "expo-constants";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { getSubjectColor, getMainSubject } from "../../utils/subjectsFactory";

import {
  Container,
  ScreenTitle,
  Indication,
  CardContainer,
  CardBanner,
  BookSubject,
  BookCover,
  CardInfo,
  BookTitle,
  BookAuthor,
  ViewButton,
  ViewButtonText,
} from "./styles";

const Discover = () => {
  const [discover, setDiscover] = useState(null);

  function getDiscover() {
    fetch(`https://openlibrary.org/works/OL16637768W.json`)
      .then((res) => res.json())
      .then((res) => {
        setDiscover(res);
      });
  }
  useEffect(() => {
    getDiscover();
  }, []);

  return (
    <Container style={{ paddingTop: Constants.statusBarHeight + 30 }}>
      <ScreenTitle>Discover</ScreenTitle>
      <Indication>Find new books that match your taste</Indication>
      {discover ? (
        <CardContainer>
          <CardBanner
            style={{ backgroundColor: getSubjectColor(discover.subjects) }}
            activeOpacity={0.7}
          >
            <BookSubject>{getMainSubject(discover.subjects)}</BookSubject>
            <BookCover
              source={{
                uri: `http://covers.openlibrary.org/b/id/${discover.covers[0]}-L.jpg`,
              }}
            />
          </CardBanner>
          <CardInfo>
            <View>
              <BookTitle>{discover.title}</BookTitle>
              <BookAuthor>
                <Icon name="pencil-alt" size={10} />{" "}
                {discover.authors[0].name
                  ? discover.authors[0].name
                  : "Unknown writer"}
              </BookAuthor>
            </View>
            <ViewButton
              onPress={() => {
                console.log(discover.subjects);
              }}
            >
              <ViewButtonText>View</ViewButtonText>
            </ViewButton>
          </CardInfo>
        </CardContainer>
      ) : (
        <ActivityIndicator size="large" color="#2FA749" />
      )}
    </Container>
  );
};

export default Discover;
