import styled from "styled-components/native";
import * as Unform from '@unform/mobile';

import * as Lib from "@/lib";

export const HeaderContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled(Lib.Title)`
  text-align: left;
  font-size: 36px;
`;

export const Subtitle = styled.Text`
  color: #8A8A8A;
`;

export const Form = styled(Unform.Form)`
  width: 100%;
  padding: 0 20px;
  align-items: center;
`;

export const Input = styled(Lib.Input)`
  width: 100%;
  margin: 8px 0;
`;
