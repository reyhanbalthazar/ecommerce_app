import axios from 'axios';
import React, { useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Alert } from 'react-native';
import { Image, Text, Input, Icon, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { API_URL } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { onRegister } from '../actions';
import { StackActions } from '@react-navigation/native';

const RegisterPage = (props) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [visible, setVisible] = useState(true)
    const [eye, setEye] = useState("eye-off")

    const onBtVisible = () => {
        if (visible == false) {
            setVisible(true)
            setEye("eye-off")
        } else if (visible == true) {
            setVisible(false)
            setEye("eye")
        }
    }

    const onBtRegis = async () => {

        let respon = await dispatch(onRegister(username, email, password))
        if (respon.success) {
            console.log("CEK REGISTER", respon.success)
            Alert.alert(null, `${username} Register berhasil`,
                [
                    {
                        text: "To Login Page",
                        onPress: () => props.navigation.dispatch(StackActions.replace("Login"))
                    }
                ])
        } else {
            Alert.alert("Belom Lengkap")
        }
        // axios.post(`${API_URL}/dataUser`, {
        //     username: username,
        //     email: email,
        //     password: password,
        //     role:"user",
        //     status:"Active",
        //     cart:[]
        // }).then((res) => {
        //     console.log("register berhasil", res.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
            <Icon
                containerStyle={{ position: "absolute" }}
                raised
                name='arrow-left'
                type='font-awesome'
                color='#2d3436'
                size={15}
                onPress={() => props.navigation.goBack()} />
            <StatusBar backgroundColor={"white"} barStyle='dark-content' />
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../assets/register_asset.png')}
                    style={{ height: hp(35) }}
                />
                <Text h2 style={{ color: "#1b1464" }}>Register</Text>
                <View style={{ marginVertical: hp(3) }}>
                    <Input placeholder="Input Username"
                        onChangeText={(val) => setUsername(val)}
                        leftIcon={
                            <Icon name="user" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Input Email"
                        onChangeText={(val) => setEmail(val)}
                        leftIcon={
                            <Icon name="mail" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Input Password"
                        secureTextEntry={visible}

                        leftIcon={
                            <Icon name="lock" type="feather" color="#bdc3c7" />
                        }
                        rightIcon={
                            <Icon name={eye} type="feather" color="#bdc3c7"
                                onPress={onBtVisible}
                            />
                        }
                    />
                    <View style={{ marginTop: hp(2), marginBottom: hp(2) }}>
                        <Text style={{ textAlign: "center" }}>
                            By Signing up, you're agree to our
                            <Text style={{ color: "#00a8ff" }}> Terms & Condition</Text>and
                            <Text style={{ color: "#00a8ff" }}> Privacy Policy</Text>
                        </Text>
                    </View>
                    <Button
                        title="Register"
                        containerStyle={{ borderRadius: 10 }}
                        buttonStyle={{ backgroundColor: "#00a8ff" }}
                        onPress={onBtRegis}
                    />
                    <View style={{ marginTop: hp(2), marginBottom: hp(2) }}>
                        <Text style={{ textAlign: "center" }}>
                            Joined us before?
                            <Text style={{ fontWeight: "bold", color: "#00a8ff" }}>Register</Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterPage;