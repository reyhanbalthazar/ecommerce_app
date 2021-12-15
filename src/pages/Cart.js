import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CartPage =(props)=> {
    return (
        <View style={{flex:1, backgroundColor:"blue", paddingTop:hp(10)}}>
            <Text h3>Cart Page Ecommerce</Text>
        </View>
    )
}

export default CartPage;