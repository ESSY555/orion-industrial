import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function LevelsScreen() {
    const navigation = useNavigation<any>();
    const params = useLocalSearchParams<{
        level?: string;
        title?: string;
        modules?: string;
        time?: string;
        progress?: string;
        locked?: string;
    }>();

    useLayoutEffect(() => {
        // @ts-ignore
        navigation.setOptions?.({ headerShown: false });
    }, [navigation]);

    const levelNum = params.level ? Number(params.level) : undefined;
    const isLocked = params.locked === 'true';

    const progress = params.progress ? Number(params.progress) : undefined;
    const [activeTab, setActiveTab] = useState<'about' | 'modules' | 'download'>('modules');
    const activeColor = '#8B4CE8';

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton]}>
                    <Ionicons name="chevron-back" size={18} color="#111827" />
                </TouchableOpacity>
                <Text style={[tw`text-black font-bold text-[18px]`]}>Level {levelNum}</Text>
                <TouchableOpacity style={[styles.iconButton]}>
                    <Ionicons name="time-outline" size={18} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                {/* Hero Card */}
                <View style={[tw`px-4 mt-2`]}>
                    <View style={styles.heroCard}>
                        <View style={[tw`flex-row items-center justify-between`]}>
                            <Text style={[tw`text-black font-bold text-[20px]`]}>Level {levelNum}</Text>
                            <View style={styles.progressPill}>
                                {isLocked ? (
                                    <View style={[tw`flex-row items-center`]}>
                                        <Ionicons name="lock-closed" size={12} color="#111827" />
                                        <Text style={[tw`text-[10px] ml-1 text-black`]}>{'Locked'}</Text>
                                    </View>
                                ) : (
                                    <Text style={[tw`text-[10px] text-black`]}>{progress ?? 0}% Complete</Text>
                                )}
                            </View>
                        </View>
                        <View style={[tw`mt-1 flex-row items-center`]}>
                            <Ionicons name="ribbon" size={12} color="#F59E0B" />
                            <Text style={[tw`text-[12px] text-[#6B7280] ml-2`]}>{params.title}</Text>
                        </View>
                        <View style={[tw`mt-3 flex-row items-center`]}>
                            <View style={[tw`flex-row items-center`]}>
                                <Ionicons name="book" size={12} color="#6B7280" />
                                <Text style={styles.metaText}>{params.modules}</Text>
                            </View>
                            <View style={styles.metaDot} />
                            <View style={[tw`flex-row items-center`]}>
                                <Ionicons name="time-outline" size={12} color="#6B7280" />
                                <Text style={styles.metaText}>{params.time}</Text>
                            </View>
                        </View>
                        {!isLocked && typeof progress === 'number' && progress < 100 && (
                            <View style={styles.progressTrack}> 
                                <View style={[styles.progressFill, { width: `${progress}%` }]} />
                                <View style={styles.progressEndCap} />
                            </View>
                        )}
                        <Image source={require('../../assets/images/experiment-one.png')} style={styles.bgFlask} resizeMode="contain" />
                    </View>
                </View>

                {/* Tabs */}
                <View style={[tw`px-4 mt-3`]}>
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[styles.tabItem, activeTab === 'about' && { backgroundColor: activeColor }]}
                            onPress={() => setActiveTab('about')}
                        >
                            <Text style={activeTab === 'about' ? styles.tabTextActive : styles.tabTextMuted}>About Level</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, activeTab === 'modules' && { backgroundColor: activeColor }]}
                            onPress={() => setActiveTab('modules')}
                        >
                            <Text style={activeTab === 'modules' ? styles.tabTextActive : styles.tabTextMuted}>Modules</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, activeTab === 'download' && { backgroundColor: activeColor }]}
                            onPress={() => setActiveTab('download')}
                        >
                            <Ionicons name="download-outline" size={14} color={activeTab === 'download' ? '#FFFFFF' : '#6B7280'} />
                            <Text style={activeTab === 'download' ? [styles.tabTextActive, { marginLeft: 8 }] : [styles.tabTextMuted, { marginLeft: 8 }]}>
                                Download All
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Module List */}
                <View style={[tw`px-4 mt-2`]}>
                    <ModuleRow style={[tw`mb-2`]} index={1} title="Module 1" status="done" />
                    <ModuleRow index={2} title="Module 2" status="done" />
                    <ModuleRow index={3} title="Module 3" status="continue" />
                    <ModuleRow index={4} title="Module 4" status="start" />
                    <ModuleRow index={5} title="Module 5" status="start" />
                    <ModuleRow index={6} title="Module 6" status="start" />
                    <ModuleRow index={7} title="Final Assessment" status="start-grey" />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroCard: {
        backgroundColor: 'rgba(239,234,249,0.6)',
        borderRadius: 18,
        padding: 16,
        overflow: 'hidden',
    },
    progressPill: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    metaText: {
        color: '#6B7280',
        fontSize: 12,
        marginLeft: 6,
    },
    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 10,
    },
    progressTrack: {
        height: 8,
        backgroundColor: '#EDE7FF',
        borderRadius: 6,
        marginTop: 12,
        position: 'relative',
    },
    progressFill: {
        height: 8,
        backgroundColor: '#E565B8',
        borderRadius: 6,
    },
    progressEndCap: {
        position: 'absolute',
        right: 8,
        top: -6,
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
    },
    bgFlask: {
        position: 'absolute',
        width: 160,
        height: 130,
        right: -10,
        top: -8,
        tintColor: '#EDE7FF',
        opacity: 0.6,
    },
    tabs: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabTextMuted: { color: '#6B7280', fontSize: 12 },
    tabTextActive: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
});

function StatusBadge({ status }: { status: 'done' | 'continue' | 'start' | 'start-grey' }) {
    if (status === 'done') {
        return (
            <View style={{ backgroundColor: '#DCFCE7', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10 }}>
                <Text style={{ color: '#22C55E', fontWeight: '700', fontSize: 12 }}>Done</Text>
            </View>
        );
    }
    if (status === 'continue') {
        return (
            <View style={{ backgroundColor: '#E5F0FF', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10 }}>
                <Text style={{ color: '#3B82F6', fontWeight: '700', fontSize: 12 }}>Continue</Text>
            </View>
        );
    }
    const bg = status === 'start-grey' ? '#E5E7EB' : '#7C5CFF';
    const color = status === 'start-grey' ? '#374151' : '#FFFFFF';
    return (
        <View style={{ backgroundColor: bg, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color, fontWeight: '700', fontSize: 12, marginRight: 6 }}>Start</Text>
            <Ionicons name="arrow-forward" size={14} color={color} />
        </View>
    );
}

function ModuleRow({ index, title, status, style }: { index: number; title: string; status: 'done' | 'continue' | 'start' | 'start-grey'; style?: ViewStyle | ViewStyle[] }) {
    return (
        <View style={[{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, style as any]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Text style={{ color: '#111827', fontWeight: '700' }}>{index}</Text>
                </View>
                <Text style={{ color: '#111827' }}>{title}</Text>
            </View>
            <StatusBadge status={status} />
        </View>
    );
}


