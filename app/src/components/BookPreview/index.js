import React from "react";
import { Text, Dimensions } from "react-native";

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
  return (
    <Container isVisible={true}>
      <Header>
        {props.children}
      </Header>
      <BookContainer onBackdropPress={props.handleModal}>
        <BookCover
          source={{
            uri: "http://covers.openlibrary.org/b/id/8295315-L.jpg",
          }}
        />
        <BookTitle>Gone Girl</BookTitle>
        <BookAuthor>Gillian Flynn</BookAuthor>
        <BookSubjects>
          <BookSubject>
            <Text style={{ fontFamily: "Raleway_400Regular" }}>Suspense</Text>
          </BookSubject>
          <BookSubject>
            <Text style={{ fontFamily: "Raleway_400Regular" }}>Mystery</Text>
          </BookSubject>
          <BookSubject>
            <Text style={{ fontFamily: "Raleway_400Regular" }}>Horror</Text>
          </BookSubject>
        </BookSubjects>
        <Title>Description:</Title>
        <BookDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eum
          voluptate quaerat, hic nostrum nobis doloremque corporis, iusto
          molestias animi libero quisquam. Officiis, blanditiis aspernatur!
          Ducimus quam id error assumenda nobis nesciunt minima tenetur corrupti
          eius sed? Error voluptas itaque eligendi ab nihil assumenda harum quis
          inventore odio iure perferendis nulla praesentium animi eveniet magni,
          dignissimos impedit eos esse ullam eaque, et nemo unde aliquam!
          Deserunt quam nesciunt, voluptas natus provident, cumque fugit modi
          incidunt nulla assumenda nihil blanditiis dolorem!
        </BookDescription>
      </BookContainer>
      <Actions>
        <AddShelf>
          <Icon name="plus" color={"#69CA87"} size={16} />
        </AddShelf>
        <WebSearch>
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
