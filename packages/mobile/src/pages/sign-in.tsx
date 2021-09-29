import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Title, Button, Container } from '@/lib';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Bem-vindo</Title>
      <Button onPress={() => navigation.navigate('App')}>Entrar</Button>
    </Container>
  );
};
