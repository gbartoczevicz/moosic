import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Lib from '@/lib';
import * as Styles from '@/styles/main.styles';

export const Main: React.FC = () => {
  const navigation = useNavigation();

  const [canSignUp, setCanSignUp] = useState(false);

  return (
    <Lib.Container>
      <Lib.Carousel onChange={setCanSignUp} />

      {canSignUp && (
        <>
          <View style={{ marginTop: 50, height: 50 }}>
            <Styles.Button variant="dark" onPress={() => navigation.navigate('SignUp')}>
              SignUp
            </Styles.Button>
          </View>
          <View style={{ height: 50 }}>
            <Styles.Button onPress={() => navigation.navigate('SignIn')}>SignIn</Styles.Button>
          </View>
        </>
      )}
    </Lib.Container>
  );
};
