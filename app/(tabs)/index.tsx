import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Dashboard from './../dashboard';


export default function Home() {
    return (
        <View>
            <Dashboard />
        </View>
    );
}

const styles = StyleSheet.create({
    // Add any custom styles here
});
