import React, { useRef, useCallback } from 'react';
import { Alert, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { View } from 'react-native';

import { useAuth, useCanSkipMain } from '@/hooks';
import { Title, Button, Container, Input } from '@/lib';

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
    <>
  <View style={{ backgroundColor: "#7CA1B4", flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' , flexWrap: 'wrap' }}>
          <View style={{ backgroundColor: 'green', width: '50%' }} >
            <Title>Bem</Title>
            <Title>Vindo</Title>
          </View>

          <View style={{ width: '50%', alignItems: "center", justifyContent: "center" }} >
            <Image source={require('../../assets/logoSignin.png')} />
          </View>

          <View style={{ backgroundColor: 'yellow', width: '100%' }} >
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
          </View>
        </View>
  </View>
        
    </>
  );
};
