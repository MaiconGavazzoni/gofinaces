import React from 'react';

import {Input} from '../../components/Forms/Input';

import { 
  Container,
  Header,
  Title,
  Form 
} from './styles';


export function Register(){
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Input 
      placeholder="Nome"
      />
       <Input 
      placeholder="Preço"
      />
      <Form></Form>
    </Container>

  );
}