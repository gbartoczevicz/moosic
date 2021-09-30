import React from 'react';

import { Container, Title, Button } from '@/lib';
import { RedTitle } from '@/styles/home.styles';
import { useAuth } from '@/hooks/auth';

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
