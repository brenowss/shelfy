import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

import ProgressCircle from "react-native-progress-circle";

import BookPreview from "../../components/BookPreview";

import {
  FontAwesome5 as Icon,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  Container,
  ScreenTitle,
  Indication,
  Recommendations,
  RecommendationsList,
  SectionTitle,
  BookContainer,
  BookCover,
  BookAuthor,
  BookTitle,
  ProgressContainer,
  ProgressTitle,
  ProgressPercentage,
  ProgressUpdate,
  ProgressBookCover,
  SubjectsContainer,
  Subject,
  SubjectTitle,
} from "./styles";

export default Home = () => {
  const [greeting, setGreeting] = useState("");

  const [homeRecommendations, setHomeRecommendations] = useState(null);
  const [recentProgress, setRecentProgress] = useState(null);
  const [modalState, setModalState] = useState(false);

  const subjectsArray = [
    {
      name: "Romance",
      icon: "heart",
      color: "#e6394666",
    },
    {
      name: "Mystery",
      icon: "incognito",
      color: "#bdb2ff66",
    },
    {
      name: "Sci-Fi",
      icon: "alien",
      color: "#2fa74966",
    },
    {
      name: "Drama",
      icon: "drama-masks",
      color: "#ffc6ff66",
    },
    {
      name: "Self-Improvement",
      icon: "tree",
      color: "#a0c4ff66",
    },
  ];

  function getRecommendations() {
    fetch("https://openlibrary.org/subjects/science_fiction.json?limit=5")
      .then((res) => res.json())
      .then((res) => {
        setHomeRecommendations(res.works);
      });
  }

  function getRecentProgress() {
    fetch("https://openlibrary.org/works/OL1168210W.json")
      .then((res) => res.json())
      .then((res) => {
        setRecentProgress(res);
      });
  }

  function handleModal() {
    setModalState(!modalState);
  }

  const isDay = () => {
    let hour = new Date().getHours();
    if (hour >= 7 && hour < 12) {
      setGreeting("Good morning,");
    }
    if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon,");
    }
    if (hour >= 18 && hour < 24) {
      setGreeting("Good night,");
    }
  };
  useEffect(() => {
    isDay();
    getRecommendations();
    getRecentProgress();
  }, []);

  return (
    <>
      <Container style={{ paddingTop: Constants.statusBarHeight + 30 }}>
        <ScreenTitle>
          {greeting}{" "}
          <Text style={{ fontFamily: "Raleway_700Bold" }}>Breno</Text>
        </ScreenTitle>
        <Indication>Have you done your reading today?</Indication>
        <Recommendations>
          <SectionTitle>Recommendations</SectionTitle>
          <RecommendationsList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {homeRecommendations ? (
              homeRecommendations.map((work) => (
                <BookContainer key={work.title} onPress={handleModal}>
                  <BookCover
                    source={{
                      uri: `http://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
                    }}
                  />
                  <BookAuthor>
                    <Icon name="pencil-alt" size={10} /> {work.authors[0].name}
                  </BookAuthor>
                  <BookTitle>{work.title}</BookTitle>
                </BookContainer>
              ))
            ) : (
              <ActivityIndicator size="large" color="#2FA749" />
            )}
          </RecommendationsList>
        </Recommendations>

        <SectionTitle>Recent Progress</SectionTitle>
        {recentProgress ? (
          <ProgressContainer activeOpacity={0.5}>
            <ProgressCircle
              percent={0.3 * 100}
              radius={50}
              borderWidth={8}
              color="#5F67EC"
              shadowColor="#eee"
              bgColor="#fff"
            >
              <ProgressPercentage>{"30%"}</ProgressPercentage>
            </ProgressCircle>
            <View>
              <ProgressTitle>{recentProgress.title}</ProgressTitle>
              <ProgressUpdate>Change progress</ProgressUpdate>
            </View>
            <ProgressBookCover
              source={{
                uri: `http://covers.openlibrary.org/b/id/${recentProgress.covers[0]}-M.jpg`,
              }}
            />
          </ProgressContainer>
        ) : (
          <ActivityIndicator size="large" color="#2FA749" />
        )}
        <SectionTitle>Popular Subjects</SectionTitle>
        <SubjectsContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {subjectsArray ? (
            subjectsArray.map((subject) => (
              <Subject
                key={subject.name}
                style={{ backgroundColor: subject.color }}
              >
                <MaterialCommunityIcons name={subject.icon} size={18} />
                <SubjectTitle>{subject.name}</SubjectTitle>
              </Subject>
            ))
          ) : (
            <ActivityIndicator size="large" color="#2FA749" />
          )}
        </SubjectsContainer>
      </Container>
      {modalState && (
        <BookPreview>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>
      )}
    </>
  );
};
