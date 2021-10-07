import React from 'react';

import { useCanSkipMain } from '@/hooks';
import { Button, Container, Title } from '@/lib';

export const SignUp: React.FC = () => {
  const { updateCanSkipMain } = useCanSkipMain();

  const handleSignUp = React.useCallback(async () => {
    // todo: user signup using unform and signin user after
    console.log('handleSignUp triggered');
    await updateCanSkipMain(true);
  }, []);

  return (
    <Container>
      <Title>Sign up page</Title>
      <Button onPress={() => handleSignUp()}>Cadastrar</Button>
    </Container>
  );
};
