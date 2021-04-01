import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{
                marginLeft: 10,
                marginTop: 15,
                height: 50,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#E81F63"
            }}>
                <Text style={{ color: "white" }}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

export default MyButton;
