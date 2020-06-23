import styled from "styled-components/native";

export const Container = styled.View`
  padding: 50px 12px 0;
`;

export const ScreenTitle = styled.Text`
  font-family: Raleway_700Bold;
  font-size: 32px;
  color: #162335;
`;

export const Indication = styled.Text`
  font-family: Raleway_600SemiBold;
  color: #666;
  margin: 10px 0 20px 0;
`;

export const CarouselContainer = styled.View`
  width: 100%;
`;

export const CardContainer = styled.View`
  width: 100%;
`;

export const CardBanner = styled.TouchableOpacity`
  height: 190px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px 15px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const BookSubject = styled.Text`
  font-family: Raleway_700Bold;
  color: #fff;
  font-size: 30px;
  max-width: 50%;
  text-align: center;
  text-transform: capitalize;
`;

export const BookCover = styled.Image`
  height: 170px;
  width: 130px;
  border-radius: 1px;
  resize-mode: stretch;
`;

export const CardInfo = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const BookTitle = styled.Text`
  font-family: Raleway_700Bold;
  color: #162335;
  font-size: 22px;
  max-width: 250px;
`;

export const BookAuthor = styled.Text`
  font-family: Raleway_600SemiBold;
  color: #777;
  align-items: center;
`;

export const ViewButton = styled.TouchableOpacity`
  background-color: #2979FF; 
  padding: 10px 30px;
  border-radius: 8px;
`;

export const ViewButtonText = styled.Text`
  font-family: Raleway_600SemiBold;
  color: #fff;
  font-size: 18px;
`;
