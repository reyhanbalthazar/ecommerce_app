import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Card, Header, Icon, Image, SearchBar, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { API_URL } from '../../helper';

const HomePage = (props) => {

    const [update, setUpdate] = useState(["Offers", "What's New", "Inspirations"])
    const [selectedUpdate, setSelectUpdate] = useState(0)
    const [category, setCategory] = useState(["Office", "Kitchen Set", "Living Room"])
    const [selectedCategory, setSelectCategory] = useState(0)
    const [produk, setProduk] = useState([])

    useEffect(() => {
        getProduk()
    }, [])

    const getProduk = () => {
        axios.get(`${API_URL}/products`)
            .then((res) => {
                console.log("GET PRODUK", res.data)
                setProduk(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const printUpdate = () => {
        return update.map((value, index) => {
            return <Text style={selectedUpdate == index ? desain.activeUpdate : desain.update} key={index.toString()}>
                {value}
            </Text>
        })
    }

    const printCategory = () => {
        return category.map((value, index) => {
            return <Text style={selectedCategory == index ? desain.activeCategory : desain.category} key={index.toString()}>
                {value}
            </Text>
        })
    }

    const printProduk = () => {
        return produk.map((value, index) => {
            return <TouchableWithoutFeedback key={index.toString()} onPress={() => props.navigation.navigate("Detail", { detail: value })}>
                <View>
                    <Image source={{ uri: value.images[0] }} style={{ height: hp(20), width: hp(20), margin: hp(1) }} />
                    <Text h4 style={{ fontWeight: "bold" }}>{value.nama}</Text>
                    <Text style={{ width: hp(20) }}>{value.kategori}</Text>
                    <Text h4 style={{ fontWeight: "bold" }}>Rp. {value.harga}</Text>
                </View>
            </TouchableWithoutFeedback>
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar barStyle='dark-content' />
            <Header
                containerStyle={{ backgroundColor: "white" }}
                placement='left'
                centerComponent={
                    <SearchBar
                        placeholder="Search"
                        containerStyle={desain.searchBar}
                        inputContainerStyle={desain.inputSearch}
                    />
                }

                rightComponent={
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", marginRight: 10 }}>
                        <Icon type="feather" size={16} name="maximize" />
                    </View>
                }
                backgroundColor="white"
            />
            <View>
                <View>
                    <View style={desain.barUpdate}>
                        {printUpdate()}
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: wp(140) }}>
                        <Text h3 style={{ marginLeft: hp(5) }}>Best Offer</Text>
                        <Text style={{ marginLeft: hp(5) }}>Get IKEA products with the best price</Text>
                        <View style={desain.barCategory}>
                            {printCategory()}
                        </View>
                        <View style={desain.produk}>
                            {printProduk()}
                        </View>
                    </ScrollView>

                </View>
            </View>
        </View>
    )
}

const desain = StyleSheet.create({
    searchBar: {
        width: wp(60),
        backgroundColor: "transparent",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        marginLeft: wp(-2)
    },
    inputSearch: {
        backgroundColor: "white",
        height: 40
    },
    activeUpdate: {
        flex: 1,
        textAlign: "center",
        color: "blue",
        fontWeight: "800",
        borderBottomWidth: 2,
        borderBottomColor: "yellow",
        paddingBottom: 5
    },
    update: {
        flex: 1,
        textAlign: "center",
        color: "gray",
        fontWeight: "100",
        backgroundColor: "white"
    },
    barUpdate: {
        marginTop: -1.5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(2),
        backgroundColor: "#2d3436",
        backgroundColor: "white",
        margin: hp(6)
    },

    activeCategory: {
        width: wp(25),
        borderRadius: 20,
        marginTop: hp(5),
        backgroundColor: '#4FA4F3',
        color: "white",
        textAlign: "center"
    },
    category: {
        width: wp(25),
        height: hp(3),
        borderRadius: 20,
        marginTop: hp(5),
        backgroundColor: '#F6F8FA',
        textAlign: "center"
    },
    barCategory: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: wp(8),
    },
    produk: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: wp(2)
    }
})

export default HomePage;