import { Alert } from 'react-native';

export function alertError(key: string, err: any) {
  Alert.alert(key, err.response.data.message);
}
