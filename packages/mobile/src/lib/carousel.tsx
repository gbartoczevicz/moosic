import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import DepCarousel, { Pagination } from 'react-native-snap-carousel';

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

type Props = {
  onChange: (canShowActions: boolean) => void;
};

export const Carousel: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<any>(null);

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
    onChange(activeIndex === carouselItems.length - 1);
  }, [activeIndex, carouselItems]);

  return (
    <View style={{ height: 400, justifyContent: 'center' }}>
      <DepCarousel
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
  );
};
