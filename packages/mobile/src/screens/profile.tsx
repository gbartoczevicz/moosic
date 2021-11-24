import React from "react";

import { ScrollView, View } from "react-native";
import { Avatar, Badges, Button, Card, Text } from "@/lib";
import { useAuth } from "@/hooks";

import * as Lib from "@/lib";

const EVENTS = [
  {
    date: "23/12/2022",
    description: "Show banda X no shopping",
    price: "R$ 235,00",
  },
  {
    date: "23/12/2022",
    description: "Show banda X no shopping",
    price: "R$ 235,00",
  },
  {
    date: "23/12/2022",
    description: "Show banda X no shopping",
    price: "R$ 235,00",
  },
  {
    date: "23/12/2022",
    description: "Show banda X no shopping",
    price: "R$ 235,00",
  },
  {
    date: "23/12/2022",
    description: "Show banda X no shopping",
    price: "R$ 235,00",
  },
  {
    date: "23/12/2022",
    description: "Show banda X no shopping",
    price: "R$ 235,00",
  },
];

const BADGES = ["medal", "medal", "medal", "medal", "medal"];

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Lib.Container>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 60,
          right: 25,
        }}
      >
        <Avatar url={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEV7H6L///9xAJzs4fH17PiBI6d6G6GDLqj38fmHPqraxOXy6fWFOamGO6n79PxuAJp5DqHUueDfy+grd0eUAAAA70lEQVR4nO3WTU7CABRGUahaf1BQ979YZ0jjwNakKRfPWcF3kzd4ux0AAAAAAAAAAAAAAAAAAPBPjBe23rKK8fX57O0mE4fD/uw4bL1mDcPdd+G9wiSFfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insU9insE9hn8I+hX0K+xT2KexT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYZ/CPoV9CvsU9insmxSexnm2Hr3IpPD9caatVy9xWbh/muf4UTrnSeFcLwqviUKF10/hDRQefg/64bNUuHv4i61HLzPzF83+pQAAAAAAAAAAAAAAAAAAsKYvHCoPHMjDJaoAAAAASUVORK5CYII="} />
        <View
          style={{
            left: 30,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text>{user.name}</Text>
          <Button
            style={{
              alignItems: "center",
              width: 45,
              marginTop: 10,
              padding: 2,
              height: 1,
              borderRadius: 6,
            }}
            variant="dark"
          >
            Editar
          </Button>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ fontWeight: "bold" }}>Premios</Text>
          <View
            style={{
              left: 50,
              width: "70%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            {BADGES.map((name, key) => <Badges key={key} name={name} />)}
          </View>
        </View>

        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ fontWeight: "bold" }}>Eventos passados</Text>
          <View
            style={{ alignItems: "flex-end", width: "100%", marginTop: 30 }}
          >
            {EVENTS.map((item, key) => (
              <Card
                key={`events-${key}`}
                date={item.date}
                title={item.description}
                price={item.price}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </Lib.Container>
  );
};
