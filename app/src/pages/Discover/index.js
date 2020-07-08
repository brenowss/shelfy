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
import SubjectView from "../../components/SubjectView";
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
  SubjectTitle,
  SubjectCover,
} from "./styles";

const Discover = () => {
  const [modalState, setModalState] = useState(false);
  const [discover, setDiscover] = useState(null);
  const [openedBook, setOpenedBook] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);

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

    api.get("subjects").then((res) => {
      setSubjects(res.data);
    });
  }, []);

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
              {subjects &&
                subjects.slice(0, 2).map((subject) => (
                  <Subject
                    key={subject.name}
                    style={{
                      width: Dimensions.get("window").width * 0.46,
                    }}
                    onPress={() => {
                      setActiveSubject(subject);
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0.7, y: 0 }}
                      colors={["#111111aa", `${subject.color}`]}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 8,
                        flexDirection: "row",
                      }}
                    >
                      <SubjectTitle>{subject.name}</SubjectTitle>
                      <SubjectCover source={{ uri: subject.image }} />
                    </LinearGradient>
                  </Subject>
                ))}
            </SubjectRow>
            <SubjectRow>
              {subjects &&
                subjects.slice(2, 4).map((subject) => (
                  <Subject
                    key={subject.name}
                    style={{
                      width: Dimensions.get("window").width * 0.46,
                    }}
                    onPress={() => {
                      setActiveSubject(subject);
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0.7, y: 0 }}
                      colors={["#111111aa", `${subject.color}`]}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 8,
                        flexDirection: "row",
                      }}
                    >
                      <SubjectTitle>{subject.name}</SubjectTitle>
                      <SubjectCover source={{ uri: subject.image }} />
                    </LinearGradient>
                  </Subject>
                ))}
            </SubjectRow>
            <SubjectRow>
              {subjects &&
                subjects.slice(4, 6).map((subject) => (
                  <Subject
                    key={subject.name}
                    style={{
                      width: Dimensions.get("window").width * 0.46,
                    }}
                    onPress={() => {
                      setActiveSubject(subject);
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0.7, y: 0 }}
                      colors={["#111111aa", `${subject.color}`]}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 8,
                        flexDirection: "row",
                      }}
                    >
                      <SubjectTitle>{subject.name}</SubjectTitle>
                      <SubjectCover source={{ uri: subject.image }} />
                    </LinearGradient>
                  </Subject>
                ))}
            </SubjectRow>
          </Subjects>
        </Container>
      ) : (
        <SubjectView subject={activeSubject}>
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
        <DiscoverPreview onBackdropPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </DiscoverPreview>
      )}
    </>
  );
};

export default Discover;
