import { Alert } from 'react-native';

export function alertError(key: string, err: any) {
  if (!err?.response) {
    return Alert.alert("Erro", "Algum erro inexperado ocorreu");
  }

  const { status, data } = err.response;

  let message: string = data.message;

  if (status === 403) {
    message = "E-mail ou senha inválidos";
  }

  Alert.alert(key, message);
}
