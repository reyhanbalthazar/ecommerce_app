import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Image, Text } from 'react-native-elements';

const DetailTransaction = (props) => {

    let { iduser, username, invoice, date, note, totalPayment, ongkir, detail, status, id } = props.route.params.detail

    const printProduct = () => {
        return detail.map((value, index) => {
            return <Card containerStyle={{ padding: 10, margin: 0, marginBottom: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: value.image }} style={{ width: 50, height: 50 }} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontWeight: "bold" }}>{value.nama}</Text>
                        <Text style={{ fontSize: 12 }}>{value.qty} x {value.harga}</Text>
                    </View>
                </View>
                <Card.Divider />
                <View>
                    <Text style={{ fontSize: 12 }}>Total Price</Text>
                    <Text style={{ fontWeight: "bold" }}>Rp. {value.qty * value.harga}</Text>

                </View>
            </Card>
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Card containerStyle={{ padding: 10, margin: 0 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 5, borderBottomWidth: 0.7 }}>{status}</Text>
                    <Text style={{ color: "gray", marginVertical: 5 }}>{invoice}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "gray" }}>Tanggal Pembelian</Text>
                        <Text style={{ color: "gray" }}>{date}</Text>
                    </View>
                </Card>
                <Card containerStyle={{ padding: 10, margin: 0, marginTop: 10 }}>
                    <Card.Title style={{ textAlign: "left" }}>Detail Produk</Card.Title>
                    {printProduct()}
                </Card>
                <Card containerStyle={{ padding: 10, margin: 0, marginTop: 10 }}>
                    <Card.Title style={{ textAlign: "left" }}>Payment Produk</Card.Title>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>Total Price</Text>
                        <Text>Rp. {(totalPayment - ongkir)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>Tax</Text>
                        <Text>Rp. {(totalPayment - ongkir) * 10 / 100}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>Shipping</Text>
                        <Text>Rp. {ongkir}</Text>
                    </View>
                    <Card.Divider />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{fontWeight:"bold"}}>Total Payment</Text>
                        <Text style={{fontWeight:"bold"}}>Rp. {totalPayment + ((totalPayment - ongkir) * 10)}</Text>
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
}

export default DetailTransaction