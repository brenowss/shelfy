import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import * as WebBrowser from "expo-web-browser";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {
  Container,
  BookTitle,
  BookAuthor,
  Header,
  BookContainer,
  BookCover,
  BookSubject,
  Title,
  BookDescription,
  Actions,
  AddShelf,
  WebSearch,
} from "./styles";

const BookPreview = (props) => {
  function handleGoogleSearch(title, author) {
    const book_title = title.replace(/ /, "+");
    const book_author = author.replace(/ /, "+");
    WebBrowser.openBrowserAsync(
      `https://www.google.com/search?q=${book_title}+by+${book_author}`
    );
  }

  return (
    <Container isVisible={true} onBackButtonPress={() => {props.onBackPress()}}>
      <Header>{props.children}</Header>
      <BookContainer>
        <BookCover
          source={{
            uri: props.book.volumeInfo.imageLinks.thumbnail,
          }}
        />
        <BookTitle>{props.book.volumeInfo.title}</BookTitle>
        <BookAuthor>{props.book.volumeInfo.authors[0]}</BookAuthor>
        <BookSubject>
          <Text
            style={{
              fontFamily: "GothamThin",
              textTransform: "capitalize",
            }}
          >
            {props.book.volumeInfo.categories ? props.book.volumeInfo.categories[0] : props.subject.name}
          </Text>
        </BookSubject>
        <Title>Description:</Title>
        <BookDescription>
          <Text
            style={{
              fontFamily: "GothamLight",
              marginVertical: 12,
              color: "#666",
              textAlign: "justify",
            }}
          >
            {props.book.volumeInfo.description
              ? props.book.volumeInfo.description
              : "We couldn't find any description for this book. Try again later."}
          </Text>
        </BookDescription>
      </BookContainer>
      <Actions>
        <AddShelf>
          <Icon name="plus" color={"#69CA87"} size={16} />
        </AddShelf>
        <WebSearch
          onPress={() => {
            handleGoogleSearch(
              props.book.volumeInfo.title,
              props.book.volumeInfo.authors[0]
            );
          }}
        >
          <Text
            style={{
              fontFamily: "GothamBold",
              fontSize: 16,
              color: "#fff",
            }}
          >
            <Icon name="google" size={18} color="#4285F4" /> Google it
          </Text>
        </WebSearch>
      </Actions>
    </Container>
  );
};

export default BookPreview;
