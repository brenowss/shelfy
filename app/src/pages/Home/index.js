import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BookPreview from "../../components/BookPreview";
import Book from "../../components/Book";

import api from "../../services/api";

import {
  FontAwesome5 as Icon,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Context } from "../../services/UserContext";

import {
  Container,
  ScreenTitle,
  Indication,
  ListContainer,
  RecommendationsList,
  SectionTitle,
  ProgressContainer,
  ProgressTitle,
  ProgressPercentage,
  ProgressUpdate,
  ProgressBookCover,
  SubjectsContainer,
  Subject,
  SubjectTitle,
} from "./styles";

export default Home = () => {
  const [greeting, setGreeting] = useState("");

  const [homeRecommendations, setHomeRecommendations] = useState(null);
  const [openedBook, setOpenedBook] = useState(null);
  const [recentProgress, setRecentProgress] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [moreFromAuthor1, setmoreFromAuthor1] = useState(null);
  const [recentlySeen, setRecentlySeen] = useState([]);
  const [recentlySeenList, setRecentlySeenList] = useState(null);
  const [followedSubjects, setFollowedSubjects] = useState(null);
  const [moreFromSubjects, setMoreFromSubjects] = useState([]);
  const [subjectLoaded, setSubjectLoaded] = useState(false);

  const { activeUser } = useContext(Context);

  const navigation = useNavigation();
  const recentAuthor1 = "George R. R. Martin";
  const recentSubject1 = "Cooking";

  function getRecommendations() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?fields=items(id,volumeInfo(title,imageLinks,authors,categories,description))&maxResults=8&q=flowers+subject:romance&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setHomeRecommendations(res.items);
      });
  }

  function getRecentProgress() {
    fetch("https://openlibrary.org/works/OL1168210W.json")
      .then((res) => res.json())
      .then((res) => {
        setRecentProgress(res);
      });
  }

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

  function handleModal() {
    setModalState(!modalState);
  }

  function handleNavigateToSubject(subject) {
    navigation.navigate("Discover", { subject });
  }

  function getFollowedSubjects() {
    api
      .get(`/user_subjects/list?user_id=${activeUser.id}`)
      .then(({ data: { user_subjects } }) =>
        setFollowedSubjects(user_subjects)
      );
  }

  function getMoreFromSubjects() {
    followedSubjects &&
      followedSubjects.map(({ subject }) => {
        fetch(
          `https://www.googleapis.com/books/v1/volumes?maxResults=8&q=subject:${subject}&key=${Expo.Constants.manifest.extra.BOOKS_API_KEY}`
        )
          .then((res) => res.json())
          .then(({ items }) =>
            setMoreFromSubjects((prevState) => [...prevState, items])
          );
      });
  }

  const isDay = () => {
    let hour = new Date().getHours();
    if (hour >= 7 && hour < 12) {
      setGreeting("Good morning,");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Welcome,");
    } else if (hour >= 18 && hour < 24) {
      setGreeting("Good night,");
    } else {
      setGreeting("Hello,");
    }
  };

  const handleBook = (book) => {
    handleModal();
    setOpenedBook(book);
  };

  useEffect(() => {
    isDay();
    getRecommendations();
    getRecentProgress();
    api.get("/subjects").then((res) => {
      setSubjects(res.data.subjects);
    });
  }, []);

  useEffect(() => {
    getMoreFromSubjects();
  }, [followedSubjects]);

  if (activeUser) {
    useEffect(() => {
      getRecentlySeenList();
      getFollowedSubjects();
    }, [activeUser.id]);

    useEffect(() => {
      getRecentlySeen();
    }, [recentlySeenList]);
  }

  return (
    <>
      <Container>
        <ScreenTitle>
          {greeting}{" "}
          <Text style={{ fontFamily: "GothamBold" }}>
            {activeUser && activeUser.username}
          </Text>
        </ScreenTitle>
        <Indication>Have you done your reading today?</Indication>
        <ListContainer>
          <SectionTitle>Recommendations</SectionTitle>
          <RecommendationsList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {homeRecommendations ? (
              homeRecommendations.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onPress={() => {
                    handleBook(book);
                  }}
                />
              ))
            ) : (
              <ActivityIndicator size="large" color="#2FA749" />
            )}
          </RecommendationsList>
        </ListContainer>
        {recentlySeen && (
          <ListContainer>
            <SectionTitle>Recently Seen</SectionTitle>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {recentlySeen.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onPress={() => {
                    handleModal();
                    setOpenedBook(book);
                  }}
                />
              ))}
            </ScrollView>
          </ListContainer>
        )}
        <ListContainer>
          <SectionTitle>Popular Subjects</SectionTitle>
          <SubjectsContainer
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {subjects ? (
              subjects.map((subject) => (
                <Subject
                  key={subject.name}
                  style={{ backgroundColor: `${subject.color}66` }} //the 66 sets the alpha opacity to the HEX subject.color
                  onPress={() => {
                    handleNavigateToSubject(subject);
                  }}
                >
                  <MaterialCommunityIcons name={subject.icon} size={18} />
                  <SubjectTitle>{subject.name}</SubjectTitle>
                </Subject>
              ))
            ) : (
              <ActivityIndicator size="large" color="#2FA749" />
            )}
          </SubjectsContainer>
        </ListContainer>
        {followedSubjects &&
        moreFromSubjects &&
        moreFromSubjects.length === followedSubjects.length ? (
          <>
            {followedSubjects.map((subject, i) => (
              <ListContainer key={i}>
                <SectionTitle>
                  More from{" "}
                  <Text style={{ textTransform: "capitalize" }}>
                    {followedSubjects[i].subject}
                  </Text>
                </SectionTitle>
                <RecommendationsList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {moreFromSubjects[i].map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      onPress={() => {
                        handleModal();
                        setOpenedBook(book);
                      }}
                    />
                  ))}
                </RecommendationsList>
              </ListContainer>
            ))}
          </>
        ) : (
          <ActivityIndicator size="large" color="#2FA749" />
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
