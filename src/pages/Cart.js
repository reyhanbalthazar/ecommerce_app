import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Image, Text, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CartPage = (props) => {

    const [cart, setCart] = useState(
        [
            {
                nama: "ADILS/LINNMON",
                gambar: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/371/0737165_PE740925_S5.jpg",
                harga: 20,
                qty: 1,
                type: "Shelf Unit"
            },
            {
                nama: "Micke",
                gambar: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/360/0736022_PE740349_S5.jpg",
                harga: 200,
                qty: 2,
                type: "Shelf Unit"
            },
            {
                nama: "Malm",
                gambar: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/359/0735975_PE740309_S4.jpg",
                harga: 350,
                qty: 2,
                type: "Shelf Unit"
            },
            {
                nama: "ADILS/LINNMON",
                gambar: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/371/0737165_PE740925_S5.jpg",
                harga: 20,
                qty: 1,
                type: "Shelf Unit"
            },
            {
                nama: "Micke",
                gambar: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/360/0736022_PE740349_S5.jpg",
                harga: 200,
                qty: 2,
                type: "Shelf Unit"
            },
            {
                nama: "Malm",
                gambar: "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/359/0735975_PE740309_S4.jpg",
                harga: 350,
                qty: 2,
                type: "Shelf Unit"
            }
        ])

    const printCart = () => {
        return cart.map((value, index) => {
            return <View key={index.toString()} >
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: value.gambar }} style={{ height: hp(15), width: hp(15), margin: hp(1), }} />
                    <View>
                        <Text style={{ fontWeight: "800", color: "#30336b" }}>{value.nama}</Text>
                        <View>
                            <Text style={{ color: "#808e9b" }}>{value.type}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="minus" type="feather" color="#bdc3c7" />
                            <View >
                                <Text style={{ fontWeight: "800", color: "#30336b", marginLeft: wp(1), marginRight: wp(1), marginTop: wp(1) }}>{value.qty}</Text>
                            </View>
                            <Icon name="plus" type="feather" color="#bdc3c7" />
                            <Icon name="trash" type="feather" color="#bdc3c7" style={{marginLeft:wp(34)}} />
                        </View>
                    </View>
                        <Text style={{ fontWeight: "800", color: "#30336b", position: 'absolute', right: 0 }}>${value.harga}</Text>
                </View>
            </View>
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: hp(10), paddingHorizontal: wp(5) }}>
            <Text h4 style={{ textAlign: "center" }}>Cart</Text>
            <ScrollView>
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
                <Text style={{fontWeight:"800"}}>Shipping</Text>
                <Text>$50</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(3) }}>
                <Text style={{fontWeight:"800"}}>Tax</Text>
                <Text>$50</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: hp(3) }}>
                <Text style={{fontWeight:"800"}}>Total</Text>
                <Text style={{fontWeight:"800"}}>$320</Text>
            </View>
            <Button
                title="Checkout"
                containerStyle={{ borderRadius: 10, marginTop: hp(3), marginBottom:hp(1) }}
                buttonStyle={{ backgroundColor: "#FBD913" }}
                titleStyle={{ color: "#30336b" }}
            />
        </View>
    )
}

export default CartPage;