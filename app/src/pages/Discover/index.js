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
  const [previewType, setPreviewType] = useState("");

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
    const { data } = await api.get("/discover/highlight");

    setDiscover({
      id: data[0].id,
      title: data[0].book_title,
      cover_url: data[0].book_cover_url,
      description: data[0].book_description,
      subject: data[0].book_subjects,
      position: data[0].position,
      author: data[0].book_author,
    });
  }

  useEffect(() => {
    getDiscover();

    api.get("/discover/subjects").then((res) => {
      setSubjects(res.data);
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
                  backgroundColor: discover.subjects
                    ? getSubjectColor(discover.subjects)
                    : "#a0c4ff99",
                }}
                activeOpacity={0.7}
                onPress={() => {
                  handleModal();
                  setOpenedBook(discover);
                  setPreviewType("discover");
                }}
              >
                <View>
                  <BookStorePlace>{`#${discover.position} selling this week`}</BookStorePlace>
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
                      setPreviewType("");
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
                    setPreviewType("");
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
      {modalState && previewType === "discover" && (
        <DiscoverPreview
          onBackPress={setModalState}
          book={openedBook}
          subject={activeSubject}
        >
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </DiscoverPreview>
      ) }
        {modalState && previewType !== "discover" && (
        <BookPreview onBackPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>)}
    </>
  );
};

export default Discover;
