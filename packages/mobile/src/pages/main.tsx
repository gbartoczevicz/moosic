import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import { Container } from '@/lib';
import { Button } from '@/styles/main.styles';

const exampleItems = [
  {
    title: 'Item 1',
    text: 'Text 1'
  },
  {
    title: 'Item 2',
    text: 'Text 2'
  },
  {
    title: 'Item 3',
    text: 'Text 3'
  },
  {
    title: 'Item 4',
    text: 'Text 4'
  },
  {
    title: 'Item 5',
    text: 'Text 5'
  }
];

export const Main: React.FC = () => {
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [canSignUp, setCanSignUp] = useState(false);

  const ref = useRef(null);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>
          {item.text} Index {index}
        </Text>
      </View>
    ),
    []
  );

  useEffect(() => {
    setCanSignUp(activeIndex === exampleItems.length - 1);
  }, [activeIndex, exampleItems]);

  return (
    <Container>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'purple', paddingTop: 100 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Carousel
            layout="default"
            ref={ref}
            data={exampleItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>

        {canSignUp && (
          <>
            <Button color="red" onPress={() => navigation.navigate('SignUp')}>
              SignUp
            </Button>
            <Button color="green" onPress={() => navigation.navigate('SignIn')}>
              SignIn
            </Button>
          </>
        )}
      </SafeAreaView>
    </Container>
  );
};
