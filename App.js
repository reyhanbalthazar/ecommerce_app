import React from 'react';
import { View } from 'react-native';
import LoginPage from './src/pages/Login';
import RegisterPage from './src/pages/Register';

const App = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {/* <LoginPage /> */}
      <RegisterPage/>
    </View>
  )
}

export default App;