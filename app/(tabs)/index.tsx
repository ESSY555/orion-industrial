import React from 'react';
import { View } from 'react-native';
import Dashboard from './../dashboard';
import LoginScreen from './../login';



export default function Home() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <LoginScreen/>
        </View>
    );
}

//
