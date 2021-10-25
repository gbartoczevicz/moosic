import React from 'react';
import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { StyleProp, ViewStyle } from 'react-native';

const light = '#fff';
const dark = '#2f2e41';

const Container = styled(RectButton)``;
const Label = styled.Text``;

type Variant = 'dark' | 'light';
type ButtonProps = RectButtonProps & { children: string; variant?: Variant };

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'light', ...delegate } = props;

  const containerBackgroundColor = variant === 'dark' ? dark : light;
  const labelFontColor = variant === 'dark' ? light : dark;

  const styleGuard = delegate.style ?? {};
  const containerStyle = (styleGuard as StyleProp<ViewStyle> as Array<unknown>)[0] as object;

  return (
    <Container
      {...delegate}
      style={{
        ...containerStyle,
        backgroundColor: containerBackgroundColor
      }}
    >
      <Label style={{ color: labelFontColor }}>{children}</Label>
    </Container>
  );
};
