import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function ReviewTaskScreen() {
    const router = useRouter();
    const navigation = useNavigation<any>();
    const params = useLocalSearchParams<{ name?: string }>();
    useLayoutEffect(() => {
        // @ts-ignore setOptions exists on any stack screen
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);

    const person = useMemo(() => ({
        name: params.name || 'Bayo Sydney',
        avatar: require('../../assets/images/man-smile.png'),
    }), [params]);

    const [activeTab, setActiveTab] = useState<'time' | 'evidence'>('time');

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={20} color="#3A3A3A" />
                    </TouchableOpacity>
                    <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>Review Work Order</Text>
                    <View style={tw`flex-row items-center`}>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center mr-2`, shadow()]}> 
                            <Ionicons name="sparkles" size={16} color="#7F56D9" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`w-9 h-9 rounded-full bg-white items-center justify-center`, shadow()]}> 
                            <Ionicons name="ellipsis-vertical" size={16} color="#3A3A3A" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Avatar */}
                <View style={[tw`items-center mt-1`]}>
                    <View style={[tw`w-28 h-28 rounded-full items-center justify-center`, { backgroundColor: '#F0E9FB', overflow: 'hidden' }]}> 
                        <Image source={person.avatar} style={[tw`w-28 h-28`]} />
                    </View>
                    <View style={[tw`w-8 h-8 rounded-full items-center justify-center`, { backgroundColor: '#7F56D9', position: 'absolute', left: '56%', top: 6 }]}> 
                        <Ionicons name="trending-up" size={16} color="#FFFFFF" />
                    </View>
                </View>

                {/* Summary Card */}
                <View style={[tw`px-4 mt-3`]}>
                    <View style={[tw`rounded-2xl p-5`, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                        <Text style={[tw`text-black mb-3`, { fontWeight: '800' }]}>{person.name}</Text>
                        {[
                            ['Cleaning Status', 'Cleaned'],
                            ['Start Time', '12:00 PM'],
                            ['End Time', '16:30 PM'],
                            ['Assets Cleaned', ''],
                            ['Frequency', 'Daily'],
                            ['Duration', '1'],
                        ].map((row, i) => (
                            <View key={i} style={tw`flex-row items-center justify-between mb-2`}>
                                <Text style={{ color: '#6B7280', fontSize: 12 }}>{row[0]}</Text>
                                {row[0] === 'Cleaning Status' ? (
                                    <Text style={{ color: '#22C55E', fontWeight: '700', fontSize: 12 }}>Cleaned</Text>
                                ) : row[0] === 'Assets Cleaned' ? (
                                    <View style={tw`flex-row items-center`}>
                                        <View style={tw`flex-row items-center mr-4`}>
                                            <Ionicons name="cube-outline" size={13} color="#9CA3AF" />
                                            <Text style={{ color: '#374151', fontSize: 12, marginLeft: 4 }}>Shelf</Text>
                                        </View>
                                        <View style={tw`flex-row items-center`}>
                                            <Ionicons name="cube-outline" size={13} color="#9CA3AF" />
                                            <Text style={{ color: '#374151', fontSize: 12, marginLeft: 4 }}>Cabinet</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <Text style={{ color: '#111827', fontSize: 12 }}>{row[1]}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Tabs */}
                <View style={[tw`px-4 mt-5 flex-row items-center justify-center`]}>
                    <View style={[tw`bg-white rounded-2xl flex-row`, shadow()]}> 
                        <TouchableOpacity onPress={() => setActiveTab('time')} style={[tw`px-4 py-3 rounded-2xl`, { backgroundColor: activeTab === 'time' ? '#7F56D9' : 'transparent', margin: 6 }]}> 
                            <Text style={{ color: activeTab === 'time' ? '#FFFFFF' : '#6B7280', fontWeight: '700' }}>Time Tracking</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('evidence')} style={[tw`px-4 py-3 rounded-2xl`, { backgroundColor: activeTab === 'evidence' ? '#7F56D9' : 'transparent', margin: 6 }]}> 
                            <Text style={{ color: activeTab === 'evidence' ? '#FFFFFF' : '#6B7280', fontWeight: '700' }}>Evidence</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Time Tracking Card */}
                {activeTab === 'time' && (
                    <View style={[tw`px-4 mt-4`]}>
                        <View style={[tw`rounded-2xl p-4`, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                            {[
                                ['Release to Sanitation', '10:00 AM'],
                                ['Ready for QA', '15:30 PM'],
                                ['QA Start Pre-op', '15:40 PM'],
                                ['QA Finish Pre-op', '16:15 PM'],
                                ['Released to Production', '16:30 PM'],
                            ].map((row, i) => (
                                <View key={i} style={[tw`flex-row items-center justify-between py-3`]}>
                                    <Text style={{ color: '#6B7280', fontSize: 14 }}>{row[0]}</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <Text style={{ color: '#111827', fontSize: 14, marginRight: 10 }}>{row[1]}</Text>
                                        <View style={[{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }, shadowLight()]}> 
                                            <Ionicons name="arrow-up" size={14} color="#7F56D9" style={{ transform: [{ rotate: '45deg' }] }} />
                                        </View>
                                    </View>
                                </View>
                            ))}
                            <View style={{ height: 1, borderBottomWidth: 1, borderStyle: 'dashed', borderColor: '#E5E7EB', marginVertical: 10 }} />
                            <View style={tw`flex-row items-center justify-between mt-1`}>
                                <Text style={{ color: '#6B7280' }}>Total Duration</Text>
                                <Text style={{ color: '#22C55E', fontWeight: '800', fontSize: 14 }}>4 hrs 27 mins</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Evidence stub (for symmetry) */}
                {activeTab === 'evidence' && (
                    <View style={[tw`px-4 mt-4`]}>
                        <View style={[tw`rounded-2xl p-4`, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                            <Text style={{ color: '#6B7280' }}>No evidence items yet.</Text>
                        </View>
                    </View>
                )}

                {/* CTA */}
                <View style={[tw`px-4 mt-6 mb-26`]}>
                    <TouchableOpacity accessibilityRole="button" activeOpacity={0.9} style={[tw`rounded-2xl px-4 py-4 items-center justify-center flex-row`, { backgroundColor: '#7F56D9' }, shadow()]}> 
                        <Text style={[tw`text-white mr-2`, { fontWeight: '800' }]}>Next Step</Text>
                        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

function shadow() {
    return { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 } as const;
}

function shadowLight() {
    return { shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 1.5 } as const;
}


