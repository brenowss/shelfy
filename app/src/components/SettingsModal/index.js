import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native";
import { Context } from "../../services/UserContext";

import api from "../../services/api";

import * as WebBrowser from "expo-web-browser";

import { FontAwesome5 as Icon, AntDesign } from "@expo/vector-icons";

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
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { activeUser, handleFavoriteChange } = useContext(Context);

  function handleGoogleSearch(title, author) {
    const book_title = title.replace(/ /, "+");
    const book_author = author.replace(/ /, "+");
    WebBrowser.openBrowserAsync(
      book_author
        ? `https://www.google.com/search?q=${book_title}+by+${book_author}`
        : `https://www.google.com/search?q=${book_title}`
    );
  }

  function handleLike(book_id) {
    api.post("/user_books", { book_id, user_id: activeUser.id }).then((res) => {
      if (res.status === 200) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  }

  function handleDislike(book_id) {
    api
      .delete(`/user_books?user_id=${activeUser.id}&book_id=${props.book.id}`)
      .then((res) => {
        if (res.status === 200) {
          setLiked(false);
        } else {
          setLiked(true);
        }
      });
  }

  function handleFavorite(book_id) {
    api
      .patch("/favorite", { user_id: activeUser.id, book_id: book_id })
      .then((res) => {
        if (res.status === 200) {
          handleFavoriteChange(book_id);
          setFavorite(true);
        }
      });
  }

  function handleUnfavorite () {
    api
      .patch("/favorite/remove", { user_id: activeUser.id })
      .then((res) => {
        if (res.status === 200) {
          handleFavoriteChange("NULL");
          setFavorite(false);
        }
      });
  }

  useEffect(() => {
    api
      .get(`/user_books?user_id=${activeUser.id}&book_id=${props.book.id}`)
      .then(({ status }) => {
        status === 200 ? setLiked(true) : setLiked(false);
      });
  }, [props.book.id]);

  useEffect(() => {
    activeUser.favorite_book === props.book.id
      ? setFavorite(true)
      : setFavorite(false);
  }, [activeUser.favorite_book, props.book.id]);

  return (
    <Container
      isVisible={true}
      onBackButtonPress={() => {
        props.onBackPress();
      }}
    >
      <Header>{props.children}</Header>
      <BookContainer>
        <BookCover
          source={{
            uri: props.book.volumeInfo.imageLinks.thumbnail,
          }}
        />
        <BookTitle numberOfLines={1} ellipsizeMode="tail">
          {props.book.volumeInfo.title}
        </BookTitle>
        <BookAuthor>
          {props.book.volumeInfo.authors
            ? props.book.volumeInfo.authors[0]
            : "Unknown Author"}
        </BookAuthor>
        <BookSubject>
          <Text
            style={{
              fontFamily: "GothamThin",
              textTransform: "capitalize",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.book.volumeInfo.categories
              ? props.book.volumeInfo.categories[0]
              : props.subject
              ? props.subject.name
              : "Literature"}
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
        <AddShelf
          style={{
            borderColor: "#69ca87",
          }}
          onPress={() => {
            liked === false
              ? handleLike(props.book.id)
              : handleDislike(props.book.id);
          }}
        >
          <AntDesign
            name={liked ? "heart" : "hearto"}
            color={"#69CA87"}
            size={20}
          />
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
        <AddShelf
          style={{
            borderColor: "#ffd700",
          }}
          onPress={() => {
            favorite === false
              ? handleFavorite(props.book.id)
              : handleUnfavorite(props.book.id);
          }}
        >
          <AntDesign
            name={favorite ? "star" : "staro"}
            color={"#ffd700"}
            size={20}
          />
        </AddShelf>
      </Actions>
    </Container>
  );
};

export default BookPreview;
