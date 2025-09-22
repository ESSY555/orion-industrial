import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function TrainingLevels() {
    const navigation = useNavigation<any>();

    useLayoutEffect(() => {
        // @ts-ignore
        navigation.setOptions?.({ headerShown: false });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconButton]}>
                    <Ionicons name="chevron-back" size={18} color="#111827" />
                </TouchableOpacity>
                <Text style={[tw`text-black font-bold text-[18px]`]}>Training Levels</Text>
                <TouchableOpacity style={[styles.iconButton]}>
                    <Ionicons name="options-outline" size={18} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                {/* Search */}
                <View style={[tw`px-4`]}>
                    <View style={styles.searchWrap}>
                        <Ionicons name="search" size={16} color="#9CA3AF" />
                        <TextInput placeholder="Search anything" placeholderTextColor="#9CA3AF" style={styles.searchInput} />
                        <View style={styles.searchCTA}>
                            <Ionicons name="search" size={16} color="#FFFFFF" />
                        </View>
                    </View>
                </View>

                {/* Levels */}
                <View style={[tw`px-4 mt-3`]}>
                    <LevelCard level={1} title="Entry Level (Yellow Badge)" modules="8 Modules" time="1hr 30min" progress={100} tint="#EDE7FF" bg="#EFEAF9" />
                    <LevelCard level={2} title="Basic Skills (Orange Badge)" modules="8 Modules" time="1hr 30min" progress={100} tint="#FBD1E6" bg="#F5D3E4" />
                    <LevelCard level={3} title="Quality Assurance (Green Badge)" modules="8 Modules" time="1hr 30min" progress={50} tint="#EDE7FF" bg="#EFEAF9" />
                    <LevelCard level={4} title="Advanced Sanitation (Blue Badge)" modules="8 Modules" time="1hr 30min" locked tint="#E5E7EB" bg="#E9E9EE" />
                </View>
            </ScrollView>
        </View>
    );
}

type LevelCardProps = {
    level: number;
    title: string;
    modules: string;
    time: string;
    progress?: number; // 0-100, if provided shows "x% Complete"
    locked?: boolean;
    tint: string;
    bg: string;
};

function LevelCard({ level, title, modules, time, progress, locked, tint, bg }: LevelCardProps) {
    return (
        <View style={[styles.card, { backgroundColor: bg }]}> 
            <View style={[tw`flex-row items-center justify-between`]}>
                <Text style={[tw`text-black font-bold text-[20px]`]}>Level {level}</Text>
                <View style={styles.progressPill}>
                    {locked ? (
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
                <Text style={[tw`text-[12px] text-[#6B7280] ml-2`]}>{title}</Text>
            </View>

            <View style={[tw`mt-3 flex-row items-center`]}>
                <View style={[tw`flex-row items-center`]}>
                    <Ionicons name="book" size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{modules}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={[tw`flex-row items-center`]}>
                    <Ionicons name="time-outline" size={12} color="#6B7280" />
                    <Text style={styles.metaText}>{time}</Text>
                </View>
            </View>

            {!locked && typeof progress === 'number' && (
                <View style={styles.progressTrack}> 
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
            )}

            <Image source={require('../../../assets/images/experiment-one.png')} style={[styles.bgFlask, { tintColor: tint }]} />
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
    searchWrap: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: '#111827',
    },
    searchCTA: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#6B5DEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 20,
        padding: 16,
        marginTop: 14,
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
        backgroundColor: '#F1E4F2',
        borderRadius: 6,
        marginTop: 16,
    },
    progressFill: {
        height: 8,
        backgroundColor: '#EC4899',
        borderRadius: 6,
    },
    bgFlask: {
        position: 'absolute',
        width: 140,
        height: 120,
        right: -10,
        bottom: -10,
        opacity: 0.6,
    },
});


