import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StatusBar, View } from 'react-native';
import { Button, Icon, Image, Input, SocialIcon, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { API_URL } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../actions'
import { StackActions } from '@react-navigation/native';

const LoginPage = (props) => {
    // useDispatch 
    const dispatch = useDispatch();

    // useSelector sebagai pengganti mapToProps pada class component
    const { iduser, usernameReducer } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            usernameReducer: state.userReducer.username
        }
    })

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [visible, setVisible] = useState(true)
    const [eye, setEye] = useState("eye-off")

    useEffect(()=>{
        if(iduser){
            props.navigation.dispatch(StackActions.replace("TabNav"))
        }
    })

    const onBtLogin = async () => {

        let respon = await dispatch(onLogin(username, password))
        console.log("test", respon.success)

        if (respon.success > 0) {
            props.navigation.dispatch(StackActions.replace("TabNav"))
        } else {
            Alert.alert("This account is not exist")
        }
    }

    const onBtVisible = () => {
        if (visible == false) {
            setVisible(true)
            setEye("eye-off")
        } else if (visible == true) {
            setVisible(false)
            setEye("eye")
        }
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
                onPress={() => console.log('hello')} />
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
                        <Text style={{ fontWeight: "bold", color: "#00a8ff" }}
                            onPress={() => props.navigation.navigate("Register")}
                        >
                            Register
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginPage;