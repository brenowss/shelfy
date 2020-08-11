import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 50px 12px 0;
`;

export const ScreenTitle = styled.Text`
  font-family: GothamBold;
  font-size: 32px;
  color: #00214d;
`;

export const Title = styled.Text`
  font-family: GothamMedium;
  color: #333;
  font-size: 20px;
  margin: 12px 0 6px 0;
  align-self: flex-start;
`;

export const UserContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 50px;
`;

export const Avatar = styled.Image`
  border-radius: 9999px;
  height: 120px;
  width: 120px;
`;

export const Username = styled.Text`
  font-family: GothamBold;
  font-size: 30px;
  margin-bottom: 12px;
`;

export const EditProfile = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #00000066;
  border-radius: 50px;
  padding: 5px 10px;
  margin-bottom: 12px;
`;

export const Statistics = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Statistic = styled.View`
  align-items: center;
  width: 33%;
  justify-content: center;
`;

export const StatisticTitle = styled.Text`
  font-family: GothamBold;
  font-size: 12px;
`;

export const StatisticNumber = styled.Text`
  font-family: GothamMedium;
  font-size: 18px;
`;

export const FavoriteBook = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  flex-direction: row;
  align-items: center;
  background-color: #eff0f3;
  padding: 10px;
  border-radius: 8px;
`;

export const FavoriteCover = styled.Image`
  height: 95%;
  width: 60px;
  resize-mode: stretch;
`;

export const FavoriteTitle = styled.Text`
  font-family: GothamBold;
  font-size: 20px;
`;

export const FavoriteAuthor = styled.Text`
  font-family: GothamThin;
  font-size: 18px;
`;

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
