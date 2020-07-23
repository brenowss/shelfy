import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

import { Context } from "../../services/UserContext";

import { Container, ScreenTitle } from './styles';

const Profile = () => {
  const { handleLogout, activeUser } = useContext(Context);

  return (
      <Container>
          <ScreenTitle>Profile</ScreenTitle>
          <Button title="logout" onPress={handleLogout} />
          <Text>{activeUser.id}</Text>
      </Container>
  );
}

export default Profile;