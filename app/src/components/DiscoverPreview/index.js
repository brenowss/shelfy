import React, { useState } from "react";
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
  BookSubjects,
  BookSubject,
  Title,
  BookDescription,
  Actions,
  AddShelf,
  WebSearch,
} from "./styles";

const DiscoverPreview = (props) => {
  function handleModal() {
    props.onBackdropPress(false);
  }

  function handleGoogleSearch(title, author) {
    const book_title = title.replace(/ /, "+");
    const book_author = author.replace(/ /, "+");
    WebBrowser.openBrowserAsync(
      `https://www.google.com/search?q=${book_title}+by+${book_author}`
    );
  }

  return (
    <Container isVisible={true} onBackButtonPress={handleModal}>
      <Header>{props.children}</Header>
      <BookContainer>
        <BookCover
          source={{
            uri: props.book.cover_url,
          }}
        />
        <BookTitle>{props.book.title}</BookTitle>
        <BookAuthor>{props.book.author}</BookAuthor>
        <BookSubjects horizontal={true} showsHorizontalScrollIndicator={false}>
          {props.book.subjects ? props.book.subjects.slice(0, 3).map((subject) => (
            <BookSubject key={subject}>
              <Text
                style={{
                  fontFamily: "GothamThin",
                  textTransform: "capitalize",
                }}
              >
                {subject}
              </Text>
            </BookSubject>
          ))
          :
          (<BookSubject>
              <Text
                style={{
                  fontFamily: "GothamThin",
                  textTransform: "capitalize",
                }}
              >
                Literature
              </Text>
            </BookSubject>)
          }
        </BookSubjects>
        <Title>Description:</Title>
        <BookDescription>
          {props.book.description && (
            <Text
              style={{
                fontFamily: "GothamLight",
                marginVertical: 12,
                color: "#666",
                textAlign: "justify",
              }}
            >
              {props.book.description}
            </Text>
          )}
          {props.book.description === null && (
            <Text
              style={{
                fontFamily: "GothamLight",
                marginVertical: 12,
                fontSize: 22,
                color: "#666",
                textAlign: "justify",
              }}
            >
              We couldn't find any description for this book. Try again later.
            </Text>
          )}
        </BookDescription>
      </BookContainer>
      <Actions>
        <AddShelf>
          <Icon name="plus" color={"#69CA87"} size={16} />
        </AddShelf>
        <WebSearch
          onPress={() => {
            handleGoogleSearch(props.book.title, props.book.author);
          }}
        >
          <Text
            style={{
              fontFamily: "GothamMedium",
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

export default DiscoverPreview;
