import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

import * as Styles from "@/lib/button.styles";

const light = '#fff';
const dark = '#2f2e41';

type Variant = 'dark' | 'light';
type ButtonProps = ViewProps &
  Pick<RectButtonProps, 'onPress' | 'enabled'> & {
    children: string;
    variant?: Variant;
  };

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = 'light', ...delegate } = props;
  const { onPress, enabled } = delegate;

  const backgroundColor = variant === 'dark' ? dark : light;
  const color = variant === 'dark' ? light : dark;

  const styleGuard = delegate.style ?? {};
  const styleDelegate = (styleGuard as StyleProp<ViewStyle> as Array<unknown>)[0] as object;

  const borderColor = variant === "dark" ? light : dark;

  return (
    <Styles.Container style={{...styleDelegate, borderColor }} >
      <Styles.Pressable
        onPress={onPress}
        enabled={enabled}
        style={{ backgroundColor }}
      >
        <Styles.Label style={{ color }}>{children}</Styles.Label>
      </Styles.Pressable>
    </Styles.Container>
  );
};
