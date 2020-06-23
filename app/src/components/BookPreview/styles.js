import styled from "styled-components/native";
import Modal from "react-native-modal";

export const Container = styled(Modal)`
  padding: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
`;

export const Header = styled.View`
  justify-content: flex-start;
  margin-bottom: 5px;
`;

export const BookContainer = styled.View`
  align-items: center;
`;

export const BookTitle = styled.Text`
  font-family: Raleway_700Bold;
  font-size: 28px;
`;

export const BookAuthor = styled.Text`
  font-family: Raleway_700Bold;
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

export const BookSubjects = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const BookSubject = styled.TouchableOpacity`
  padding: 12px 16px;
  background-color: #99999922;
  margin-right: 10px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-family: Raleway_700Bold;
  font-size: 20px;
  align-self: flex-start;
  margin-top: 6px;
`;

export const BookDescription = styled.Text`
  font-family: Raleway_500Medium;
  margin: 12px 0;
  color: #666;
  text-align: justify;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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
