import React, { useRef, useCallback } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { Title, Button, Container, Input } from '@/lib';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback((data) => {
    console.log({ data });
  }, []);

  return (
    <Container>
      <Title>Bem-vindo</Title>

      <Form onSubmit={handleSignIn} ref={formRef}>
        <Input
          name="email"
          placeholder="E-email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Input
          name="password"
          ref={passwordInputRef}
          placeholder="Senha"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
        <Button onPress={() => navigation.navigate('App')}>Entrar</Button>
      </Form>
    </Container>
  );
};
