import React from 'react';
import AppLoading from 'expo-app-loading';
import { Dashboard } from './src/screens/Dashboard';

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
      <Dashboard />
    </ThemeProvider>
    
  );
}

