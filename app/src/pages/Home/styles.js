import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 50px 12px 0;
  height: 100%;
  flex: 1;
`;

export const ScreenTitle = styled.Text`
  font-family: GothamLight;
  font-size: 32px;
  color: #00214d;
`;

export const Indication = styled.Text`
  font-family: GothamLight;
  color: #666;
  margin: 10px 0 20px 0;
`;

export const ListContainer = styled.View`
  flex-direction: column;
  margin-bottom: 16px;
`;

export const RecommendationsList = styled.ScrollView`
  margin-right: -15px;
`;

export const SectionTitle = styled.Text`
  font-family: GothamMedium;
  color: #333;
  font-size: 20px;
  margin-bottom: 6px;
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

export const ProgressContainer = styled.TouchableOpacity`
  border-radius: 4px;
  width: 100%;
  margin-right: 12px;
  background-color: #fff;
  height: 150px;
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ProgressTitle = styled.Text`
  font-family: GothamBold;
  font-size: 18px;
  color: #162335;
`;

export const ProgressPercentage = styled.Text`
  font-family: GothamMedium;
  font-size: 22px;
  color: #162335;
`;

export const ProgressUpdate = styled.Text`
  font-family: GothamThin;
`;

export const ProgressBookCover = styled.Image`
  height: 120px;
  width: 92px;
  border-radius: 2px;
  resize-mode: stretch;
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
  background-color: #2fa74966;
  padding: 7px 20px;
  justify-content: space-evenly;
`;

export const SubjectTitle = styled.Text`
  font-family: GothamMedium;
  color: #162335;
  margin-left: 3px;
  opacity: 1;
`;
