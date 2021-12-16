import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import TabNavigation from './TabNavigantion';
import DetailProduk from '../pages/Detail';
import { useDispatch } from 'react-redux';
import { onKeepLogin } from '../actions';

const Stack = createNativeStackNavigator()

const StackNavigation = (props) => {

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(onKeepLogin())
    }, [])

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginPage} options={{headerShown:false}}/>
            <Stack.Screen name="TabNav" component={TabNavigation} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterPage} options={{headerShown:false}}/>
            <Stack.Screen name="Detail" component={DetailProduk} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default StackNavigation