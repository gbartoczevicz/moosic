import styled from 'styled-components/native';

import * as Lib from '@/lib';

export const Button = styled(Lib.Button)`
  margin: 8px 0;
`;

export const ActionsContainer = styled.View<{ isVisible: boolean }>`
  opacity: ${(props) => props.isVisible ? 1: 0};
`
