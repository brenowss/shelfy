import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import api from "../../services/api";
import {
  getSubjectColor,
  getMainSubject,
} from "../../services/subjectsFactory";

import BookPreview from "../../components/BookPreview";
import SubjectView from "../../components/SubjectView";

import {
  Container,
  ScreenTitle,
  Indication,
  SearchBar,
  SearchInput,
  CardContainer,
  CardBanner,
  Title,
  BookStorePlace,
  BookCover,
  BookTitle,
  BookAuthor,
  DiscoverSection,
  DiscoverCard,
  CardTitle,
  CardCover,
} from "./styles";

const Discover = () => {
  const [modalState, setModalState] = useState(false);
  const [discover, setDiscover] = useState(null);
  const [openedBook, setOpenedBook] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);

  const route = useRoute();

  function handleModal() {
    setModalState(!modalState);
  }

  function handleSubject() {
    route.params && setActiveSubject(route.params.subject);
  }

  function handleBook(book) {
    setModalState(!modalState);
    setOpenedBook(book);
  }

  async function getDiscover() {
    const {
      data: { highlight },
    } = await api.get("/highlight");

    fetch(
      `https://www.googleapis.com/books/v1/volumes/${highlight.google_books_id}?key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setDiscover(res);
      });
  }

  useEffect(() => {
    getDiscover();

    api.get("/subjects").then((res) => {
      const orderedSubjects = res.data.subjects.sort((a, b) => a.name.localeCompare(b.name))
      setSubjects(orderedSubjects);
    });
  }, []);

  useLayoutEffect(() => {
    handleSubject();
  }, [route.params]);

  return (
    <>
      {!activeSubject ? (
        <Container>
          <ScreenTitle>Discover</ScreenTitle>
          <Indication>Find new books that match your taste</Indication>
          <SearchBar>
            <Icon name="search" size={16} />
            <SearchInput
              returnKeyType="search"
              placeholder="Search"
              placeholderTextColor="#555"
            />
          </SearchBar>
          {discover ? (
            <CardContainer>
              <CardBanner
                style={{
                  backgroundColor: discover.volumeInfo.categories
                    ? getSubjectColor(discover.volumeInfo.categories[0])
                    : "#a0c4ff99",
                }}
                activeOpacity={0.7}
                onPress={() => {
                  handleModal();
                  setOpenedBook(discover);
                }}
              >
                <View>
                  <BookStorePlace>#1 selling this week</BookStorePlace>
                  <BookTitle>{discover.volumeInfo.title}</BookTitle>
                  <BookAuthor>
                    <Icon name="pencil-alt" size={10} />{" "}
                    {discover.volumeInfo.authors ? discover.volumeInfo.authors[0] : "Unknown author"}
                  </BookAuthor>
                </View>
                <BookCover
                  source={{
                    uri: discover.volumeInfo.imageLinks.large ? discover.volumeInfo.imageLinks.large : discover.volumeInfo.imageLinks.thumbnail
                  }}
                />
              </CardBanner>
            </CardContainer>
          ) : (
            <ActivityIndicator size="large" color="#2FA749" />
          )}
          <Title>Recommended for you</Title>
          <DiscoverSection>
            <DiscoverCard
              style={{
                width: Dimensions.get("window").width * 0.46,
              }}
              onPress={() => {
                // make function
              }}
            >
              <LinearGradient
                start={{ x: -0.6, y: 0 }}
                end={{ x: 0.7, y: 0 }}
                colors={["#333333aa", "#b8c1ec"]}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 8,
                  flexDirection: "row",
                }}
              >
                <CardTitle>Made for you</CardTitle>
                <CardCover source={{}} />
              </LinearGradient>
            </DiscoverCard>
            <DiscoverCard
              style={{
                width: Dimensions.get("window").width * 0.46,
              }}
              onPress={() => {
                // make function
              }}
            >
              <LinearGradient
                start={{ x: -0.6, y: 0 }}
                end={{ x: 0.7, y: 0 }}
                colors={["#333333aa", "#ff8906"]}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 8,
                  flexDirection: "row",
                }}
              >
                <CardTitle>Greatest hits</CardTitle>
                <CardCover source={{}} />
              </LinearGradient>
            </DiscoverCard>
          </DiscoverSection>
          <Title>Popular book subjects</Title>
          <DiscoverSection>
            {subjects &&
              subjects
                .filter(
                  (subject) =>
                    subject.name === "Romance" || subject.name === "Mystery"
                )
                .map((subject) => (
                  <DiscoverCard
                    key={subject.name}
                    style={{
                      width: Dimensions.get("window").width * 0.46,
                    }}
                    onPress={() => {
                      setActiveSubject(subject);
                    }}
                  >
                    <LinearGradient
                      start={{ x: -0.6, y: 0 }}
                      end={{ x: 0.7, y: 0 }}
                      colors={["#111111aa", `${subject.color}`]}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 8,
                        flexDirection: "row",
                      }}
                    >
                      <CardTitle>{subject.name}</CardTitle>
                      <CardCover source={{ uri: subject.image }} />
                    </LinearGradient>
                  </DiscoverCard>
                ))}
          </DiscoverSection>

          <Title>Browse all</Title>
          <DiscoverSection>
            {subjects &&
              subjects.map((subject) => (
                <DiscoverCard
                  key={subject.name}
                  style={{
                    width: Dimensions.get("window").width * 0.46,
                  }}
                  onPress={() => {
                    setActiveSubject(subject);
                  }}
                >
                  <LinearGradient
                    start={{ x: -0.6, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                    colors={["#111111aa", `${subject.color}`]}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 8,
                      flexDirection: "row",
                    }}
                  >
                    <CardTitle>{subject.name}</CardTitle>
                    <CardCover source={{ uri: subject.image }} />
                  </LinearGradient>
                </DiscoverCard>
              ))}
          </DiscoverSection>
          <View style={{ height: 45, width: "100%" }} />
        </Container>
      ) : (
        <SubjectView
          subject={activeSubject}
          setOpenedBook={handleBook}
          setModalState
        >
          <TouchableOpacity
            onPress={() => {
              setActiveSubject(null);
            }}
          >
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </SubjectView>
      )}
      {modalState && (
        <BookPreview onBackPress={handleModal} book={openedBook} subject={activeSubject}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>
      )}
    </>
  );
};

export default Discover;
