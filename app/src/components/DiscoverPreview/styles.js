import styled from "styled-components/native";
import Modal from "react-native-modal";

export const Container = styled(Modal)`
  padding: 20px;
  margin: 0;
  margin-top: 20%;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  justify-content: space-between;
  min-height: 500px;
`;

export const Header = styled.View`
  justify-content: flex-start;
  margin-bottom: 5px;
`;

export const BookContainer = styled.View`
  align-items: center;
`;

export const BookTitle = styled.Text`
  font-family: GothamBold;
  font-size: 28px;
  text-align: center;
`;

export const BookAuthor = styled.Text`
  font-family: GothamMedium;
  font-size: 18px;
  margin-bottom: 6px;
`;

export const BookCover = styled.Image`
  height: 150px;
  width: 115px;
  border-radius: 1px;
  margin-bottom: 5px;
  resize-mode: stretch;
`;

export const BookSubjects = styled.ScrollView`
  flex-direction: row;
  width: 100%;
`;

export const BookSubject = styled.TouchableOpacity`
  padding: 12px 16px;
  background-color: #99999922;
  margin-right: 10px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-family: GothamBold;
  font-size: 20px;
  align-self: flex-start;
  margin: 6px 0;
`;

export const BookDescription = styled.ScrollView`
  height: 200px;
  margin-bottom: 15px;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  left: 20px;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const AddShelf = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-color: #69CA87;
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-radius: 50px;
`;

export const WebSearch = styled.TouchableOpacity`
  width: 80%;
  background-color: #69CA87;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
`;
