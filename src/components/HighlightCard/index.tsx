import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

interface Props {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}


export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
  }:Props){
  return (
    <Container>
      <Header>
        <Title>Entrar</Title>
        <Icon name={icon[type]} type={type}/>
      </Header>

      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>{lastTransaction}</LastTransaction>

      </Footer>
    </Container>
  )
}