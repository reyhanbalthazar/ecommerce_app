import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import LoginPage from './src/pages/Login';
import RegisterPage from './src/pages/Register';
import StackNavigation from './src/navigations/StackNavigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from './src/reducers';
import ReduxThunk from 'redux-thunk'

const globalStore = createStore(rootReducers, {}, applyMiddleware(ReduxThunk))

const App = (props) => {
  
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App;