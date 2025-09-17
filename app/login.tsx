import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function LoginScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const primaryColor = Colors[colorScheme ?? 'light'].tint;
    const [baseUrl, setBaseUrl] = useState('https://api.example.com');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const canSubmit = baseUrl.trim().length > 0 && username.trim().length > 0 && password.length > 0;

    const onLogin = () => {
        // TODO: Add API call with baseUrl/credentials when backend is ready
        router.replace({ pathname: '/dashboard', params: { username } });
    };

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`, { backgroundColor: '#F7F7F7' }]} contentContainerStyle={tw`flex-1 justify-center`}>
                <View style={[tw`px-4 pt-14 pb-6`]}>
                    <View style={[tw`items-center mb-6`]}>
                        {/* <Image source={require('../assets/images/icon.png')} style={{ width: 64, height: 64, borderRadius: 12 }} /> */}
                        <Text style={[tw`text-black font-bold mt-3 text-[20px]`]}>Welcome Back</Text>
                        <Text style={[tw`text-gray-600 mt-1 text-[12px]`]}>Sign in to continue</Text>
                    </View>

                    <View style={[styles.card]}>
                        <View style={[styles.inputGroup]}>
                            <Text style={[styles.label]}>Base URL</Text>
                            <TextInput
                                placeholder="https://api.example.com"
                                placeholderTextColor="#9CA3AF"
                                value={baseUrl}
                                onChangeText={setBaseUrl}
                                autoCapitalize="none"
                                style={[styles.input]}
                            />
                        </View>

                        <View style={[styles.inputGroup]}>
                            <Text style={[styles.label]}>Username</Text>
                            <TextInput
                                placeholder="Enter username"
                                placeholderTextColor="#9CA3AF"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                style={[styles.input]}
                            />
                        </View>

                        <View style={[styles.inputGroup]}>
                            <Text style={[styles.label]}>Password</Text>
                            <View style={[styles.passwordRow]}>
                                <TextInput
                                    placeholder="Enter password"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    style={[styles.passwordInput]}
                                />
                                <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={[styles.toggleBtn]}>
                                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} color="#2D1B3D" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={onLogin}
                            disabled={!canSubmit}
                            style={[styles.loginBtn, { backgroundColor: primaryColor }, !canSubmit && { opacity: 0.5 }]}
                        >
                            <Text style={[tw`text-white bg-blue-500 p-4 rounded-2xl font-bold text-center`]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    inputGroup: {
        marginBottom: 14,
    },
    label: {
        color: '#3A3A3A',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        color: '#111827',
    },
    passwordRow: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#EFEFEF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 14,
        color: '#111827',
    },
    toggleBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    loginBtn: {
        paddingVertical: 14,
        borderRadius: 14,
        marginTop: 18,
    },
});


