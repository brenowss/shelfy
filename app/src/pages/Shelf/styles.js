import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 50px 12px 0;
`;

export const ScreenTitle = styled.Text`
  font-family: GothamBold;
  font-size: 32px;
  color: #00214d;
`;

export const Indication = styled.Text`
  font-family: GothamLight;
  color: #666;
  margin: 10px 0 20px 0;
`;

export const SearchBar = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 6px 15px;
  background-color: #eee;
  border-radius: 22px;
  margin-bottom: 12px;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  margin-left: 10px;
  font-family: GothamMedium;
  text-decoration: none;
`;

export const SubjectsContainer = styled.ScrollView`
  flex-direction: row;
  margin-right: -15px;
`;
export const Subject = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 50px;
  align-items: center;
  height: 40px;
  margin-right: 4px;
  padding: 7px 20px;
  justify-content: space-evenly;
`;

export const SubjectTitle = styled.Text`
  font-family: GothamMedium;
  color: #162335;
  margin-left: 3px;
  opacity: 1;
`;

export const ShelfContainer = styled.View`
  margin-top: 12px;
`;

export const BookContainer = styled.TouchableOpacity`
  width: 150px;
  margin-right: 7px;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 12px;
  align-items: center;
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
  text-align: center;
`;

export const NotFound = styled.Image`
  width: 80%;
  height: 40%;
  resize-mode: contain;
  position: absolute;
  align-self: center;
`;

export const NotFoundTitle = styled.Text`
  font-family: GothamBold;
  font-size: 50px;
  color: #162335;
  text-align: center;
  margin-top: 250px;
`;

export const NotFoundText = styled.Text`
  font-family: GothamMedium;
  font-size: 20px;
  color: #162335;
  text-align: center;
`;
