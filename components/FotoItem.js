import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import MyButton from './MyButton';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import { Icon } from 'react-native-elements'
class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
        this.elo = this.elo.bind(this);
    }
    elo() {
        this.props.bigp(this.props.tab.id, this.props.tab.uri, this.props.refresh)
    }
    checked = () => {
        this.setState({
            checked: !this.state.checked
        })
        this.props.tab.todel = !this.state.checked

    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={this.checked} onLongPress={this.elo} >
                    <ImageBackground style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                        source={{ uri: this.props.tab.uri }}>
                        <CheckBox checked={this.state.checked} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'></CheckBox>

                    </ImageBackground>

                </TouchableOpacity>


            </View>
        );
    }
}

export default FotoItem;
