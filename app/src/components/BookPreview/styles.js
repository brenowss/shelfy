import styled from "styled-components/native";
import Modal from "react-native-modal";

export const Container = styled(Modal)`
  margin: 0;
  margin-top: 20%;
  padding-top: 20px;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  justify-content: flex-start;
  min-height: 500px;
`;

export const Header = styled.View`
  justify-content: flex-start;
  margin-bottom: 50px;
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

export const BookSubject = styled.TouchableOpacity`
  padding: 12px 16px;
  background-color: #99999922;
  margin-right: 10px;
  border-radius: 8px;
  max-width: 75%;
`;

export const BookDescription = styled.ScrollView`
`;

export const ReadMore = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: GothamBold;
  font-size: 20px;
  align-self: flex-start;
  margin: 6px 0;
`;

export const RecommendationsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 12px;
  align-items: center;
  margin-bottom: 12px;
`;

export const RecommendedBookContainer = styled.TouchableOpacity`
  width: 120px;
  margin-right: 7px;
  margin-bottom: 10px;
  border-radius: 12px;
  align-items: center;
  height: 230px;
`;

export const RecommendedBookCover = styled.Image`
  height: 170px;
  width: 130px;
  border-radius: 2px;
  resize-mode: stretch;
`;

export const RecommendedBookAuthor = styled.Text`
  color: #666;
  margin: 5px 0;
  font-family: GothamLight;
  font-size: 12px;
`;

export const RecommendedBookTitle = styled.Text`
  font-family: GothamBold;
  font-size: 16px;
  text-align: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  bottom: 6px;
  padding: 0 20px;
`;

export const AddShelf = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-width: 2px;
  border-radius: 50px;
`;

export const WebSearch = styled.TouchableOpacity`
  width: 60%;
  background-color: #69ca87;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
`;
