import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomePage from '../pages/Home';
import CartPage from '../pages/Cart';
import ProfilePage from '../pages/Profile';

const Tab = createBottomTabNavigator()
const TabNavigation = (props) => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={
                ({route})=>({
                    tabBarIcon:({color})=>{
                        let iconName="";
                        if(route.name=="Home"){
                            iconName="home";
                        }else if(route.name=="Cart"){
                            iconName="shopping-cart"
                        }else if(route.name=="Profile"){
                            iconName="user"
                        }                 

                        return <Icon type="feather" name={iconName} size={18} color={color} />
                    }
                })
            }

            // tabBarOptions={{
            //     showLabel:false
            // }}
        >
            <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={CartPage} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
            
        </Tab.Navigator>
    )
}

export default TabNavigation;