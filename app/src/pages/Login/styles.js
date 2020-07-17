import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 25px;
`;

export const BannerContainer = styled.View`
  height: 320px;
`;

export const Logo = styled.Image`
  position: absolute;
  top: 120px;
  left: 25px;
  height: 150px;
  width: 200px;
`;

export const Texts = styled.View`
  margin-top: -20px;
`;
export const Heading = styled.Text`
  font-family: GothamMedium;
  font-size: 24px;
  color: #162335;
`;

export const AppName = styled.Text`
  font-family: GothamBold;
  font-size: 72px;
  color: #162335;
`;

export const Lema = styled.Text`
  font-family: GothamMedium;
  font-size: 16px;
  color: #717171;
`;

export const Actions = styled.View``;

export const ActionButton = styled.TouchableOpacity`
  padding: 15px 10px;
  flex-direction: row;
  justify-content: center;
  margin-top: 12px;
  border-radius: 8px;
  elevation: 8;
`;
