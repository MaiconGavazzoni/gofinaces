import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer
} from './styles';

export function Signin(){
  return(
    <Container>
      <Header>
      <TitleWrapper>
      <LogoSvg 
        width={RFValue(120)}
        height={RFValue(68)}
       />
       <Title>
        Controle suas {'\n'} 
        finanças de forma {'\n'} 
        muito simples
       </Title>
       </TitleWrapper>
       <SignInTitle>
        Faça sue login com {'\n'} 
        uma das contras abaixo
       </SignInTitle>
      </Header>

      <Footer>
      </Footer>
  
    </Container>
  );
}