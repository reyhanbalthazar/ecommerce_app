import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Icon, ListItem, Overlay, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import {updateUserPhoto} from "../actions"

const Account = (props) => {

    const dispatch = useDispatch()
    // const [gambar, setGambar] = useState("https://i.pinimg.com/474x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg")
    const [visible, setVisible] = useState(false)

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

    const onBtImage = async () => {
        try {
            let image = await ImageCropPicker.openPicker({
                width: wp(40),
                height: wp(40),
                cropping: true,
                mediaType: 'photo'
            })

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

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <ListItem containerStyle={{ width: wp(65) }} onPress={onBtImage}>
                    <Icon name="folder" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Select From Gallery</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={{ width: wp(65) }}>
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
        </View>
    )
}

export default Account