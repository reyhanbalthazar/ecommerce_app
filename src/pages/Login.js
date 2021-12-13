import axios from 'axios';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, View } from 'react-native';
import { Button, Icon, Image, Input, SocialIcon, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { API_URL } from '../../helper';

const LoginPage = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [visible, setVisible] = useState(true)
    const [eye, setEye] = useState("eye-off")

    const onBtLogin = () => {
        axios.get(`${API_URL}/dataUser?username=${username}&password=${password}`)
            .then((res) => {
                console.log("Login Success", res.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const onBtVisible = () => {
        if (visible == false) {
            setVisible(true)
            setEye("eye-off")
        } else if(visible == true) {
            setVisible(false)
            setEye("eye")
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
            <StatusBar backgroundColor={"white"} barStyle='dark-content' />
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../assets/login_asset.png')}
                    style={{ height: hp(35) }}
                />
                <Text h2 style={{ color: "#1b1464" }}>Login</Text>
                <View style={{ marginVertical: hp(3) }}>
                    <Input placeholder="Input Username"
                        onChangeText={(val) => setUsername(val)}
                        leftIcon={
                            <Icon name="user" type="feather" color="#bdc3c7" />
                        }
                    />
                        <Input placeholder="Input Password"
                            secureTextEntry={visible}
                            onChangeText={(val) => setPassword(val)}
                            leftIcon={
                                <Icon name="lock" type="feather" color="#bdc3c7" />
                            }
                            rightIcon={
                                <Icon name={eye} type="feather" color="#bdc3c7" 
                                onPress={onBtVisible}
                                />
                            }
                        />
                </View>
                <Button
                    title="Login"
                    containerStyle={{ borderRadius: 10 }}
                    buttonStyle={{ backgroundColor: "#00a8ff" }}
                    onPress={onBtLogin}
                />
                <Text style={{ textAlign: "center", color: "gray", marginVertical: hp(3) }}>OR</Text>
                <Button
                    title="Login With Google"
                    containerStyle={{ borderRadius: 10 }}
                    titleStyle={{ color: "black" }}
                    icon={<SocialIcon type="google" iconSize={10} raised={false} />}
                    buttonStyle={{ backgroundColor: "#ecf0f1" }}
                />
                <View style={{ marginTop: hp(2), marginBottom: hp(2) }}>
                    <Text style={{ textAlign: "center" }}>
                        No have account ?
                        <Text style={{ fontWeight: "bold", color: "#00a8ff" }}>Register</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginPage;