import React, { useCallback, useRef } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FormHandles } from "@unform/core";

import { useCanSkipMain } from "@/hooks";
import { alertError } from "@/utils";
import { accountsClient } from "@/services/http-client";
import * as Lib from "@/lib";
import * as Styles from "@/styles/sign-up.styles";

export const SignUp: React.FC = () => {
  const { updateCanSkipMain } = useCanSkipMain();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data) => {
    try {
      await accountsClient.post("/users", data);
      await updateCanSkipMain(true);
      navigation.navigate("SignIn");
    } catch (err) {
      return alertError("Erro no cadastro", err);
    }
  }, [alertError]);

  return (
    <Lib.Container>
      <Styles.HeaderContainer>
        <Styles.Title>Sign up page</Styles.Title>
        <Styles.Subtitle>
          Crie sua conta para obter acesso ilimitado a todas as funcionalidades
          do nosso aplicativo!
        </Styles.Subtitle>
      </Styles.HeaderContainer>

      <Styles.Form onSubmit={handleSignUp} ref={formRef}>
        <Styles.Input
          name="name"
          placeholder="Nome completo"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />
        <Styles.Input
          name="email"
          ref={emailInputRef}
          placeholder="E-mail"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => phoneInputRef.current?.focus()}
        />
        <Styles.Input
          name="phone"
          ref={phoneInputRef}
          placeholder="Telefone"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        <Styles.Input
          name="password"
          ref={passwordInputRef}
          placeholder="Senha"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
        />
        <Styles.Input
          name="confirmPassword"
          ref={confirmPasswordInputRef}
          placeholder="Confirmar senha"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
        <Styles.Button
          variant="dark"
          onPress={() => formRef.current?.submitForm()}
        >
          Cadastrar
        </Styles.Button>
        <Styles.Button onPress={navigation.goBack}>Voltar</Styles.Button>
      </Styles.Form>
    </Lib.Container>
  );
};
