import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import DepCarousel, { Pagination } from "react-native-snap-carousel";

import { CarouselItem, Props } from "@/lib/carousel.props";
import * as Styles from "@/lib/carousel.styles";

const carouselItems: Array<CarouselItem> = [
  {
    title: "Encontre Profissionais",
    text:
      "Moosic vai posibilitar encontrar com facilidade os melhores artistas e bandas da sua região.",
    image: require("../../assets/carouselImage1.png"),
  },
  {
    title: "Agende com facilidade",
    text:
      "Moosic também vai tornar o processo de agendamento muito mais prático e eficiente.",
    image: require("../../assets/carouselImage2.png"),
  },
  {
    title: "Tenha presença na sua região",
    text: "Participe de uma rede de restaurantes e alavanque seu negocio.",
    image: require("../../assets/carouselImage3.png"),
  },
];

export const Carousel: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef<any>(null);

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <Styles.ItemContainer>
      <Styles.ItemImage source={item.image} />
      <Styles.ItemTitle>{item.title}</Styles.ItemTitle>
      <Styles.ItemText>{item.text}</Styles.ItemText>
    </Styles.ItemContainer>
  );

  useEffect(() => {
    onChange(activeIndex === carouselItems.length - 1);
  }, [activeIndex, carouselItems]);

  return (
    <View style={{ height: 400, justifyContent: "center" }}>
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
          dotStyle={Styles.DotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots
        />
      </View>
    </View>
  );
};
