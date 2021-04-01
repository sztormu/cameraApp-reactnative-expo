import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                backgroundColor: '#fff',
                borderRadius: 50,
            }}>
                <Icon name={this.props.src} />
            </TouchableOpacity>
        );
    }
}

export default CircleButton;
