export type CarouselItem = {
  title: string;
  text: string;
  image: any;
};

export type Props = {
  onChange: (canShowActions: boolean) => void;
};
