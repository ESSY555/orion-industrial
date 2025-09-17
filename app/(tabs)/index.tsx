import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import CleanerFlow from '@/app/cleaner-flow/index';



export default function Home() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <CleanerFlow />
        </View>
        // <View>
        //     <Redirect href="/login" />
        // </View>
    );
}

const styles = StyleSheet.create({
    // Add any custom styles here
});
