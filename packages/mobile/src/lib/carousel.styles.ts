import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

import * as Lib from "@/lib/misc.styles"

export const DotStyle: StyleProp<ViewStyle> = {
  width: 6,
  height: 6,
  borderRadius: 4,
  marginHorizontal: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.90)'
}

export const ItemContainer = styled.View`
  padding: 24px;
  margin: 0 6px;
  align-items: center;
`

export const ItemTitle = styled(Lib.Text)`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 16px 0;
`;

export const ItemText = styled(Lib.Text)`
  font-size: 14px;
`;

export const ItemImage = styled.Image`
  max-width: 160px;
  max-height: 160px;
`;
