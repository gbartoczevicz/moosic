import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, TextInput, View } from 'react-native';
import { Button } from '@/lib';

const Container = styled.View`
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #000;
  letter-spacing: 1px;
`;

interface IHeader {
  title: string;
}

export const Header: React.FC<IHeader> = ({ title }) => {
  return (
    <Container>
      <Button>
        <Icon name="menu" size={30} />
      </Button>
      <View style={{ left: 130 }}>
        <Title>{title}</Title>
      </View>
    </Container>
  )
};
