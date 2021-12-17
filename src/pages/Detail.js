import React, { useState } from 'react';
import { Alert, FlatList, ScrollView, View } from 'react-native';
import { Text, Icon, Image, Button, Overlay } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserCart } from '../actions';

const DetailProduk = (props) => {
    const dispatch = useDispatch();
    const { nama, kategori, deskripsi, harga, brand, images, stock } = props.route.params.detail
    const [visible, setVisible] = useState(false);
    console.log("PROPS ROUTE PARAMS", props.route.params)
    const [activeType, setActiveType] = useState({})
    const [qty, setQty] = useState("1")

    // MENGAMBIL DATA CART SEBELUMNYA DARI GLOBAL STORAGE
    const { cart, iduser } = useSelector((state) => {
        return {
            cart: state.userReducer.cart,
            iduser: state.userReducer.id
        }
    })

    const printType = () => {
        return stock.map((value, index) => {
            if (activeType.type == value.type) {
                return <Button
                    title={value.type}
                    type="clear"
                    containerStyle={{
                        marginLeft: 10,
                        backgroundColor: "#00a8ff",
                        borderRadius: 25,
                        paddingHorizontal: 25
                    }}
                    titleStyle={{
                        color: "white"
                    }}
                    onPress={() => setActiveType(value)}
                />
            } else {
                return <Button
                    title={value.type}
                    type="clear"
                    containerStyle={{
                        marginLeft: 5,
                        borderRadius: 25,
                        paddingHorizontal: 25,
                        borderWidth: 1,
                        borderColor: "grey"
                    }}
                    onPress={() => setActiveType(value)}
                />
            }
        })
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleAddToCart = () => {
        if (activeType.type) {
            toggleOverlay()

        } else {
            Alert.alert("Attention ⚠", "Choose Produk Type First")
        }
    }

    const onBtAddToCart = async () => {
        //  1. Line 17 -> Mengambil data cart sebelumnya
        //     Line 72 -> Menyimpan kedalam temp
        let temp = [...cart]
        //  2. Menambahkan data cart yang baru kedalam data cart sebelumnya
        temp.push({
            image: images[0],
            nama,
            brand,
            harga,
            type: activeType.type,
            qty: parseInt(qty)
        })
        //  3. Mengirim data cart yang telah diperbarui ke dalam json-server/api
        if (parseInt(qty) > 0 && iduser) {
            let res = await dispatch(updateUserCart(temp, iduser))

            if (res.success) {
                Alert.alert("Success ✅", "Check Your Cart",
                    [
                        {
                            text: "OK",
                            onPress: toggleOverlay
                        }
                    ])
            } else {
                Alert.alert("Attention ⚠️", "Add to cart failed");
            }
        } else {
            Alert.alert("Attention ⚠️", `Minimum 1 qty ${iduser}`);
        }
    }

    return (
        <View style={{ paddingTop: hp(10), flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ display: "flex" }}>
                    <Icon
                        raised
                        name='arrow-left'
                        type='font-awesome'
                        color="#0058AB"
                        size={15}
                        onPress={() => props.navigation.goBack()}
                        containerStyle={{ marginTop: hp(5), position: 'absolute', zIndex: 20, paddingLeft: -5 }}
                    />
                    <Icon
                        raised
                        name='heart'
                        type='font-awesome'
                        color="#ecf0f1"
                        size={15}
                        containerStyle={{ marginTop: hp(5), position: 'absolute', zIndex: 20, right: 10 }}
                    />
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={{ height: hp(50), width: wp(100), borderRadius: 25 }} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ margin: wp(5) }}>
                    <Text style={{ color: "gray" }}>{brand} | {kategori}</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text h4 style={{ color: "#474787" }}>{nama}</Text>
                        <Text h3 style={{ color: "#3c40c6" }}>Rp. {harga}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                    <Text style={{ color: "#3c40c6", fontWeight: "800" }}>Choose Type : <Text style={{ color: "gray" }}>{stock.length} type</Text>
                        <Text style={{ color: "#3c40c6", fontWeight: "800" }}> {qty} stock</Text>
                    </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 16 }}>
                    {printType()}
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ color: "#3c40c6", fontWeight: "800", marginTop: 20 }}>
                        Description
                    </Text>
                    <Text>
                        {deskripsi}
                    </Text>
                </View>

            </ScrollView>
            <Button
                title="Add to Cart"
                type="clear"
                containerStyle={{
                    marginBottom: 10,
                    borderRadius: 25,
                    backgroundColor: "yellow"
                }}
                titleStyle={{
                    color: "black"
                }}
                onPress={toggleAddToCart}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Input containerStyle={{ width: wp(80) }} value={qty} onChangeText={value => setQty(parseInt(value))} />
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Icon
                        name='plus'
                        type='font-awesome'
                        color="#f1c40f"
                        size={15}
                        style={{ marginTop: 3 }}
                    />
                    <Text style={{ color: "#f1c40f", fontWeight: "800" }} onPress={onBtAddToCart}> Submit</Text>
                </View>
            </Overlay>
        </View >
    )
}

export default DetailProduk