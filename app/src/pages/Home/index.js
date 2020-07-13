import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProgressCircle from "react-native-progress-circle";

import BookPreview from "../../components/BookPreview";

import api from "../../services/api";

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
  const [openedBook, setOpenedBook] = useState(null);
  const [recentProgress, setRecentProgress] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [subjects, setSubjects] = useState(null);

  const navigation = useNavigation();

  function getRecommendations() {
    fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=8&q=flowers+subject:romance&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        setHomeRecommendations(res.items);
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

  function handleNavigateToSubject(subject) {
    navigation.navigate('Discover', { subject })
  }

  const isDay = () => {
    let hour = new Date().getHours();
    if (hour >= 7 && hour < 12) {
      setGreeting("Good morning,");
    }
    if (hour >= 12 && hour < 18) {
      setGreeting("Welcome,");
    }
    if (hour >= 18 && hour < 24) {
      setGreeting("Good night,");
    }
  };
  useEffect(() => {
    isDay();
    getRecommendations();
    getRecentProgress();
    api.get("/discover/subjects").then((res) => {
      setSubjects(res.data);
    });
  }, []);

  return (
    <>
      <Container>
        <ScreenTitle>
          {greeting} <Text style={{ fontFamily: "GothamBold" }}>Breno</Text>
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
                <BookContainer
                  key={work.id}
                  onPress={() => {
                    handleModal();
                    setOpenedBook(work);
                  }}
                >
                  <BookCover
                    source={{
                      uri: work.volumeInfo.imageLinks.thumbnail,
                    }}
                  />
                  <BookAuthor>
                    <Icon name="pencil-alt" size={10} /> {work.volumeInfo.authors[0]}
                  </BookAuthor>
                  <BookTitle>{work.volumeInfo.title}</BookTitle>
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
          {subjects ? (
            subjects.map((subject) => (
              <Subject
                key={subject.name}
                style={{ backgroundColor: `${subject.color}66` }} //the 66 sets the alpha opacity to the HEX subject.color
                onPress={() => {
                  handleNavigateToSubject(subject);
                }}
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
        <BookPreview onBackdropPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>
      )}
    </>
  );
};
