import styled from "styled-components/native";

export const BookContainer = styled.TouchableOpacity`
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
