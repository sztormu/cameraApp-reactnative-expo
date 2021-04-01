import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import MyButton from './MyButton';
import { BackHandler } from "react-native"

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log(this.props.navigation.state.params.id)
        console.log(this.props.navigation.state.params.uri)
        console.log(this.props.navigation.state.params.refresh)
    }
    static navigationOptions = {
        // header: null,
        title: "Wybrane zdjęcie",
        headerStyle: {
            backgroundColor: "#E81F63",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    componentWillMount() {
        this.componentDidMount()
    }
    componentDidMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress() {
        console.log("handluje")
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
        return true;
    }
    remove = async () => {
        var del = []
        del.push(this.props.navigation.state.params.id)
        console.log(del)
        await MediaLibrary.deleteAssetsAsync(del);
        // alert("delete")
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
        return true;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    resizeMode={'cover'}
                    style={{ flex: 2, width: "100%", height: "100%" }}
                    source={{ uri: this.props.navigation.state.params.uri }}
                />
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <MyButton title="REMOVE" onPress={this.remove}></MyButton>
                </View>
            </View>

        );
    }
}

export default BigPhoto;
