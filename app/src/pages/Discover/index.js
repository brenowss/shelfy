import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import api from "../../services/api";
import {
  getSubjectColor,
  getMainSubject,
} from "../../services/subjectsFactory";

import DiscoverPreview from "../../components/DiscoverPreview";
import {
  Container,
  ScreenTitle,
  Indication,
  SearchBar,
  SearchInput,
  CardContainer,
  CardBanner,
  BookCover,
  BookTitle,
  BookAuthor,
  Subject,
  SubjectRow,
  Subjects,
} from "./styles";

const Discover = () => {
  const [modalState, setModalState] = useState(false);
  const [discover, setDiscover] = useState(null);
  const [openedBook, setOpenedBook] = useState(null);

  function handleModal() {
    setModalState(!modalState);
  }

  async function getDiscover() {
    const { data } = await api.get("/discover");
    const subjects = data[0].book_subjects && data[0].book_subjects.split(", ");

    setDiscover({
      id: data[0].id,
      title: data[0].book_title,
      cover_url: data[0].book_cover_url,
      description: data[0].book_description,
      subjects,
      author: data[0].book_author,
    });
  }
  useEffect(() => {
    getDiscover();
  }, []);

  const subjectsArray = [
    {
      name: "Romance",
      icon: "heart",
      color: "#e63946",
    },
    {
      name: "Mystery",
      icon: "incognito",
      color: "#bdb2ff",
    },
    {
      name: "Sci-Fi",
      icon: "alien",
      color: "#2fa749",
    },
    {
      name: "Drama",
      icon: "drama-masks",
      color: "#ffc6ff",
    },
    {
      name: "Fantasy",
      icon: "sword",
      color: "#f25f4c",
    },
    {
      name: "Self-Improvement",
      icon: "tree",
      color: "#a0c4ff",
    },
  ];

  return (
    <>
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
                backgroundColor: discover.subjects
                  ? getSubjectColor(discover.subjects)
                  : "#a0c4ff99",
              }}
              activeOpacity={0.7}
              onPress={() => {
                handleModal();
                setOpenedBook(discover);
              }}
            >
              <View>
                <BookTitle>{discover.title}</BookTitle>
                <BookAuthor>
                  <Icon name="pencil-alt" size={10} />{" "}
                  {discover.author ? discover.author : "Unknown writer"}
                </BookAuthor>
              </View>
              <BookCover
                source={{
                  uri: discover.cover_url,
                }}
              />
            </CardBanner>
          </CardContainer>
        ) : (
          <ActivityIndicator size="large" color="#2FA749" />
        )}
        <Subjects>
          <SubjectRow>
            {subjectsArray &&
              subjectsArray.slice(0, 2).map((subject) => (
                <Subject
                  key={subject.name}
                  style={{
                    width: Dimensions.get("window").width * 0.46,
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                    colors={["#111111aa", `${subject.color}`]}
                    style={{ height: "100%", width: "100%", borderRadius: 8 }}
                  ></LinearGradient>
                </Subject>
              ))}
          </SubjectRow>
          <SubjectRow>
            {subjectsArray &&
              subjectsArray.slice(2, 4).map((subject) => (
                <Subject
                  key={subject.name}
                  style={{
                    width: Dimensions.get("window").width * 0.46,
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                    colors={["#111111aa", `${subject.color}`]}
                    style={{ height: "100%", width: "100%", borderRadius: 8 }}
                  ></LinearGradient>
                </Subject>
              ))}
          </SubjectRow>
          <SubjectRow>
            {subjectsArray &&
              subjectsArray.slice(4, 6).map((subject) => (
                <Subject
                  key={subject.name}
                  style={{
                    width: Dimensions.get("window").width * 0.46,
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.7, y: 0 }}
                    colors={["#111111aa", `${subject.color}`]}
                    style={{ height: "100%", width: "100%", borderRadius: 8 }}
                  ></LinearGradient>
                </Subject>
              ))}
          </SubjectRow>
        </Subjects>
      </Container>
      {modalState && (
        <DiscoverPreview onBackdropPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </DiscoverPreview>
      )}
    </>
  );
};
width: Dimensions.get("window").width * 0.46;
export default Discover;
