import styled from 'styled-components/native';

interface Props {
  fontSize: any;
  fontWeight: any;
  color: any;
  marginBottom: any;
}

export const Text = styled.Text<Props>`
  color: ${props => props.color};
  font-weight:${props => props.fontWeight};
  font-size:${props => props.fontSize};
  margin-bottom:${props => props.marginBottom};
`;