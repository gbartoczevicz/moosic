import React, { useCallback, useRef } from "react";
import { Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";

import { alertError } from "@/utils";
import { useAuth, useCanSkipMain } from "@/hooks";
import * as Lib from "@/lib";
import * as Styles from "@/styles/sign-in.styles";

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { updateCanSkipMain, canSkipMain } = useCanSkipMain();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data) => {
      try {
        await signIn(data);
        await updateCanSkipMain(true);
      } catch (err: any) {
        return alertError("Erro de autenticação", err);
      }

      navigation.navigate("App");
    },
    [navigation, alertError],
  );

  return (
    <Lib.Container>
      <Styles.HeaderContainer>
        <Styles.WelcomeTitle>
          Bem
          {"\n"}
          Vindo
        </Styles.WelcomeTitle>
        <Image source={require("../../assets/logoSignin.png")} />
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
        <Styles.Button
          variant="dark"
          onPress={() => formRef.current?.submitForm()}
        >
          Entrar
        </Styles.Button>
        {!canSkipMain && (
          <Styles.Button onPress={navigation.goBack}>Voltar</Styles.Button>
        )}
      </Styles.Form>
    </Lib.Container>
  );
};
