import React, { useRef, useCallback } from 'react';
import { Alert, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';

import { useAuth, useCanSkipMain } from '@/hooks';
import { Button, Container, Input } from '@/lib';

import * as Styles from "@/styles/sign-in.styles";

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { updateCanSkipMain } = useCanSkipMain();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data) => {
      try {
        await signIn(data);
        await updateCanSkipMain(true);
      } catch (err) {
        Alert.alert('Erro de autenticação', JSON.stringify(err, Object.getOwnPropertyNames(err)));
        return;
      }

      navigation.navigate('App');
    },
    [navigation]
  );

  return (
    <Container>
      <Styles.HeaderContainer>
        <Styles.WelcomeTitle>
          Bem
          {"\n"}
          Vindo
        </Styles.WelcomeTitle>
        <Image source={require('../../assets/logoSignin.png')} />
      </Styles.HeaderContainer>

      <Styles.Form onSubmit={handleSignIn} ref={formRef}>
        <Styles.Input
          name="email"
          placeholder="E-mail"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Styles.Input
          name="password"
          ref={passwordInputRef}
          placeholder="Senha"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
        <Button variant="dark" onPress={() => formRef.current?.submitForm()}>Entrar</Button>
      </Styles.Form>
    </Container>
  );
};
