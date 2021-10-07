import React from 'react';

import { useAuth } from '@/hooks';
import { Container, Title, Button } from '@/lib';
import { RedTitle } from '@/styles/home.styles';

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Title>Home Page</Title>
      <RedTitle>Título Vermelho 🥚</RedTitle>
      <Title>{JSON.stringify(user)}</Title>
      <Button onPress={signOut}>Sair</Button>
    </Container>
  );
};

export default Home;
