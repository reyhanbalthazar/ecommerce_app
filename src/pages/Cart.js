import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Image, Text, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { updateUserCart } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../helper';


const CartPage = (props) => {

    const dispatch = useDispatch();

    const { cart, iduser, username } = useSelector((state) => {
        return {
            cart: state.userReducer.cart,
            iduser: state.userReducer.id,
            username: state.userReducer.username,
        }
    })

    const onBtRemove = (index) => {
        let temp = [...cart]
        temp.splice(index, 1)
        dispatch(updateUserCart(temp, iduser))
    }

    const onBtInc = (index) => {
        let temp = [...cart]
        temp[index].qty += 1
        dispatch(updateUserCart(temp, iduser))
    }

    const onBtDec = (index) => {
        let temp = [...cart]
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
        } else {
            Alert.alert("ATTENTION ⚠", "Ingin Menghapus Produk",
                [
                    {
                        text: "Yes",
                        onPress: () => onBtRemove(index)
                    },
                    {
                        text: "no"
                    }
                ])
        }
        dispatch(updateUserCart(temp, iduser))
    }

    const printTotal = () => {
        let total = 0
        cart.forEach((value) => total += value.qty * value.harga)
        return total
    }

    const printShipping = () => {
        let totalShipping = 0
        cart.forEach((value) => totalShipping += (value.qty * value.harga) * 20 / 100)
        return totalShipping
    }

    const printTax = () => {
        let totalTax = 0
        cart.forEach((value) => totalTax += (value.qty * value.harga) * 10 / 100)
        return totalTax
    }

    const onBtCheckout = () => {
        let date = new Date()
        axios.post(`${API_URL}/userTransactions`, {
            iduser,
            username,
            invoice: `#INV${date.getTime()}`,
            date,
            note: "",
            totalPayment: printTotal() + printShipping() + printTax(),
            ongkir: printShipping(),
            detail: [cart],
            status: "Menunggu Konfirmasi"
        }).then((res) => {
            dispatch(updateUserCart([], iduser))
        }).catch((err) => {
            console.log(err)
        })
        console.log(iduser)
    }

    const printCart = () => {
        return cart.map((value, index) => {
            return <View key={index.toString()} >
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: value.image }} style={{ height: hp(15), width: hp(15), margin: hp(1), }} />
                    <View>
                        <Text style={{ fontWeight: "800", color: "#30336b" }}>{value.nama}</Text>
                        <View>
                            <Text style={{ color: "#808e9b" }}>{value.type}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="minus" type="feather" color="#bdc3c7" onPress={() => onBtDec(index)} />
                            <View >
                                <Text style={{ fontWeight: "800", color: "#30336b", marginLeft: wp(1), marginRight: wp(1), marginTop: wp(1) }}>{value.qty}</Text>
                            </View>
                            <Icon name="plus" type="feather" color="#bdc3c7" onPress={() => onBtInc(index)} />
                            <View style={{ marginLeft: wp(34) }}>
                                <Icon name="trash" type="feather" color="#bdc3c7" onPress={() => onBtRemove(index)} />
                            </View>
                        </View>
                    </View>
                    <Text h4 style={{ fontWeight: "800", color: "#30336b", position: 'absolute', right: 0 }}>Rp {value.harga}</Text>
                </View>
            </View>
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: hp(10), paddingHorizontal: wp(5) }}>
            <Text h4 style={{ textAlign: "center" }}>Cart</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {printCart()}
                </View>
            </ScrollView>
            <View
                style={{
                    borderBottomColor: "#808e9b",
                    borderBottomWidth: 2,
                    marginTop: hp(1)
                }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(3) }}>
                <Text style={{ fontWeight: "800" }}>Shipping</Text>
                <Text>Rp. {printShipping()}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(3) }}>
                <Text style={{ fontWeight: "800" }}>Tax</Text>
                <Text>Rp. {printTax()}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(3) }}>
                <Text style={{ fontWeight: "800" }}>Total</Text>
                <Text style={{ fontWeight: "800" }}>Rp. {printTotal()}</Text>
            </View>
            <Button
                title={`Checkout Rp. ${printTotal() + printShipping() + printTax()}`}
                containerStyle={{ borderRadius: 10, marginTop: hp(3), marginBottom: hp(1) }}
                buttonStyle={{ backgroundColor: "#FBD913" }}
                titleStyle={{ color: "#30336b" }}
                onPress={onBtCheckout}
            />
        </View>
    )
}

export default CartPage;