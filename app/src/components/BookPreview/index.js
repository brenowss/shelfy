import React, { useState, useEffect, useContext, useRef } from "react";
import { Text, View, ScrollView } from "react-native";
import { Context } from "../../services/UserContext";
import { LinearGradient } from "expo-linear-gradient";

import api from "../../services/api";

import Book from "../../components/Book";

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
  BookDescription,
  ReadMore,
  Title,
  RecommendationsContainer,
  RecommendedBookContainer,
  RecommendedBookCover,
  RecommendedBookAuthor,
  RecommendedBookTitle,
  Actions,
  AddShelf,
  WebSearch,
} from "./styles";

const BookPreview = (props) => {
  const [activeBook, setActiveBook] = useState(props.book);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [sameAuthor, setSameAuthor] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [expandedDesc, setExpandedDesc] = useState(false);

  const { activeUser, handleFavoriteChange } = useContext(Context);

  const scrollRef = useRef();

  function getSimilarBooks() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo(title,imageLinks,authors,categories,description))&maxResults=4&q=subject:${activeBook.volumeInfo.categories[0]}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setSimilarBooks(res.items));
  }

  function getFromAuthor() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo(title,imageLinks,authors,categories,description))&maxResults=4&q=inauthor:${activeBook.volumeInfo.authors[0]}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setSameAuthor(res.items));
  }

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
      .delete(`/user_books?user_id=${activeUser.id}&book_id=${book_id}`)
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

  function handleUnfavorite() {
    api.patch("/favorite/remove", { user_id: activeUser.id }).then((res) => {
      if (res.status === 200) {
        handleFavoriteChange("NULL");
        setFavorite(false);
      }
    });
  }

  function handleDescriptionCollapse() {
    setExpandedDesc(!expandedDesc);
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    setActiveBook(props.book);
  }, [props.book]);

  useEffect(() => {
    api
      .get(`/user_books?user_id=${activeUser.id}&book_id=${activeBook.id}`)
      .then(({ status }) => {
        status === 200 ? setLiked(true) : setLiked(false);
      });

    api.post(`/recently_seen`, {
      book_id: activeBook.id,
      user_id: activeUser.id,
    });

    getSimilarBooks();
    getFromAuthor();

    scrollToTop();
  }, [activeBook]);

  useEffect(() => {
    activeUser.favorite_book === activeBook.id
      ? setFavorite(true)
      : setFavorite(false);
  }, [activeUser.favorite_book, activeBook.id]);

  return (
    <Container
      isVisible={true}
      onBackButtonPress={() => {
        props.onBackPress();
      }}
    >
      <ScrollView ref={scrollRef} style={{ padding: 20, paddingTop: 0 }} showsVerticalScrollIndicator={false}>
        <Header>{props.children}</Header>
        <BookContainer contentContainerStyle={{ alignItems: "center" }}>
          <BookCover
            source={
              activeBook.volumeInfo.imageLinks
                ? {
                    uri: activeBook.volumeInfo.imageLinks.thumbnail,
                  }
                : require("../../assets/no-cover.png")
            }
          />
          <BookTitle numberOfLines={1} ellipsizeMode="tail">
            {activeBook.volumeInfo.title}
          </BookTitle>
          <BookAuthor>
            {activeBook.volumeInfo.authors
              ? activeBook.volumeInfo.authors[0]
              : "Unknown Author"}
          </BookAuthor>
          <BookSubject>
            {activeBook.volumeInfo.categories && (
              <Text
                style={{
                  fontFamily: "GothamThin",
                  textTransform: "capitalize",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {activeBook.volumeInfo.categories[0]}
              </Text>
            )}
          </BookSubject>
          <Title>Description:</Title>
          <BookDescription>
            <Text
              style={{
                fontFamily: "GothamLight",
                color: "#666",
                textAlign: "justify",
                maxHeight: !expandedDesc ? 120 : undefined,
              }}
            >
              {activeBook.volumeInfo.description
                ? activeBook.volumeInfo.description
                    .replace("<br>", "\n")
                    .replace(/(<([^>]+)>)/gi, "")
                : "We couldn't find any description for this book. Try again later."}
            </Text>
          </BookDescription>
          {activeBook.volumeInfo.description &&
            activeBook.volumeInfo.description.length >= 500 && (
              <ReadMore activeOpacity={0.7} onPress={handleDescriptionCollapse} style={{ top: !expandedDesc ? -15 : 0 }}>
                <LinearGradient
                  colors={["#ffffff22", "#c1bfc077"]} // the 99 sets the alpha opacity to the HEX props.subject.color
                  style={{
                    width: "100%",
                    height: 36,
                    justifyContent: "center",
                    position: "relative",
                    top: -15
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GothamMedium",
                      marginVertical: 12,
                      color: "#222",
                      textAlign: "center",
                      maxHeight: 120,
                    }}
                  >
                    Read {!expandedDesc ? "more" : "less"}{" "}
                    <Icon name={!expandedDesc ? "angle-down" : "angle-up"} />
                  </Text>
                </LinearGradient>
              </ReadMore>
            )}
        </BookContainer>
        <>
          {similarBooks && (
            <>
              <Title>Similar books</Title>
              <RecommendationsContainer>
                {similarBooks.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    onPress={() => {
                      setActiveBook(book);
                    }}
                  />
                ))}
              </RecommendationsContainer>
            </>
          )}
          {sameAuthor && (
            <>
              <Title>From {props.book.volumeInfo.authors[0]}</Title>
              <RecommendationsContainer>
                {sameAuthor.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    onPress={() => {
                      setActiveBook(book);
                    }}
                  />
                ))}
              </RecommendationsContainer>
            </>
          )}
        </>
      </ScrollView>
      <View style={{ height: 10 }} />
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
