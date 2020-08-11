import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Context } from "../../services/UserContext";

import * as Animatable from "react-native-animatable";

import api from "../../services/api";

import { LinearGradient } from "expo-linear-gradient";

import { FontAwesome5 as Icon } from "@expo/vector-icons";
import {
  Container,
  Header,
  SubjectTitle,
  FollowButton,
  BooksContainer,
  SelectionContainer,
  Title,
  HorizontalScroll,
  Book,
  BookCover,
  BookAuthor,
  BookTitle,
} from "./styles";

const SubjectView = (props) => {
  const [activeSubject, setActiveSubject] = useState(null);
  const [relevantBooks, setRelevantBooks] = useState(null);
  const [recentBooks, setRecentBooks] = useState(null);
  const [follow, setFollow] = useState(false);

  const { activeUser } = useContext(Context);

  function handleModal(book) {
    props.setOpenedBook(book);
  }

  function getBooks() {
    activeSubject &&
      fetch(
        `https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo(title,imageLinks,authors,categories,description))&maxResults=8&q=subject:${activeSubject}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRelevantBooks(res.items);
        });

    fetch(
      `https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo(title,imageLinks,authors,categories,description))&maxResults=8&q=subject:${activeSubject}&orderBy=newest&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setRecentBooks(res.items);
      });
  }

  function handleFollow(subject) {
    api
      .post("/user_subjects", { subject, user_id: activeUser.id })
      .then((res) => {
        if (res.status === 200) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      });
  }

  function handleUnfollow(subject) {
    api
      .delete(`/user_subjects?user_id=${activeUser.id}&subject=${subject}`)
      .then((res) => {
        if (res.status === 200) {
          setFollow(false);
        } else {
          setFollow(true);
        }
      });
  }

  useEffect(() => {
    setActiveSubject(props.subject.url);
  }, [props]);

  useEffect(() => {
    getBooks();
  }, [activeSubject]);

  useEffect(() => {
    api
      .get(
        `/user_subjects?user_id=${activeUser.id}&subject=${props.subject.url}`
      )
      .then(({ status }) => {
        status === 200 ? setFollow(true) : setFollow(false);
      });
  }, [props.subject]);

  return (
    <Animatable.View
      animation="fadeIn"
      duration={400}
      style={{ height: "100%" }}
    >
      <View style={{ height: 230 }}>
        <LinearGradient
          colors={[`${props.subject.color}aa`, "#fffffe"]} // the aa sets the alpha opacity to the HEX props.subject.color
          style={{
            width: "100%",
            height: 180,
            paddingTop: 50,
            paddingHorizontal: 12,
          }}
        >
          <Header>{props.children}</Header>
          <SubjectTitle>{props.subject.name}</SubjectTitle>
          <FollowButton
            style={{
              borderColor: props.subject.color,
              backgroundColor: follow ? props.subject.color : "#fff",
            }}
            onPress={() => {
              follow === false
                ? handleFollow(props.subject.url)
                : handleUnfollow(props.subject.url);
            }}
          >
            <Text
              style={{
                marginRight: 7,
                fontFamily: "GothamMedium",
                fontSize: 16,
                color: follow ? "#fff" : "#1b2d45",
              }}
            >
              {follow ? "Following" : "Follow"}
            </Text>
            <Icon
              name={follow ? "check" : "plus"}
              size={16}
              color={follow ? "#fff" : "#1b2d45"}
            />
          </FollowButton>
        </LinearGradient>
      </View>
      <Container>
        <BooksContainer>
          <SelectionContainer>
            <Title>Relevant</Title>
            <HorizontalScroll
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {relevantBooks ? (
                relevantBooks.map((book) => (
                  <Book
                    key={book.id}
                    onPress={() => {
                      handleModal(book);
                    }}
                  >
                    <BookCover
                      source={{
                        uri: book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.thumbnail
                          : "https://via.placeholder.com/300.png/09f/eee",
                      }}
                    />
                    <BookAuthor>
                      <Icon name="pencil-alt" size={10} />{" "}
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors[0]
                        : book.volumeInfo.publisher}
                    </BookAuthor>
                    <BookTitle>{book.volumeInfo.title}</BookTitle>
                  </Book>
                ))
              ) : (
                <ActivityIndicator size="large" color="#2FA749" />
              )}
            </HorizontalScroll>
          </SelectionContainer>

          <SelectionContainer>
            <Title>Recent releases</Title>
            <HorizontalScroll
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {recentBooks ? (
                recentBooks.map((book) => (
                  <Book
                    key={book.id}
                    onPress={() => {
                      handleModal(book);
                    }}
                  >
                    <BookCover
                      source={{
                        uri: book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.thumbnail
                          : "https://via.placeholder.com/300.png/09f/eee",
                      }}
                    />
                    <BookAuthor>
                      <Icon name="pencil-alt" size={10} />{" "}
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors[0]
                        : book.volumeInfo.publisher}
                    </BookAuthor>
                    <BookTitle>{book.volumeInfo.title}</BookTitle>
                  </Book>
                ))
              ) : (
                <ActivityIndicator size="large" color="#2FA749" />
              )}
            </HorizontalScroll>
          </SelectionContainer>
        </BooksContainer>
      </Container>
    </Animatable.View>
  );
};

export default SubjectView;
