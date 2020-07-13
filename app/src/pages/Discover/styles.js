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
  margin: 10px 0 12px 0;
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

export const CardContainer = styled.View`
  width: 100%;
`;

export const CardBanner = styled.TouchableOpacity`
  height: 190px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const BookStorePlace = styled.Text`
  font-family: GothamMedium;
  font-size: 18px;
  color: #1b2d45;
`;

export const BookCover = styled.Image`
  height: 170px;
  width: 38%;
  border-radius: 1px;
  resize-mode: stretch;
`;

export const BookTitle = styled.Text`
  font-family: GothamBold;
  color: #1b2d45;
  font-size: 22px;
  max-width: 62%;
  margin-bottom: 15px;
`;

export const BookAuthor = styled.Text`
  font-family: GothamMedium;
  color: #1b2d45;
  align-items: center;
`;

export const DiscoverSection = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const DiscoverCard = styled.TouchableOpacity`
  justify-content: center;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 12px;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-family: GothamBold;
  font-size: 18px;
  align-self: flex-start;
  margin-top: 6px;
`;

export const CardTitle = styled.Text`
  margin: 20px 0 0 15px;
  font-family: GothamBold;
  color: #fff;
  position: absolute;
  z-index: 9;
  font-size: 16px;
`;
export const CardCover = styled.Image`
  width: 75px;
  height: 65px;
  resize-mode: contain;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
