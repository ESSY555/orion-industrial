import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router, type Href } from 'expo-router';

export default function MenuBar() {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    if (isKeyboardVisible) return null;

    return (
        <View style={[tw`items-center`, { position: 'absolute', left: 0, right: 0, bottom: 18, zIndex: 1000 }]}> 
            <View style={[tw`flex-row items-center justify-between px-4 py-3 rounded-2xl`, { width: '90%', backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 6 }]}> 
                <Button icon="home" label="Home" onPress={() => router.push('/dashboard' as Href)} />
                <Button icon="qr-code" label="Scan" onPress={() => router.push('/modal' as Href)} />
                <Button icon="list" label="Task" onPress={() => router.push('/supervisor-flow/task' as Href)} />
            </View>
        </View>
    );
}

function Button({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) {
    return (
        <TouchableOpacity accessibilityRole="button" onPress={onPress} style={tw`items-center`}> 
            <View style={[tw`w-10 h-10 rounded-full items-center justify-center`, { backgroundColor: '#F3F4F6' }]}> 
                <Ionicons name={icon} size={18} color="#3A3A3A" />
            </View>
            <Text style={[tw`text-gray-700 mt-1`, { fontSize: 11 }]}>{label}</Text>
        </TouchableOpacity>
    );
}


