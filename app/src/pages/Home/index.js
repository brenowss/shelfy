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
  ListContainer,
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
  const [moreFromAuthor1, setmoreFromAuthor1] = useState(null);
  const [moreFromSubject1, setmoreFromSubject1] = useState(null);

  const navigation = useNavigation();
  const recentAuthor1 = "George R. R. Martin";
  const recentSubject1 = "Cooking";

  function getRecommendations() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?maxResults=8&q=flowers+subject:romance&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
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

  function getMoreFromAuthors() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?maxResults=8&q=inauthor:${recentAuthor1}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setmoreFromAuthor1(res.items);
      });
  }

  function getMoreFromSubjects() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?maxResults=8&q=subject:${recentSubject1}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setmoreFromSubject1(res.items);
      });
  }

  function handleModal() {
    setModalState(!modalState);
  }

  function handleNavigateToSubject(subject) {
    navigation.navigate("Discover", { subject });
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
    getMoreFromAuthors();
    getMoreFromSubjects();
  }, []);

  return (
    <>
      <Container>
        <ScreenTitle>
          {greeting} <Text style={{ fontFamily: "GothamBold" }}>Breno</Text>
        </ScreenTitle>
        <Indication>Have you done your reading today?</Indication>
        <ListContainer>
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
                    <Icon name="pencil-alt" size={10} />{" "}
                    {work.volumeInfo.authors[0]}
                  </BookAuthor>
                  <BookTitle>{work.volumeInfo.title}</BookTitle>
                </BookContainer>
              ))
            ) : (
              <ActivityIndicator size="large" color="#2FA749" />
            )}
          </RecommendationsList>
        </ListContainer>
        <ListContainer>
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
        </ListContainer>
        <ListContainer>
          {moreFromAuthor1 ? (
            <>
              <SectionTitle>More from {recentAuthor1}</SectionTitle>
              <RecommendationsList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {moreFromAuthor1.map((work) => (
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
                      <Icon name="pencil-alt" size={10} />{" "}
                      {work.volumeInfo.authors[0]}
                    </BookAuthor>
                    <BookTitle>{work.volumeInfo.title}</BookTitle>
                  </BookContainer>
                ))}
              </RecommendationsList>
            </>
          ) : (
            <ActivityIndicator size="large" color="#2FA749" />
          )}
        </ListContainer>
        <ListContainer>
          {moreFromSubject1 ? (
            <>
              <SectionTitle>More from {recentSubject1}</SectionTitle>
              <RecommendationsList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {moreFromSubject1.map((work) => (
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
                      <Icon name="pencil-alt" size={10} />{" "}
                      {work.volumeInfo.authors[0]}
                    </BookAuthor>
                    <BookTitle>{work.volumeInfo.title}</BookTitle>
                  </BookContainer>
                ))}
              </RecommendationsList>
            </>
          ) : (
            <ActivityIndicator size="large" color="#2FA749" />
          )}
        </ListContainer>
        <View style={{ height: 45, width: "100%" }} />
      </Container>
      {modalState && (
        <BookPreview onBackPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>
      )}
    </>
  );
};
