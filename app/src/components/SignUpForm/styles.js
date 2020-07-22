import styled from "styled-components/native";
import Modal from "react-native-modal";

export const Container = styled(Modal)`
  padding: 20px;
  margin: 0;
  margin-top: 20%;
  background-color: #fff;
  width: 100%;
  max-height: 90%;
  height: 75%;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  justify-content: space-between;
`;

export const Header = styled.View`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  flex-direction: row;
`;

export const ModalTitle = styled.Text`
  font-family: GothamMedium;
  font-size: 22px;
  color: #162335;
  left: -20px;
`;

export const InputGroup = styled.View`
    margin: 12px 0;
`;

export const Label = styled.Text`
  font-family: GothamMedium;
  font-size: 20px;
  color: #717171;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  background-color: lightgray;
  border-radius: 8px;
  padding: 10px;
`;

export const Actions = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FormSend = styled.TouchableOpacity`
  background-color: #266ef1;
  padding: 15px 10px;
  align-items: center;
  margin: 12px 0;
  border-radius: 8px;
  elevation: 8;
  width: 100%;
`;

export const ForgotPassword = styled.TouchableOpacity``;

export const ErrorMessage = styled.Text`
  font-family: GothamMedium;
  color: #f33;
`;

export const Success = styled.Image`
  width: 80%;
  height: 40%;
  margin-top: -80px;
  resize-mode: contain;
`;

export const SuccessTitle = styled.Text`
  font-family: GothamBold;
  font-size: 50px;
  color: #162335;
  text-align: center;
`;