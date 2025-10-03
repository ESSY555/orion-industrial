import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TouchableOpacity, Image, ScrollView, Animated, Easing, RefreshControl, Alert } from 'react-native';
import { Text, View } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import UiButton from '@/components/UiButton';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    WorkOrders: undefined;
};

export default function dashboard() {
    const { username } = useLocalSearchParams<{ username?: string }>();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showAll, setShowAll] = useState(false);
    const [refreshTick, setRefreshTick] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setRefreshTick((t) => t + 1);
        // simulate brief refresh feedback; remove timeout when wiring to real fetch
        setTimeout(() => setRefreshing(false), 400);
    };

    // Ensure header is hidden even if navigator defaults change
    useLayoutEffect(() => {
        // @ts-ignore setOptions exists on any stack screen
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);

    // Example effect to refetch or re-run any calculations when refreshed
    useEffect(() => {
        // Place data refetch logic here.
        // For now this just triggers re-render through state change.
    }, [refreshTick]);

    const DRAFT_KEY = 'sanitrack:reportDraftRoute';
    const [draftClearedAt, setDraftClearedAt] = useState<number | null>(null);

    const handleResumeDraft = async () => {
        try {
            const saved = (await AsyncStorage.getItem(DRAFT_KEY)) || '';
            const normalized = saved.trim().toLowerCase();
            // If no valid draft (or recently cleared), start fresh
            if (!normalized || normalized === 'null' || normalized === 'undefined' || draftClearedAt) {
                router.push('/cleaner-flow' as any);
                return;
            }
            router.push(saved as any);
        } catch (e) {
            router.push('/cleaner-flow' as any);
        }
    };

    const handleClearDraft = async () => {
        try {
            // Remove and also overwrite to an empty string to avoid stale cached reads
            await AsyncStorage.removeItem(DRAFT_KEY);
            await AsyncStorage.setItem(DRAFT_KEY, '');
            setDraftClearedAt(Date.now());
            Alert.alert('Draft cleared');
        } catch (e) {
            Alert.alert('Could not clear draft');
        }
    };

    const handleStartTask = (taskId: number) => {
        Alert.alert('Start Task', `Starting task #${taskId}`);
        // TODO: navigate to the task detail screen when available
        // router.push('/cleaner-flow/task');
    };

    

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView
                key={`refresh-${refreshTick}`}
                style={[tw`h-full`, { backgroundColor: '#F7F7F7' }]}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#7F56D9" />}
            >
                {/* Header */}

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <View style={[tw`flex-row items-center`]}>
                        <Image source={require('../../assets/images/lady-home.png')} style={{ width: 42, height: 42, borderRadius: 21 }} />
                        <View style={[tw`pl-3`]}>
                            <Text style={[tw`text-black font-bold text-[18px]`]}>
                                Hello {username ? String(username) : 'Emmanuella'}
                            </Text>
                            <Text style={[tw`text-gray-600 text-[13px]`]}>Pandas Factory</Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row items-center`]}>
                        <TouchableOpacity style={[tw`mr-3 bg-white rounded-full shadow-lg p-2`]} onPress={handleRefresh}>
                            <Image source={require('../../assets/images/refresh.png')} style={[tw`w-6 h-6 p-2 bg-white rounded-full`]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`bg-white rounded-full shadow-lg p-2`]}>
                            <Image source={require('../../assets/images/new-bell.png')} style={[tw`w-6 h-6 bg-white rounded-full`]} />
                        </TouchableOpacity>
                    </View>
                </View>


  {/* Work Orders banner */}
  <View style={[tw`px-4 mt-4`]}>
                    <View style={tw`bg-[#2D163E] rounded-2xl p-4 flex-row justify-between items-center`}>
                        <View>
                            <Text style={[tw`text-white font-bold text-[18px]`]}>Completed Tasks</Text>
                            <Text style={[tw`text-white mt-1 text-[12px]`]}>
                                3/8 <Text style={[tw`text-[12px] text-white/60`]}>Task completed today</Text>
                            </Text>
                            <View>
                                <TouchableOpacity style={[tw`flex-row items-center mt-2`]} onPress={handleResumeDraft}>
                                    <Ionicons name="play-circle-outline" size={16} color="#F28BFD" style={{ marginLeft: 6 }} />
                                    <Text style={[{ color: '#F28BFD' }, tw`text-[14px]`]}> Resume Draft</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={[tw`flex-row items-center mt-2`]} onPress={handleClearDraft}>
                                    <Ionicons name="trash-outline" size={16} color="#F28BFD" style={{ marginLeft: 6 }} />
                                    <Text style={[{ color: '#F28BFD' }, tw`text-[14px]`]}> clear Draft</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={tw`items-center justify-center`}>
                            <ProgressRing percent={69} size={92} strokeWidth={10} />
                        </View>
                    </View>
                </View>


                {/* KPI Grid */}
                <View style={[tw`px-4 mt-8 mb-5`]}>
                    <View style={[tw`flex-row`]}>
                        <View style={tw`flex-1 rounded-2xl p-3 mr-3 bg-white`}>
                            <View style={tw`absolute top-3 right-3 w-10 h-10 rounded-full bg-[#2B2140] items-center justify-center`}> 
                                <Ionicons name="time-outline" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={tw`text-[#2B2140] font-extrabold text-[50px] mt-1.5`}>2</Text>
                            <Text style={tw`text-[#2B2140] font-bold mt-1.5 text-[13px]`}>Active Tasks</Text>
                            <Text style={tw`text-[#7A7A86] mt-1 text-[11px]`}>Check out current tasks</Text>
                        </View>
                        <View style={tw`flex-1 rounded-2xl p-3 bg-white`}>
                            <View style={tw`absolute top-3 right-3 w-10 h-10 rounded-full bg-[#2B2140] items-center justify-center`}> 
                                <Ionicons name="time-outline" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={tw`text-[#2B2140] font-extrabold text-[50px] mt-1.5`}>1</Text>
                            <Text style={tw`text-[#2B2140] font-bold mt-1.5 text-[13px]`}>Past Due Tracks</Text>
                            <Text style={tw`text-[#7A7A86] mt-1 text-[11px]`}>View missed Tasks</Text>
                        </View>
                    </View>

                </View>

              

                {/* Work Orders list header */}
                <View style={[tw`px-4 mt-5 flex-row items-center justify-between`]}>
                    <Text style={[tw`text-black font-bold text-[16px]`]}>Recent Tasks</Text>
                    <TouchableOpacity
                        style={[tw`bg-white border border-[#EFEFEF] rounded-full px-4 py-2 text-[12px]`]}
                        onPress={() => setShowAll((s) => !s)}
                    >
                        <Text style={[tw`text-black`]}>{showAll ? 'View Less' : 'View All'}</Text>
                    </TouchableOpacity>
                </View>


               <View style={[tw`px-4 my-4 text-[22px]`]}>
                <UiButton
                  label="Start a Report"
                  backgroundColor="#8B4CE8"
                  textColor="#FFFFFF"
                  rounded={18}
                  size="lg"
                        onPress={() => router.push('/cleaner-flow')}
                />
               </View>

                {/* Work Orders list */}
                <View style={[tw`px-4 mb-28`]}>
                    {(showAll ? [
                        { id: 1, title: 'UXroom2', subtitle: 'AS--1683', status: 'In progress' as const },
                        { id: 2, title: 'UXroom3', subtitle: 'VG--1688', status: 'Start Task' as const },
                        { id: 3, title: 'UXroom4', subtitle: 'RM--1209', status: 'Start Task' as const },
                    ] : [
                        { id: 1, title: 'UXroom2', subtitle: 'AS--1683', status: 'In progress' as const },
                        { id: 2, title: 'UXroom3', subtitle: 'VG--1688', status: 'Start Task' as const },
                    ]).map((item, idx) => (
                        <View key={item.id} style={tw`bg-white rounded-3xl border border-[#EFEFF4] flex-row items-center justify-between shadow-lg mb-3 p-6`}>
                            <View style={tw`flex-row items-center flex-1`}>
                                <View style={tw.style('w-11 h-11 rounded-full items-center justify-center', { backgroundColor: idx % 2 === 0 ? '#2B2140' : '#8B5CF6' })}>
                                    {idx % 2 === 0 ? (
                                        <Ionicons name="bed-outline" size={18} color="#FFFFFF" />
                                    ) : (
                                        <Image source={require('../../assets/images/teams-assigned.png')} style={{ width: 20, height: 20, tintColor: '#FFFFFF' }} />
                                    )}
                                </View>
                                <View style={tw`pl-3`}>
                                    <Text style={tw`text-black font-bold text-[12px]`}>{item.title}</Text>
                                    <Text style={tw`text-[#7A7A86] text-[9px] mt-1`}>{item.subtitle}</Text>
                                </View>
                            </View>
                            {item.status === 'Start Task' ? (
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    onPress={() => handleStartTask(item.id)}
                                    style={tw`px-4 py-3 rounded-xl bg-[#F5B0DC]`}
                                >
                                    <Text style={tw`font-bold text-[12px] text-white`}>Start Task</Text>
                                </TouchableOpacity>
                            ) : (
                                    <View style={tw`px-4 py-3 rounded-xl bg-[#E4EDFF]`}>
                                        <Text style={tw`font-bold text-[12px] text-[#3B82F6]`}>In progress</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

        </>
    );
}



// Animated progress ring that starts on mount
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ProgressRingProps = {
    percent: number;
    size?: number;
    strokeWidth?: number;
};

function ProgressRing({ percent, size = 92, strokeWidth = 10 }: ProgressRingProps) {
    const progress = useRef(new Animated.Value(0)).current;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: percent,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();
    }, [percent]);

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={tw.style('', { width: size, height: size, alignItems: 'center', justifyContent: 'center' })}>
            <Svg width={size} height={size}>
                <G rotation={-90} originX={center} originY={center}>
                    {/* Track */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#4A3556"
                        strokeOpacity={0.45}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Progress */}
                    <AnimatedCircle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#FFFFFF"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset as unknown as number}
                    />
                </G>
            </Svg>
            {/* Center percent */}
            <View style={tw`absolute items-center justify-center`}>
                <Text style={[tw`text-white font-bold`]}>69%</Text>
            </View>
            {/* Knob: overlay small circle positioned on arc via rotation */}
            <View style={tw.style('absolute', { width: size, height: size, alignItems: 'center', justifyContent: 'flex-start' })}>
                <Animated.View
                    style={{
                        width: size,
                        height: size,
                        transform: [
                            { rotate: progress.interpolate({ inputRange: [0, 100], outputRange: ['0deg', '360deg'] }) as unknown as string },
                        ],
                    }}
                >
                    <View style={tw.style('absolute', { top: strokeWidth / 2, right: size / 2 - strokeWidth / 2 })}>
                        <View style={tw.style('', { width: strokeWidth, height: strokeWidth, borderRadius: strokeWidth / 2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' })}>
                            <View style={tw.style('', { width: strokeWidth / 3, height: strokeWidth / 3, borderRadius: strokeWidth / 6, backgroundColor: '#2D163E' })} />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}



// Tailwind-only: removed StyleSheet block

