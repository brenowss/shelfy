import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Context } from "../../services/UserContext";

import * as Animatable from "react-native-animatable";
import BookPreview from "../../components/BookPreview";

import api from "../../services/api";

import {
  FontAwesome5 as Icon,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
  NotFound,
  NotFoundTitle,
  NotFoundText,
} from "./styles";

const Shelf = () => {
  const [subjects, setSubjects] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);
  const [favoriteBookList, setFavoriteBookList] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [openedBook, setOpenedBook] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [noMatch, setNoMatch] = useState(false);
  const [noMatchSubject, setNoMatchSubject] = useState(false);

  const { activeUser } = useContext(Context);

  const { control } = useForm();

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setFavoriteBookList(null);
    setFavoriteBooks([]);

    getFavoriteBookList();

    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  useEffect(() => {
    if (search.length > 0) {
      setActiveSubject("All");
    }

    let count = favoriteBooks.filter((book) => {
      let title = book.volumeInfo.title.toLowerCase();
      let searchTerm = search.toLowerCase();
      return title.match(searchTerm);
    });

    count.length === 0 ? setNoMatch(true) : setNoMatch(false);
  }, [search]);

  useEffect(() => {
    if (activeSubject !== "All") {
      let count = favoriteBooks
        .filter((book) => book.volumeInfo.categories !== undefined)
        .filter((book) =>
          book.volumeInfo.categories[0].split(" / ").includes(activeSubject)
        );

      count.length === 0 ? setNoMatchSubject(true) : setNoMatchSubject(false);
    } else {
      setNoMatchSubject(false);
    }
  }, [activeSubject]);

  function getFavoriteBookList() {
    api
      .get(`/user_books/list?user_id=${activeUser.id}`)
      .then(({ data: { user_books } }) => setFavoriteBookList(user_books));
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
      <Container
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#64B5F6"
          />
        }
      >
        <ScreenTitle>Shelf</ScreenTitle>
        <Indication>See your favorite books</Indication>
        <SearchBar>
          <Icon name="search" size={16} />
          <Controller
            control={control}
            render={() => (
              <SearchInput
                returnKeyType="search"
                placeholder="Search"
                placeholderTextColor="#555"
                onChangeText={(value) => setSearch(value)}
                value={search}
              />
            )}
            name="filter"
          />
          {search.length > 0 && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                height: 30,
                width: 40,
                alignItems: "center",
              }}
              onPress={() => setSearch("")}
            >
              <MaterialCommunityIcons name="close" size={20} color="#162335" />
            </TouchableOpacity>
          )}
        </SearchBar>
        {search.length <= 0 ? (
          <>
            <SubjectsContainer
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Subject
                key={"All"}
                style={{
                  backgroundColor:
                    activeSubject === "All" ? "#6246eaE6" : "#bac2c666",
                }} //the E6 sets the alpha opacity to the HEX subject.color
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
                    }} //the E6 sets the alpha opacity to the HEX subject.color
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
                      .filter(
                        (book) => book.volumeInfo.categories !== undefined
                      )
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
            {noMatchSubject && (
              <Animatable.View
                style={{ marginTop: 50 }}
                animation="fadeIn"
                duration={400}
              >
                <NotFound
                  source={require("../../assets/not-found-subject.png")}
                  style={{
                    height: "45%",
                  }}
                />
                <NotFoundTitle>Nothing to see here</NotFoundTitle>
                <NotFoundText>
                  Try exploring new books on Discover!
                </NotFoundText>
              </Animatable.View>
            )}
          </>
        ) : (
          <>
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
                {favoriteBooks &&
                  favoriteBooks
                    .filter((book) => {
                      let title = book.volumeInfo.title.toLowerCase();
                      let searchTerm = search.toLowerCase();
                      return title.match(searchTerm);
                    })
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
            {noMatch && (
              <Animatable.View
                style={{ height: "100%" }}
                animation="fadeIn"
                duration={400}
              >
                <NotFound source={require("../../assets/not-found.png")} />
                <NotFoundTitle>No results</NotFoundTitle>
                <NotFoundText>Try searching for a different word!</NotFoundText>
              </Animatable.View>
            )}
          </>
        )}
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
