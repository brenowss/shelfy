import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import { Context } from "../../services/UserContext";

import * as Animatable from "react-native-animatable";
import BookPreview from "../../components/BookPreview";

import api from "../../services/api";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {
  Container,
  ScreenTitle,
  Indication,
  SearchBar,
  SearchInput,
  SubjectsContainer,
  Subject,
  SubjectTitle,
  ShelfContainer,
  BookContainer,
  BookCover,
  BookTitle,
  BookAuthor,
} from "./styles";

const Shelf = () => {
  const [subjects, setSubjects] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [favoriteBookList, setFavoriteBookList] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [openedBook, setOpenedBook] = useState(null);

  const { activeUser } = useContext(Context);

  useEffect(() => {
    api.get("/subjects").then((res) => {
      setSubjects(res.data.subjects);
    });
    setActiveSubject("All");

    return () => {
      setFavoriteBookList(null);
      setFavoriteBooks([]);
    };
  }, []);

  useEffect(() => {
    getFavoriteBookList();
  }, [activeUser.id]);

  useEffect(() => {
    getFavoriteBooks();
  }, [favoriteBookList]);

  function getFavoriteBookList() {
    api
      .get(`/user_books/list?user_id=${activeUser.id}`)
      .then(({ data: { user_books } }) => {
        setFavoriteBookList(user_books);
      });
  }

  function getFavoriteBooks() {
    favoriteBookList &&
      favoriteBookList.map((book) => {
        fetch(
          `https://www.googleapis.com/books/v1/volumes/${book.book_id}?key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            if (favoriteBooks.some((book) => book.id === res.id)) {
              return;
            } else {
              setFavoriteBooks((prevState) => [...prevState, res]);
            }
          })
          .catch((err) => console.log(err));
      });
  }

  function handleModal() {
    setModalState(!modalState);
  }

  return (
    <>
      <Container>
        <ScreenTitle>Shelf</ScreenTitle>
        <Indication>See your favorite books</Indication>
        <SearchBar>
          <Icon name="search" size={16} />
          <SearchInput
            returnKeyType="search"
            placeholder="Search"
            placeholderTextColor="#555"
          />
        </SearchBar>
        <SubjectsContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Subject
            key={"All"}
            style={{
              backgroundColor:
                activeSubject === "All" ? "#6246eaE6" : "#bac2c666",
            }} //the 66 sets the alpha opacity to the HEX subject.color
            onPress={() => {
              setActiveSubject("All");
            }}
          >
            <SubjectTitle>All</SubjectTitle>
          </Subject>
          {subjects ? (
            subjects.map((subject) => (
              <Subject
                key={subject.name}
                style={{
                  backgroundColor:
                    activeSubject === subject.name
                      ? `${subject.color}E6`
                      : "#bac2c666",
                }} //the 66 sets the alpha opacity to the HEX subject.color
                onPress={() => {
                  setActiveSubject(subject.name);
                }}
              >
                <SubjectTitle>{subject.name}</SubjectTitle>
              </Subject>
            ))
          ) : (
            <ActivityIndicator size="large" color="#2FA749" />
          )}
        </SubjectsContainer>
        <ShelfContainer autoscrollToTopThreshold>
          <Animatable.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              width: "100%",
            }}
            animation="fadeIn"
            duration={600}
          >
            {favoriteBooks && activeSubject === "All"
              ? favoriteBooks.map((book) => (
                  <BookContainer
                    key={book.id}
                    onPress={() => {
                      handleModal();
                      setOpenedBook(book);
                    }}
                  >
                    <BookCover
                      source={{
                        uri: book.volumeInfo.imageLinks.thumbnail,
                      }}
                    />
                    <BookAuthor>
                      <Icon name="pencil-alt" size={10} />{" "}
                      {book.volumeInfo.authors[0]}
                    </BookAuthor>
                    <BookTitle>{book.volumeInfo.title}</BookTitle>
                  </BookContainer>
                ))
              : favoriteBooks
                  .filter((book) => book.volumeInfo.categories !== undefined)
                  .filter((book) =>
                    book.volumeInfo.categories[0]
                      .split(" / ")
                      .includes(activeSubject)
                  )
                  .map((book) => (
                    <BookContainer
                      key={book.id}
                      onPress={() => {
                        handleModal();
                        setOpenedBook(book);
                      }}
                    >
                      <BookCover
                        source={{
                          uri: book.volumeInfo.imageLinks.thumbnail,
                        }}
                      />
                      <BookAuthor>
                        <Icon name="pencil-alt" size={10} />{" "}
                        {book.volumeInfo.authors[0]}
                      </BookAuthor>
                      <BookTitle>{book.volumeInfo.title}</BookTitle>
                    </BookContainer>
                  ))}
          </Animatable.View>
        </ShelfContainer>
        <View style={{ height: 45, width: "100%" }} />
      </Container>
      {modalState && (
        <BookPreview onBackPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>
      )}
    </>
  );
};

export default Shelf;
