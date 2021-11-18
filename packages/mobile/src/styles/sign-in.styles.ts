import styled from "styled-components/native";
import * as Unform from '@unform/mobile';

import * as Lib from "@/lib";

export const WelcomeTitle = styled(Lib.Text)`
  text-align: left;
  font-size: 45px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
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

export const Button = styled(Lib.Button)`
  margin: 4px 0;
`
