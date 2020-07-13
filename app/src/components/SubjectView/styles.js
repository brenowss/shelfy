import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 50px 12px 0;
  height: 100%;
`;

export const Header = styled.View`
  justify-content: flex-start;
  margin-bottom: 5px;
`;

export const SubjectTitle = styled.Text`
  font-family: GothamBold;
  font-size: 32px;
  text-align: center;
  margin-top: 10px;
`;

export const FollowButton = styled.TouchableOpacity`
  border-radius: 25px;
  padding: 12px 18px;
  flex-direction: row;
  align-self: center;
  margin-top: 35px;
  align-items: center;
  border-width: 1px;
`;

export const Book = styled.TouchableOpacity`
  width: 150px;
  margin-right: 7px;
`;
export const BookCover = styled.Image`
  height: 170px;
  width: 130px;
  border-radius: 2px;
  resize-mode: stretch;
`;

export const BookAuthor = styled.Text`
  color: #666;
  margin: 5px 0;
  font-family: GothamLight;
  font-size: 12px;
`;

export const BookTitle = styled.Text`
  font-family: GothamBold;
  font-size: 16px;
`;

export const BooksContainer = styled.ScrollView`
  padding-bottom: 50px;
`;

export const SelectionContainer = styled.View`
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-family: GothamMedium;
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const HorizontalScroll = styled.ScrollView``;
