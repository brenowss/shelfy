import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {
  Container,
  ScreenTitle,
  Recommendations,
  RecommendationsList,
  SectionTitle,
  BookContainer,
  BookCover,
  BookAuthor,
  BookTitle,
} from "./styles";

import { AppLoading } from "expo";

export default Home = () => {
  const [greeting, setGreeting] = useState("");

  const [homeRecommendations, setHomeRecommendations] = useState(null);

  function getRecommendations() {
    fetch("https://openlibrary.org/subjects/love.json?limit=5")
      .then((res) => res.json())
      .then((res) => {
        setHomeRecommendations(res.works);
      });
  }

  const isDay = () => {
    var hr = new Date().getHours();
    if (hr > 18) {
      setGreeting("Boa noite,");
    } else {
      setGreeting("Bom dia,");
    }
  };
  useEffect(() => {
    isDay();
    getRecommendations();
  }, []);

  return (
    <Container>
      <ScreenTitle>{greeting} Breno</ScreenTitle>
      <Recommendations>
        <SectionTitle>Recommendations</SectionTitle>
        <RecommendationsList  horizontal={true} showsVerticalScrollIndicator={false}>
          {homeRecommendations ? (
            homeRecommendations.map((work) => (
              <BookContainer key={work.title}>
                <BookCover
                  source={{uri: `http://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`}}
                    style={{ resizeMode: 'stretch'}}
                />
                <BookAuthor><Icon name="user-alt" size={10} /> {work.authors[0].name}</BookAuthor>
                <BookTitle>{work.title}</BookTitle>
              </BookContainer>
            ))
          ) : (
            <AppLoading />
          )}
        </RecommendationsList>
      </Recommendations>
    </Container>
  );
};
