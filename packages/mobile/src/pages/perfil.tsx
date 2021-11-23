import React, { useState } from 'react';
import { Alert, TextInput, View, SafeAreaView, ScrollView } from 'react-native';
import { Title, Container, Input, Header, Avatar, Button, Card } from '@/lib';
import { Badges } from '@/lib/badges';

const EVENTS = [
  {
    date: '23/12/2022',
    description: 'Show banda X no shopping',
    price: 'R$ 235,00'
  },
  {
    date: '23/12/2022',
    description: 'Show banda X no shopping',
    price: 'R$ 235,00'
  },
  {
    date: '23/12/2022',
    description: 'Show banda X no shopping',
    price: 'R$ 235,00'
  },
  {
    date: '23/12/2022',
    description: 'Show banda X no shopping',
    price: 'R$ 235,00'
  },
  {
    date: '23/12/2022',
    description: 'Show banda X no shopping',
    price: 'R$ 235,00'
  },
  {
    date: '23/12/2022',
    description: 'Show banda X no shopping',
    price: 'R$ 235,00'
  },
];


const BADGES = ['medal', 'medal', 'medal', 'medal', 'medal'];

export const Perfil: React.FC = () => {

  return (
    <>
      <Header title="Perfil" />
      <Container>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 60, right: 25 }}>
          <Avatar />
          <View style={{ left: 30, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Title>Luiz Eduardo</Title>
            <Button alignItems="center" width={45} marginTop={10} padding={2} heigth={1} borderRadius={6} variant="dark">Editar</Button>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentViewStyle={{ width: '100%', flexGrow: 1, justifyContent: 'center', overflow: 'hidden' }} >
          <View style={{ alignItems: 'flex-start' }}>
            <Title style={{ fontWeight: 'bold' }}>Premios</Title>
            <View style={{ left: 50, width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, marginBottom: 30 }}>
              {BADGES.map((name, key) => (
                <Badges key={key} name={name} />
              ))}
            </View>
          </View>

          <View style={{ alignItems: 'flex-start' }} >
            <Title style={{ fontWeight: 'bold' }}>Eventos passados</Title>
            <View style={{ alignItems: 'flex-end', width: '100%', marginTop: 30 }} >
              {EVENTS.map((item, key) => (
                <Card key={`events-${key}`} date={item.date} title={item.description} price={item.price} />
              ))}
            </View>
          </View>
        </ScrollView>
      </Container>
    </>
  )
}