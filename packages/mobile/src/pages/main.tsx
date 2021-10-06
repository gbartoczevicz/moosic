import React, { useState, useCallback, useRef } from 'react';

import { Container, Title, Button } from '@/lib';
import { RedTitle } from '@/styles/home.styles';

import { useNavigation } from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';
import { Text, View, SafeAreaView } from 'react-native';


const exampleItems = [
  {
    title: 'Item 1',
    text: 'Text 1',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
  },
  {
    title: 'Item 3',
    text: 'Text 3',
  },
  {
    title: 'Item 4',
    text: 'Text 4',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
  },
];

const Main: React.FC = () => {
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }) => (
    <View
      style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
      }}
    >
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  ), []);

  return (
    <Container>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'purple', paddingTop: 100 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
      <Button style={{bottom: 50, position: 'relative',
height: 100,
alignItems: 'center',
justifyContent: 'center',backgroundColor:'red'}} onPress={() => navigation.navigate('Registration')}>Cadastrar</Button>
      <Button style={{bottom: 40, position: 'relative',
height: 100,
alignItems: 'center',
justifyContent: 'center',backgroundColor:'green'}} onPress={() => navigation.navigate('SignIn')}>Entrar</Button>
    </SafeAreaView>
    </Container>
  );
};

export default Main;
