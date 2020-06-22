import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 15px 0;
  background-color: #eee;
  height: 100%;
`;

export const ScreenTitle = styled.Text`
  font-family: Raleway_400Regular;
  font-size: 32px;
  color: #162335;
`;

export const Indication = styled.Text`
  font-family: Raleway_600SemiBold;
  color: #666;
  margin: 10px 0 20px 0;
`;

export const Recommendations = styled.View`
  flex-direction: column;
  margin-bottom: 12px;
`;

export const RecommendationsList = styled.ScrollView`
  padding: 5px 0;
  margin-right: -15px;
`;

export const SectionTitle = styled.Text`
  font-family: Raleway_600SemiBold;
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
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
  font-family: Raleway_400Regular;
  font-size: 12px;
`;

export const BookTitle = styled.Text`
  font-family: Raleway_700Bold;
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
  font-family: Raleway_700Bold;
  font-size: 18px;
  color: #162335;
`;

export const ProgressPercentage = styled.Text`
  font-family: Raleway_600SemiBold;
  font-size: 22px;
  color: #162335;
`;

export const ProgressUpdate = styled.Text`
  font-family: Raleway_400Regular;
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
  font-family: Raleway_600SemiBold;
  color: #162335;
  margin-left: 3px;
`;
