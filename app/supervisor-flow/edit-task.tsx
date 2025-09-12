import React, { useLayoutEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function EditTaskDetailScreen() {
    const router = useRouter();
    const navigation = useNavigation<any>();
    const params = useLocalSearchParams<{ id?: string; name?: string }>();

    useLayoutEffect(() => {
        // @ts-ignore setOptions exists on any stack screen
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);

    const person = useMemo(() => ({
        name: params.name || 'Bayo Sydney',
        avatar: require('../../assets/images/man-smile.png'),
        status: 'Cleaned',
        assets: ['Shelf', 'Cabinet'],
        frequency: 'Daily',
        duration: '1',
        start: '12:00 PM',
        end: '16:30 PM',
    }), [params]);

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

                {/* Avatar and summary card */}
                <View style={[tw`px-4 mt-2`]}>
                    <View style={[tw`items-center -mb-5`]}>
                        <View style={[tw`w-28 h-28 rounded-full items-center justify-center`, { backgroundColor: '#F0E9FB', overflow: 'hidden' }]}> 
                            <Image source={require('../../assets/images/smiley-african-woman-with-golden-earrings.png')} style={[tw`w-28 h-28`]} />
                        </View>
                        <View style={[tw`w-8 h-8 rounded-full items-center justify-center`, { backgroundColor: '#7F56D9', position: 'absolute', right: '60%', top: 8 }]}> 
                            {/* <Image source={require('../../assets/images/Vector.png')} style={[tw`w-6 h-6`]} /> */}
                            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFFFFF" />
                        </View>
                    </View>

                    <View style={[tw`rounded-2xl p-5 opacity-80 `, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                        <View style={tw`flex-row items-center justify-between mb-2`}>
                            <Text style={[tw`text-black`, { fontWeight: '800' }]}>{person.name}</Text>
                            <Text style={{ color: '#2ECC71', fontWeight: '800', fontSize: 12 }}>{person.status}</Text>
                        </View>
                        {[
                            ['Cleaning Status', person.status],
                            ['Start Time', person.start],
                            ['End Time', person.end],
                        ].map((row, i) => (
                            <Row key={i} label={row[0]} value={row[1]} />
                        ))}

                        {/* Assets cleaned */}
                        <View style={tw`flex-row items-center justify-between mt-2`}>
                            <Text style={mutedLabel()}>Assets Cleaned</Text>
                            <View style={tw`flex-row items-center`}>
                                {person.assets.map((a, i) => (
                                    <View key={i} style={tw`flex-row items-center ml-3`}>
                                        <Ionicons name="cube-outline" size={13} color="#9CA3AF" />
                                        <Text style={Object.assign({}, tw`text-gray-700 ml-1`, { fontSize: 12 })}>{a}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <Row label="Frequency" value={person.frequency} />
                        <Row label="Duration" value={person.duration} />
                    </View>
                </View>

                {/* Time Tracking */}
                <View style={[tw`px-4 mt-4`]}>
                    <View style={[tw`rounded-2xl p-4`, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                        <Text style={{ color: '#261A3B', fontWeight: '800', fontSize: 18, marginBottom: 12 }}>Time Tracking</Text>
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

                {/* Evidence */}
                <View style={[tw`px-4 mt-4`]}>
                    <View style={[tw`rounded-2xl p-3`, { backgroundColor: '#FFFFFF' }, shadow()]}> 
                        <View style={tw`flex-row items-center justify-between mb-2`}>
                            <Text style={[tw`text-black`, { fontWeight: '800' }]}>Evidence</Text>
                            <View style={tw`flex-row items-center`}>
                                <Text style={tw`text-gray-600 mr-1`}>All Assets</Text>
                                <Ionicons name="chevron-down" size={14} color="#6B7280" />
                            </View>
                        </View>

                        {/* Documentation */}
                        <Text style={[tw`text-gray-500 mb-2`, { fontSize: 12 }]}>Documentation</Text>
                        <View style={[tw`rounded-2xl p-3 mb-3`, { backgroundColor: '#FFFFFF' }, shadowLight()]}> 
                            <Text style={[tw`text-gray-700`, { fontSize: 12 }]}>
                                Foamed and Scrubbed Affected Area with SK-250. Applied Sterile Solution. SFT treatment completed on all drains.
                            </Text>
                        </View>

                        {/* Photo Evidence */}
                        <Text style={[tw`text-gray-500 mb-2`, { fontSize: 12 }]}>Photo Evidence</Text>
                        <View style={tw`flex-row`}>
                            <View style={[tw`flex-1 rounded-2xl overflow-hidden mr-2`, shadowLight()]}> 
                                <Image source={require('../../assets/images/people-pro3.png')} style={[tw`w-full h-26`]} />
                            </View>
                            <View style={[tw`flex-1 rounded-2xl overflow-hidden`, shadowLight()]}> 
                                <Image source={require('../../assets/images/areas-cleaned.png')} style={[tw`w-full h-26`]} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bottom CTA */}
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

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View style={tw`flex-row items-center justify-between mt-1`}>
            <Text style={Object.assign({}, mutedLabel())}>{label}</Text>
            <Text style={[tw`text-gray-800`, { fontSize: 12 }]}>{value}</Text>
        </View>
    );
}

function mutedLabel() {
    return Object.assign({}, tw`text-gray-500`, { fontSize: 12 });
}

function shadow() {
    return { shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 2 } as const;
}

function shadowLight() {
    return { shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 1.5 } as const;
}


