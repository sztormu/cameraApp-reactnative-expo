import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MyButton from './MyButton';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            fontloaded: false
        };
    }
    static navigationOptions = {
        header: null,
        title: "",

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topview}>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            marginTop: 20,
                            fontSize: 60,
                            textAlign: "center"
                        }}>Camera App</Text>
                        <Text style={{
                            marginTop: 20,
                            textAlign: "center",
                        }}>show gallery pictures</Text>
                        <Text style={{
                            textAlign: "center",
                        }}>take picture from camera</Text>
                        <Text style={{
                            textAlign: "center",
                        }}>save photo to device</Text>
                        <Text style={{
                            textAlign: "center",
                        }}>delete photo from device</Text>
                    </View>
                </View>
                <View style={styles.bottomview}>
                    <MyButton title="START" onPress={() => this.props.navigation.navigate("s2", {})}></MyButton>
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
        backgroundColor: "#E81F63",
        justifyContent: "center",
    },
    bottomview: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 150
    }
});

export default Main;
