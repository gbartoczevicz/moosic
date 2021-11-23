import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  border-radius: 8px;
  border-width: 1px;
  height: 40px;
  width: 160px;
`;

export const Pressable = styled(RectButton)`
  flex: 1;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
`;

export const Label = styled.Text``;
