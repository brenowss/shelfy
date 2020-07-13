import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import * as Animatable from "react-native-animatable";

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

  function handleModal(book) {
    props.setOpenedBook(book);
  }

  function getBooks() {
    activeSubject &&
      fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=8&q=subject:${activeSubject}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          setRelevantBooks(res.items);
        });

    fetch(
      `https://www.googleapis.com/books/v1/volumes?maxResults=8&q=subject:${activeSubject}&orderBy=newest&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setRecentBooks(res.items);
      });
  }

  useEffect(() => {
    setActiveSubject(props.subject.url);
  }, [props]);

  useEffect(() => {
    getBooks();
  }, [activeSubject]);

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
          <FollowButton style={{ borderColor: props.subject.color }}>
            <Icon name="plus" size={16} color="#1b2d45" />
            <Text
              style={{
                marginLeft: 7,
                fontFamily: "GothamMedium",
                fontSize: 16,
                color: "#1b2d45",
              }}
            >
              Follow
            </Text>
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
                        uri: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/300.png/09f/eee'
                      }}
                    />
                    <BookAuthor>
                      <Icon name="pencil-alt" size={10} />{" "}
                      {book.volumeInfo.authors ? book.volumeInfo.authors[0] : book.volumeInfo.publisher }
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
                        uri: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/300.png/09f/eee'
                      }}
                    />
                    <BookAuthor>
                      <Icon name="pencil-alt" size={10} />{" "}
                      {book.volumeInfo.authors ? book.volumeInfo.authors[0] : book.volumeInfo.publisher }
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
