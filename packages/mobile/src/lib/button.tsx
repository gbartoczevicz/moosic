import React from 'react';
import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

const light = '#fff';
const dark = '#2f2e41';

const Container = styled.View`
  border-color: ${dark};
  border-radius: 8px;
  height: 40px;
  width: 160px;
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
type ButtonProps = ViewProps &
  Pick<RectButtonProps, 'onPress' | 'enabled'> & {
    children: string;
    variant?: Variant;
  };

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'light', ...delegate } = props;

  const { onPress, enabled } = delegate;

  const containerBackgroundColor = variant === 'dark' ? dark : light;
  const labelFontColor = variant === 'dark' ? light : dark;

  const styleGuard = delegate.style ?? {};
  const styleDelegate = (styleGuard as StyleProp<ViewStyle> as Array<unknown>)[0] as object;

  const borderStyling = variant === 'light' ? containerStyle : {};

  return (
    <Container style={{ ...styleDelegate, ...borderStyling }}>
      <Pressable
        onPress={onPress}
        enabled={enabled}
        style={{
          backgroundColor: containerBackgroundColor
        }}
      >
        <Label style={{ color: labelFontColor }}>{children}</Label>
      </Pressable>
    </Container>
  );
};
