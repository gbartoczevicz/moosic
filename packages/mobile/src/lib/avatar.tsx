import React from "react";
import styled from "styled-components/native";
import { Alert, Image, TextInput, View } from "react-native";
import { Button } from "@/lib";

const Container = styled.Image`
  width: 80px;
  height: 80px;
  border: 2px;
  border-radius: 100px;
  border-color: #000;
`;

interface IAvatar {
  url: string
}

export const Avatar: React.FC<IAvatar> = ({ url, ...rest }) => {
  return (
    <Container
      {...rest}
      source={{
        uri: url
      }}
    />
  );
};
