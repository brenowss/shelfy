import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { Context } from "../../services/UserContext";
import api from "../../services/api";

import * as Animatable from "react-native-animatable";

import BookPreview from "../../components/BookPreview";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {
  Container,
  ScreenTitle,
  Title,
  UserContainer,
  Avatar,
  Username,
  EditProfile,
  Statistics,
  Statistic,
  StatisticTitle,
  StatisticNumber,
  FavoriteBook,
  FavoriteCover,
  FavoriteTitle,
  FavoriteAuthor,
  BookContainer,
  BookCover,
  BookAuthor,
  BookTitle,
} from "./styles";

const Profile = () => {
  const [favorite, setFavorite] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [openedBook, setOpenedBook] = useState(null);
  const [bookCount, setBookCount] = useState(null);
  const [subjectCount, setSubjectCount] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [recentlySeen, setRecentlySeen] = useState([]);
  const [recentlySeenList, setRecentlySeenList] = useState(null);

  const { handleLogout, activeUser } = useContext(Context);

  function getFavorite() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${activeUser.favorite_book}?key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}&fields=id,volumeInfo(title,imageLinks,authors,categories,description)`
    )
      .then((res) => res.json())
      .then((res) => {
        setFavorite(res);
      });
  }

  function handleModal() {
    setModalState(!modalState);
  }

  function getBookCount() {
    api
      .get(`/user_books/count?user_id=${activeUser.id}`)
      .then(({ data }) => setBookCount(data));
  }

  function getSubjectCount() {
    api
      .get(`/user_subjects/count?user_id=${activeUser.id}`)
      .then(({ data }) => setSubjectCount(data));
  }

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    getFavorite();
    getBookCount();
    getSubjectCount();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  function getRecentlySeenList() {
    api
      .get(`/recently_seen/?user_id=${activeUser.id}`)
      .then(({ data: { recently_seen } }) =>
        setRecentlySeenList(recently_seen)
      );
  }

  function getRecentlySeen() {
    recentlySeenList &&
      recentlySeenList.map((book) => {
        fetch(
          `https://www.googleapis.com/books/v1/volumes/${book.book_id}?key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}&fields=id,volumeInfo(title,imageLinks,authors,categories,description)`
        )
          .then((res) => res.json())
          .then((res) => {
            if (recentlySeen.some((book) => book.id === res.id)) {
              return;
            } else {
              setRecentlySeen((prevState) => [...prevState, res]);
            }
          })
          .catch((err) => console.log(err));
      });
  }

  useEffect(() => {
    getFavorite();
  }, [activeUser.favorite_book]);

  useEffect(() => {
    getBookCount();
    getSubjectCount();
    getRecentlySeenList();
  }, [activeUser.id]);

  useEffect(() => {
    getRecentlySeen();
  }, [recentlySeenList]);

  return (
    <Animatable.View animation="fadeIn" duration={400}>
      <Container
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#64B5F6"
          />
        }
      >
        <ScreenTitle>Profile</ScreenTitle>
        <UserContainer>
          <Avatar
            source={{
              uri: "https://api.adorable.io/avatars/285/abott@adorable.png",
            }}
          />
          <Username>{activeUser.username}</Username>
          <EditProfile>
            <Text style={{ fontFamily: "GothamMedium", fontSize: 12 }}>
              EDIT PROFILE
            </Text>
          </EditProfile>
          {bookCount && subjectCount && (
            <Statistics>
              <Statistic>
                <StatisticNumber>{bookCount}</StatisticNumber>
                <StatisticTitle>BOOKS</StatisticTitle>
              </Statistic>
              <Statistic>
                <StatisticNumber>{subjectCount}</StatisticNumber>
                <StatisticTitle>SUBJECTS</StatisticTitle>
              </Statistic>
              <Statistic>
                <StatisticNumber>5</StatisticNumber>
                <StatisticTitle>CHALLENGES</StatisticTitle>
              </Statistic>
            </Statistics>
          )}
        </UserContainer>
        {favorite && "volumeInfo" in favorite ? (
          <>
            <Title>Favorite book</Title>
            <FavoriteBook
              onPress={() => {
                setOpenedBook(favorite);
                handleModal();
              }}
            >
              <FavoriteCover
                source={
                  favorite.volumeInfo.imageLinks
                    ? {
                        uri: favorite.volumeInfo.imageLinks.thumbnail,
                      }
                    : require("../../assets/no-cover.png")
                }
              />
              <View style={{ paddingLeft: 12 }}>
                <FavoriteTitle numberOfLines={1} ellipsizeMode="tail">
                  {favorite.volumeInfo.title}
                </FavoriteTitle>
                <FavoriteAuthor numberOfLines={1} ellipsizeMode="tail">
                  {favorite.volumeInfo.authors
                    ? favorite.volumeInfo.authors[0]
                    : "Unknown Author"}
                </FavoriteAuthor>
              </View>
            </FavoriteBook>
          </>
        ) : (
          <Text>CARALHO</Text>
          // fazer botaozinho pra levar ao Discover
        )}
        {recentlySeen && (
          <>
            <Title>Recently seen</Title>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {recentlySeen.map((book) => (
                <BookContainer
                  key={book.id}
                  onPress={() => {
                    handleModal();
                    setOpenedBook(book);
                  }}
                >
                  <BookCover
                    source={
                      book.volumeInfo.imageLinks.thumbnail
                        ? {
                            uri: book.volumeInfo.imageLinks.thumbnail,
                          }
                        : require("../../assets/no-cover.png")
                    }
                  />
                  <BookAuthor>
                    <Icon name="pencil-alt" size={10} />{" "}
                    {book.volumeInfo.authors[0]}
                  </BookAuthor>
                  <BookTitle numberOfLines={2} ellipsizeMode="tail">
                    {book.volumeInfo.title}
                  </BookTitle>
                </BookContainer>
              ))}
            </ScrollView>
          </>
        )}
        <View style={{ height: 60, width: "100%" }} />
      </Container>
      {modalState && (
        <BookPreview onBackPress={setModalState} book={openedBook}>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="angle-left" size={26} />
          </TouchableOpacity>
        </BookPreview>
      )}
    </Animatable.View>
  );
};

export default Profile;
