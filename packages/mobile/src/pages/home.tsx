import React from 'react';

import { Container, Title } from '@/lib/container';
import { RedTitle } from '@/styles/home.styles';

const Home: React.FC = () => (
  <Container>
    <Title>Home Page</Title>
    <RedTitle>Título Vermelho 🥚</RedTitle>
  </Container>
);

export default Home;
