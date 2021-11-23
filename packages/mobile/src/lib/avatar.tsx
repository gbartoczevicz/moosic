import React from 'react';
import styled from 'styled-components/native';
import { Alert, TextInput, View, Image } from 'react-native';
import { Button } from '@/lib';

const Container = styled.Image`
  width: 80px;
  height: 80px;
  border: 2px;
  border-radius: 100px;
  border-color: #000;
`;

export const Avatar: React.FC = () => {
  return (
    <Container
      source={{
        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEV7H6L///9xAJzs4fH17PiBI6d6G6GDLqj38fmHPqraxOXy6fWFOamGO6n79PxuAJp5DqHUueDfy+grd0eUAAAA70lEQVR4nO3WTU7CABRGUahaf1BQ979YZ0jjwNakKRfPWcF3kzd4ux0AAAAAAAAAAAAAAAAAAPBPjBe23rKK8fX57O0mE4fD/uw4bL1mDcPdd+G9wiSFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insmxSexnm2Hr3IpPD9caatVy9xWbh/muf4UTrnSeFcLwqviUKF10/hDRQefg/64bNUuHv4i61HLzPzF83+pQAAAAAAAAAAAAAAAAAAsKYvHCoPHMjDJaoAAAAASUVORK5CYII='
      }} />
  )
};