import React from 'react';
import { View, Text } from 'react-native';

import { Container, ScreenTitle } from './styles';

import BookPreview from "../../components/BookPreview";

const Profile = () => {
  return (
      <Container>
          <BookPreview />
      </Container>
  );
}

export default Profile;