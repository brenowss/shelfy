import styled from "styled-components/native";

export const Container = styled.View`
  padding: 50px 0 0 12px;
  background-color: #fff;
  height: 100%;
`;

export const ScreenTitle = styled.Text`
  font-family: Raleway_700Bold;
  font-size: 32px;
  margin-bottom: 25px;
`;

export const Recommendations = styled.View`
  flex-direction: column;
`;

export const RecommendationsList = styled.ScrollView`
padding: 5px 0;
`;

export const SectionTitle = styled.Text`
  font-family: Raleway_600SemiBold;
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const BookContainer = styled.View`
  width: 150px;
  margin-right: 7px;
`;
export const BookCover = styled.Image`
  height: 170px;
  width: 130px;
  border-radius: 2px;
`;

export const BookAuthor = styled.Text`
  color: #666;
  margin: 3px 0;
  font-family: Raleway_400Regular;
  font-size: 12px;
`;

export const BookTitle = styled.Text`
  font-family: Raleway_700Bold;
  font-size: 16px;
`;
