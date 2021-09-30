import React, { useRef, useCallback } from 'react';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { Title, Button, Container, Input } from '@/lib';
import { accountsClient } from '@/services/http-client';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data) => {
      try {
        console.log('Payload', data);

        const result = await accountsClient.post('/sessions', data);

        console.log('Sessions', result);
      } catch (err) {
        return Alert.alert('Erro de autenticação', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      }

      return navigation.navigate('App');
    },
    [navigation]
  );

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
        <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
      </Form>
    </Container>
  );
};
