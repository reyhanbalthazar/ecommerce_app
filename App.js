import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import StackNavigation from './src/navigations/StackNavigation';
import LoginPage from './src/pages/Login';
import RegisterPage from './src/pages/Register';

const App =(props)=>{
  return(
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  )
}

export default App;