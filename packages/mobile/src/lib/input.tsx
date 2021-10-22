import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { useField } from '@unform/core';
import { Title } from '.';

const Container = styled.TextInput`
    border-radius: 10px;
    padding: 5px 10px 5px 10px;
    width: 220px;
    border: 1px solid #000;
`;

type InputProps = TextInputProps & {
  name: string;
};

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

/** @todo */
export const InputImpl: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, ...delegate }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value'
    });
  }, [registerField, fieldName]);

  return (
    <>
      <Container
        {...delegate}
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        
      />
    </>
  );
};

export const Input = forwardRef(InputImpl);
