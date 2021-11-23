import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import * as Styles from "@/lib/input.styles";

type InputProps = TextInputProps & {
  name: string;
};

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputImpl: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, ...delegate },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Styles.Container
      {...delegate}
      ref={inputElementRef}
      defaultValue={defaultValue}
      onChangeText={(value) => {
        inputValueRef.current.value = value;
      }}
    />
  );
};

export const Input = forwardRef(InputImpl);
