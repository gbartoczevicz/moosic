import React from 'react';
import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { StyleProp, ViewStyle } from 'react-native';

const light = '#fff';
const dark = '#2f2e41';

const Container = styled.View`
  border-color: ${dark};
  border-radius: 8px;
`;

const Pressable = styled(RectButton)`
  flex: 1;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
`;

const Label = styled.Text``;

const containerStyle: StyleProp<ViewStyle> = {
  borderWidth: 1,
  borderColor: dark,
  borderRadius: 8
};

type Variant = 'dark' | 'light';
type ButtonProps = RectButtonProps & { children: string; variant?: Variant };

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'light', ...delegate } = props;

  const containerBackgroundColor = variant === 'dark' ? dark : light;
  const labelFontColor = variant === 'dark' ? light : dark;

  const styleGuard = delegate.style ?? {};
  const pressableStyle = (styleGuard as StyleProp<ViewStyle> as Array<unknown>)[0] as object;

  const borderStyling = variant === 'light' ? containerStyle : {};

  return (
    <Container style={borderStyling}>
      <Pressable
        {...delegate}
        style={{
          ...pressableStyle,
          backgroundColor: containerBackgroundColor
        }}
      >
        <Label style={{ color: labelFontColor }}>{children}</Label>
      </Pressable>
    </Container>
  );
};
