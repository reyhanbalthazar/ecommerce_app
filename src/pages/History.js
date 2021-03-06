import React, { useEffect, useState } from 'react';
import axios from "axios"
import { API_URL } from '../../helper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Image, Card, Badge, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HistoryPage = (props) => {

    const [transaksi, setTransaksi] = useState([])
    const [filter, setFilter] = useState(["Semua", "Menunggu Konfirmasi", "Terima Pesanan", "Batalkan Pesanan"])
    const [statusIdx, setStatusIdx] = useState(0)
    const { iduser } = useSelector((state) => {
        return {
            iduser: state.userReducer.id
        }
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`${API_URL}/userTransactions`)
            .then((res) => {
                console.log("get Data Transaksi", res.data)
                setTransaksi(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const printButtonFilter = () => {
        return filter.map((value, index) => {
            return <View
                style={statusIdx == index ? desain.filterAktif : desain.filterOff}
                key={index.toString()}
            >
                <Text style={{ textAlign: 'center', color: '#1264B1', fontWeight: '700', alignContent: 'center' }} onPress={() => getTransaksiFilter(value, index)}>{value}</Text>
            </View>
        })
    }

    const getTransaksiFilter = (status, statusActive) => {
        axios.get(`${API_URL}/userTransactions?${statusActive > 0 ? `status=${status}&iduser=${iduser}` : `iduser=${iduser}`}`)
            .then((res) => {
                setTransaksi(res.data)
                setStatusIdx(statusActive)
            }).catch((err) => {
                console.log(err)
            })
    }

    const printCard = () => {
        return transaksi.map((value, index) => {
            let badgeColor = value.status.includes("Batal") ? "error" : value.status.includes("Terima") ? "success" : "warning"
            return (
                <View key={index.toString()} style={{
                    marginBottom: 20,
                    marginTop: 20,
                    borderWidth: 1,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                }}>
                    <View style={{ backgroundColor: "blue", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 15, marginRight: 15 }}>
                            <Text style={{ color: "white" }}>{value.invoice}</Text>
                            <View>
                                <Badge value={value.status} textStyle={{ fontWeight: "bold" }}
                                    status={
                                        value.status.includes("Konfirmasi") ?
                                            "warning" : value.status.includes("Batal") ?
                                                "error" : "success"
                                    }
                                />
                            </View>
                        </View>
                        <Text style={{ color: "white", marginLeft: 15 }}>{value.date}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Image source={{ uri: value.detail[0].image }} style={{ height: hp(15), width: hp(15), marginBottom: 10 }} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontWeight: "bold" }}>{value.detail[0].nama}</Text>
                            <Text>{value.detail[0].qty} x Rp. {value.detail[0].harga}</Text>
                            <Text>+{value.detail.length - 1} Produk Lainnya</Text>
                        </View>
                        <View style={{ marginLeft: 30 }}>
                            <Text>Total</Text>
                            <Text style={{ fontWeight: "bold" }}>Rp. {value.detail[0].totalHarga}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingVertical: hp(1) }}>
                        <Button
                            title="Lihat Detail"
                            type='outline'
                            buttonStyle={{ padding: 3 }}
                            titleStyle={{ fontSize: 10 }}
                            containerStyle={{ margin: 5 }}
                            onPress={() => props.navigation.navigate("Detail Transaction", { detail: value })}
                        />
                        <Button
                            title="Batalkan Pesanan"
                            disabled={badgeColor == "error" ? false : true}
                            buttonStyle={{ padding: 3, backgroundColor: "red" }}
                            titleStyle={{ fontSize: 10 }}
                            containerStyle={{ margin: 5 }}
                        />
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(2) }}>
            <View style={{ flexDirection: "row" }}>
                {printButtonFilter()}
            </View>
            <ScrollView>

                <View>
                    {printCard()}
                </View>
            </ScrollView>
        </View>
    )
}

const desain = StyleSheet.create({
    filterAktif: {
        width: wp(22),
        borderColor: '#1B1464',
        borderBottomWidth: 2,
        paddingBottom: hp(1),
        marginHorizontal: wp(1),
        justifyContent: "center"

    },
    filterOff: {
        width: wp(22),
        paddingBottom: hp(1),
        marginHorizontal: wp(1),
        justifyContent: "center"

    }
})

export default HistoryPage