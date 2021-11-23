import React from 'react';
import styled from 'styled-components/native';
import { Alert, TextInput, View, Text } from 'react-native';
import { Button } from '@/lib';


const CardContainer = styled.View`
  border: 1px solid #000;
  border-radius: 10px;
  height: 90px;
  width: 250px;
  padding: 10px;
  margin-top: 15px;


`;

interface ICard {
  date: string,
  title: string,
  price: string,
}

export const Card: React.FC<ICard> = ({ title, price, date }) => {
  return (
    <CardContainer>
      <Text>{date}</Text>
      <View style={{ left: 35 }}>
        <Text>{title}</Text>
        <Text>{price}</Text>
      </View>
    </CardContainer>
  )
};
