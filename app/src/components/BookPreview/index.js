import React, { useState } from "react";
import { Text } from "react-native";

import * as WebBrowser from 'expo-web-browser';

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {
  Container,
  BackArrow,
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

const BookPreview = (props) => {
  const [bookDescription, setBookDescription] = useState();

  function handleModal() {
    props.onBackdropPress(false);
  }

  function getBookDescription() {
    const book_olid = props.book.key.replace("/works/", "");
    fetch(`https://openlibrary.org/works/${book_olid}.json`)
      .then((res) => res.json())
      .then((res) => {
        if (typeof res.description === "object" && res.description !== null) {
          setBookDescription(res.description.value);
        }
        if (typeof res.description === "string") {
          setBookDescription(res.description);
        }
        if (res.description === null) {
          setBookDescription(null);
        }
      });
  }

  function handleGoogleSearch(title, author) {
    const book_title = title.replace(/ /, '+');
    const book_author = author.replace(/ /, '+');
    WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${book_title}+by+${book_author}`)
  }

  return (
    <Container
      isVisible={true}
      onBackButtonPress={handleModal}
    >
      <Header>{props.children}</Header>
      <BookContainer>
        <BookCover
          source={{
            uri: `http://covers.openlibrary.org/b/id/${props.book.cover_id}-L.jpg`,
          }}
        />
        <BookTitle>{props.book.title}</BookTitle>
        <BookAuthor>{props.book.authors[0].name}</BookAuthor>
        <BookSubjects horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            (props.book.subject && getBookDescription(),
            props.book.subject.slice(0, 3).map((subject) => (
              <BookSubject key={subject}>
                <Text
                  style={{
                    fontFamily: "Raleway_400Regular",
                    textTransform: "capitalize",
                  }}
                >
                  {subject}
                </Text>
              </BookSubject>
            )))
          }
        </BookSubjects>
        <Title>Description:</Title>
        <BookDescription>
          {bookDescription && (
            <Text
              style={{
                fontFamily: "Raleway_500Medium",
                marginVertical: 12,
                color: "#666",
                textAlign: "justify",
              }}
            >
              {bookDescription}
            </Text>
          )}
          {bookDescription === null && (
            <Text
              style={{
                fontFamily: "Raleway_500Medium",
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
        <WebSearch onPress={() => {
          handleGoogleSearch(props.book.title, props.book.authors[0].name)
        }}>
          <Text
            style={{
              fontFamily: "Raleway_600SemiBold",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Google it
          </Text>
        </WebSearch>
      </Actions>
    </Container>
  );
};

export default BookPreview;
