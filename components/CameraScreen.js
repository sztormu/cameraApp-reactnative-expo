import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import CircleButton from './CircleButton';
import { BackHandler } from "react-native"
import * as MediaLibrary from "expo-media-library";

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
        console.log(this.props.navigation.state.params.refresh)
    }
    static navigationOptions = {
        // header: null,
        title: "Kamera",
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
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });

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
    cameraType = async () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }
    cameraTakePicture = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
            //alert(JSON.stringify(asset, null, 4))
            this.props.navigation.state.params.refresh()
        }
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1, flexDirection: "row", marginTop: 500, justifyContent: "center" }}>
                            <CircleButton src='redo' onPress={this.cameraType}></CircleButton>
                            <CircleButton src='add' onPress={this.cameraTakePicture}></CircleButton>
                            <CircleButton src='build'></CircleButton>
                        </View>
                    </Camera>
                </View>
            );
        }
    }

}

export default CameraScreen;
