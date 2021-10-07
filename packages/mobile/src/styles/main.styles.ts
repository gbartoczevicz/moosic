import styled from 'styled-components/native';

import * as Lib from '@/lib';

export const Button = styled(Lib.Button)<{ color: string }>`
  background-color: ${({ color }) => color};
  bottom: 40px;
  position: relative;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
