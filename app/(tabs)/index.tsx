import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import Dashboard from './../dashboard';



export default function Home() {
    return (
        // <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        //     <Dashboard />
        // </View>
        <View>
            <Redirect href="/login" />
        </View>
    );
}

//
