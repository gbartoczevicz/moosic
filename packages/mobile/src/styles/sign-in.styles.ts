import styled from "styled-components/native";
import * as Unform from '@unform/mobile';

import * as Lib from "@/lib";

export const WelcomeTitle = styled(Lib.Title)`
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

