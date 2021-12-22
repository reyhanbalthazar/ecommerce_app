import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Avatar, Icon, ListItem, Overlay, Text, Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import { updateUserData, updateUserPhoto } from "../actions"

const Account = (props) => {

    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [editable, setEditable] = useState(true)

    const { iduser, username, email, password, role, status, photo } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            email: state.userReducer.email,
            password: state.userReducer.password,
            role: state.userReducer.role,
            status: state.userReducer.status,
            photo: state.userReducer.photo
        }
    })

    const [data, setData] = useState({
        username,
        email,
        password
    })

    const onBtImage = async (type) => {
        try {
            let image
            if (type == "gallery") {
                image = await ImageCropPicker.openPicker({
                    width: wp(40),
                    height: wp(40),
                    cropping: true,
                    mediaType: 'photo'
                })
            } else if (type == "camera") {
                image = await ImageCropPicker.openCamera({
                    width: wp(40),
                    height: wp(40),
                    cropping: true,
                    mediaType: 'photo'
                })
            }

            if (image.path) {
                let res = await dispatch(updateUserPhoto(image.path, iduser))
                if (res.success) {
                    setVisible(!visible)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onBtEditable = () => {
        setEditable(!editable)
        setData({
            ...data, username, email, password
        })
    }

    const onBtSave = async () => {
        try {
            let res = await dispatch(updateUserData(data, iduser))
            Alert.alert("Ubah Berhasil ✅")
            console.log("onBtSave", res.success)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                        <ListItem containerStyle={{ width: wp(65) }} onPress={() => onBtImage("gallery")}>
                            <Icon name="folder" type="feather" />
                            <ListItem.Content>
                                <ListItem.Title>Select From Gallery</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                        <ListItem containerStyle={{ width: wp(65) }} onPress={() => onBtImage("camera")}>
                            <Icon name="camera" type="feather" />
                            <ListItem.Content>
                                <ListItem.Title>Open Camera</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </Overlay>
                    <Avatar
                        containerStyle={{ alignSelf: "center", marginTop: 16 }}
                        rounded
                        size="xlarge"
                        source={{ uri: photo }}
                    >
                        <Avatar.Accessory
                            name="edit"
                            type="feather"
                            size={40}
                            iconStyle={{ fontSize: 20 }}
                            onPress={() => setVisible(!visible)}
                        />
                    </Avatar>
                    <View style={{ paddingHorizontal: 20, marginTop: hp(10) }}>
                        <Input
                            label="Username"
                            value={data.username}
                            onChangeText={(val) => setData({ ...data, username: val })}
                            disabled={editable}
                        />
                        <Input
                            label="Email"
                            defaultValue={data.email}
                            onChangeText={(val) => setData({ ...data, email: val })}
                            disabled={editable}
                        />
                        <Input
                            label="Password"
                            defaultValue={data.password}
                            secureTextEntry={true}
                            onChangeText={(val) => setData({ ...data, password: val })}
                            disabled={editable}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Button
                                title={editable ? "Edit" : "Cancel"}
                                containerStyle={{ borderRadius: 10, width: 150 }}
                                buttonStyle={{ backgroundColor: "#00a8ff" }}
                                onPress={onBtEditable}
                            />
                            <Button
                                title="Save"
                                containerStyle={{ borderRadius: 10, width: 150 }}
                                buttonStyle={{ backgroundColor: "#00a8ff" }}
                                onPress={onBtSave}
                                disabled={editable}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default Account