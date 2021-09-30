import React from 'react';
import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

const Container = styled(RectButton)``;

const Label = styled.Text``;

type ButtonProps = RectButtonProps & { children: string };

export const Button: React.FC<ButtonProps> = ({ children, ...delegate }) => (
  <Container {...delegate}>
    <Label>{children}</Label>
  </Container>
);
