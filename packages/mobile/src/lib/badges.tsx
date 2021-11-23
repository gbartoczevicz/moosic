import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Alert, TextInput, View } from 'react-native';
import { Button } from '@/lib';

interface IBadges {
  name: string
}

export const Badges: React.FC<IBadges> = ({ name }) => {
  return (
    <Icon name={name} size={18} color="#999" />
  )
};
