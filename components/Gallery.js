import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import FotoItem from "./FotoItem"
import MyButton from './MyButton';
import { Dimensions } from 'react-native';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from 'react-native';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            numColumns: 4,
            checked: false,
            view: "grid",
            PhotoWidth: Dimensions.get("window").width / 4,
            PhotoHeight: Dimensions.get("window").width / 4,
        };
        this.bigphoto = this.bigphoto.bind(this);
        this.GridList = this.GridList.bind(this);
    }
    static navigationOptions = {
        // header: null,
        title: "Photos",
        headerStyle: {
            backgroundColor: "#E81F63",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    UNSAFE_componentWillMount() {
        this.componentDidMount()
        this.getMedia()

    }
    componentDidMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('no permission to read from gallery')
        }
    }
    getMedia = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 10,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        //console.log(JSON.stringify(obj.assets, null, 4))
        //console.log(obj.assets.length)

        var photos = []
        for (var i = 0; i < obj.assets.length; i++) {
            photos[i] = {
                id: obj.assets[i].id,
                uri: obj.assets[i].uri,
                width: obj.assets[i].width,
                height: obj.assets[i].height,
                todel: false
            }
        }
        //console.log(photos)

        this.setState({ photos: photos })

    }
    removeMedia = async () => {
        var del = []
        //console.log(this.state.photos)
        for (var i = 0; i < this.state.photos.length; i++) {
            if (this.state.photos[i].todel) {
                del.push(this.state.photos[i].id)
            }
        }
        console.log(del)
        await MediaLibrary.deleteAssetsAsync(del);
        // alert("delete")
        this.getMedia()
    }
    bigphoto(l, p, g) {
        this.props.navigation.navigate("s4", { id: l, uri: p, refresh: g })
    }
    GridList() {
        if (this.state.view == "list") {
            this.setState({
                view: "grid",
                numColumns: 4,
                PhotoWidth: Dimensions.get("window").width / 4,
                PhotoHeight: Dimensions.get("window").width / 4,

            })
        }
        else {
            this.setState({
                view: "list",
                numColumns: 1,
                PhotoWidth: Dimensions.get("window").width,
                PhotoHeight: Dimensions.get("window").height / 4,

            })
        }
    }


    render() {
        //onPress={() => this.props.navigation.navigate("s2", {})}
        //onPress={this.removePosition}
        return (
            <View style={styles.container}>
                <View style={styles.topview}>
                    <MyButton title="GRID / LIST" onPress={this.GridList}></MyButton>
                    <MyButton title="OPEN CAMERA" onPress={() => this.props.navigation.navigate("s3", { refresh: this.getMedia })}></MyButton>
                    <MyButton title="REMOVE SELECTED" onPress={this.removeMedia}></MyButton>
                </View>
                <View style={styles.bottomview}>
                    <FlatList
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                        data={this.state.photos}
                        renderItem={({ item }) =>
                            <FotoItem tab={item} refresh={this.getMedia} bigp={this.bigphoto} width={this.state.PhotoWidth} height={this.state.PhotoHeight} />}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topview: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"

    },
    bottomview: {
        flex: 5,

    }
});

export default List;
