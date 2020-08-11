import React from "react";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { BookContainer, BookCover, BookAuthor, BookTitle } from "./styles";

const Book = (props) => {
  return (
    <BookContainer onPress={() => props.onPress() }>
      <BookCover
        source={
          props.book.volumeInfo.imageLinks
            ? {
                uri: props.book.volumeInfo.imageLinks.thumbnail,
              }
            : require("../../assets/no-cover.png")
        }
      />
      <BookAuthor>
        <Icon name="pencil-alt" size={10} />{" "}
        {props.book.volumeInfo.authors
          ? props.book.volumeInfo.authors[0]
          : "Unknown Author"}
      </BookAuthor>
      <BookTitle numberOfLines={2} ellipsizeMode="tail">
        {props.book.volumeInfo.title}
      </BookTitle>
    </BookContainer>
  );
};

export default Book;
