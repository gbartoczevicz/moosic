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
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' , flexWrap: 'wrap', alignItems: "center", justifyContent: "center"  }}>
          <View style={{ width: '50%' }} >
            <Title style={{ fontSize: 45 }}>Bem</Title>
            <Title style={{ fontSize: 45 }}>Vindo</Title>
          </View>

          <View style={{ width: '50%', alignItems: "center", justifyContent: "center" }} >
            <Image source={require('../../assets/logoSignin.png')} />
          </View>

          <View style={{ width: '80%', height: 300 }} >
            <Form onSubmit={handleSignIn} ref={formRef} style={{ height: 300 }} >
              <Input
                name="email"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                style={{ width: '100%', height: 45, borderRadius: 15, borderWidth: 1, padding: 10, marginTop: 40 }}
              />
              <Input
                name="password"
                ref={passwordInputRef}
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                style={{ width: '100%', height: 45, marginTop: 40, borderColor: 'black', borderRadius: 15, borderWidth: 1, padding: 10 }}
              />
              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>
          </View>
        </View>
  </View>
        
    </>
  );
};
