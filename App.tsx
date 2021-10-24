
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import {StatusBar} from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';


import { AppRoutes } from './src/routes/app.routes';

import { Signin} from './src/screens/Signin';

import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { ThemeProvider} from 'styled-components';

export default function App() {
  const[fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  console.log(fontsLoaded);

 if(!fontsLoaded) {
   return <AppLoading />
 }
  return (
     <ThemeProvider theme={theme} >
      <NavigationContainer>
        <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        
         />
        {/* <AppRoutes />       */}
        <Signin />
      </NavigationContainer>
     </ThemeProvider>
    
  );
}


