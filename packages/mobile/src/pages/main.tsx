import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Container } from '@/lib';
import { Button } from '@/styles/main.styles';

const carouselItems = [
  {
    title: 'Encontre Profissionais',
    text: 'Moosic vai posibilitar encontrar com facilidade os melhores artistas e bandas da sua região.',
    imgPath: <Image source={require('../../assets/carouselImage1.png')} />
  },
  {
    title: 'Agende com facilidade',
    text: 'Moosic também vai tornar o processo de agendamento muito mais prático e eficiente.',
    imgPath: <Image source={require('../../assets/carouselImage2.png')} />
  },
  {
    title: 'Tenha presença na sua região',
    text: 'Participe de uma rede de restaurantes e alavanque seu negocio.',
    imgPath: <Image style={{ width: 200, height: 200 }} source={require('../../assets/carouselImage3.png')} />
  }
];

export const Main: React.FC = () => {
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [canSignUp, setCanSignUp] = useState(false);

  const ref = useRef(null);

  const renderItem = useCallback(
    ({ item }) => (
      <View
        style={{
          padding: 25,
          marginLeft: 5,
          marginRight: 5,
          alignItems: 'center'
        }}
      >
        {item.imgPath}
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              width: 280,
              marginTop: 15,
              marginBottom: 15
            }}
          >
            {item.title}
          </Text>
        </View>

        <Text style={{ fontSize: 14, width: 300 }}>{item.text}</Text>
      </View>
    ),
    []
  );

  useEffect(() => {
    setCanSignUp(activeIndex === carouselItems.length - 1);
  }, [activeIndex, carouselItems]);

  return (
    <Container>
      <View style={{ height: 400, justifyContent: 'center' }}>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />

        <View>
          <Pagination
            dotsLength={carouselItems.length}
            activeDotIndex={activeIndex}
            carouselRef={ref}
            dotStyle={{
              width: 6,
              height: 6,
              borderRadius: 4,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots
          />
        </View>
      </View>

      {canSignUp && (
        <>
          <View style={{ marginTop: 50, height: 50 }}>
            <Button variant="dark" onPress={() => navigation.navigate('SignUp')}>
              SignUp
            </Button>
          </View>
          <View style={{ height: 50 }}>
            <Button onPress={() => navigation.navigate('SignIn')}>SignIn</Button>
          </View>
        </>
      )}
    </Container>
  );
};
