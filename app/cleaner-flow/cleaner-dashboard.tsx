import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Easing, RefreshControl } from 'react-native';
import { Text, View } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import UiButton from '@/components/UiButton';

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
                    <View style={[styles.banner]}>
                        <View>
                            <Text style={[tw`text-white font-bold text-[20px]`]}>Completed Tasks</Text>
                            <Text style={[tw`text-white mt-1 text-[12px]`]}>
                                3/8 <Text style={[tw`text-[12px] text-white/60`]}>Task completed today</Text>
                            </Text>
                        </View>
                        <View style={[styles.ringContainer]}>
                            <ProgressRing percent={69} size={92} strokeWidth={10} />
                        </View>
                    </View>
                </View>


                {/* KPI Grid */}
                <View style={[tw`px-4 mt-8 mb-5`]}>
                    <View style={[tw`flex-row`]}>
                        <View style={[styles.kpiCard, styles.kpiLight]}>
                            <View style={styles.kpiBadge}> 
                                <Ionicons name="time-outline" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={[styles.kpiNumber]}>2</Text>
                            <Text style={[styles.kpiTitleStrong]}>Active Tasks</Text>
                            <Text style={[styles.kpiSubtitle]}>Check out current tasks</Text>
                        </View>
                        <View style={[styles.kpiCard, styles.kpiLight]}>
                            <View style={styles.kpiBadge}> 
                                <Ionicons name="time-outline" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={[styles.kpiNumber]}>1</Text>
                            <Text style={[styles.kpiTitleStrong]}>Past Due Tracks</Text>
                            <Text style={[styles.kpiSubtitle]}>View missed Tasks</Text>
                        </View>
                    </View>

                </View>

              

                {/* Work Orders list header */}
                <View style={[tw`px-4 mt-5 flex-row items-center justify-between`]}>
                    <Text style={[tw`text-black font-bold`]}>Recent Tasks</Text>
                    <TouchableOpacity style={[tw`bg-white border border-[#EFEFEF] rounded-full px-4 py-2`]} onPress={() => {
                        // @ts-ignore navigate is available via useNavigation
                        (navigation as any).navigate?.('WorkOrders');
                    }}>
                        <Text style={[tw`text-black`]}>View All</Text>
                    </TouchableOpacity>
                </View>


               <View style={[tw`px-4 my-4`]}>
                <UiButton
                  label="Start a Report"
                  backgroundColor="#8B4CE8"
                  textColor="#FFFFFF"
                  rounded={18}
                  size="lg"
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
                        <View key={item.id} style={[styles.taskCard, tw`mb-3 p-6`]}>
                            <View style={tw`flex-row items-center flex-1`}>
                                <View style={[styles.taskIcon, { backgroundColor: idx % 2 === 0 ? '#2B2140' : '#8B5CF6' }]}>
                                    {idx % 2 === 0 ? (
                                        <Ionicons name="bed-outline" size={18} color="#FFFFFF" />
                                    ) : (
                                        <Image source={require('../../assets/images/teams-assigned.png')} style={{ width: 20, height: 20, tintColor: '#FFFFFF' }} />
                                    )}
                                </View>
                                <View style={tw`pl-3`}>
                                    <Text style={tw`text-black font-bold`}>{item.title}</Text>
                                    <Text style={tw`text-[#7A7A86] text-[11px] mt-1`}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <View style={[styles.statusPill, item.status === 'In progress' ? styles.statusBlue : styles.statusPink, tw`px-4 py-3`]}>
                                <Text style={[styles.statusText, item.status === 'In progress' ? styles.statusBlueText : styles.statusPinkText]}>{item.status}</Text>
                            </View>
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
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
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
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[tw`text-white font-bold`]}>69%</Text>
            </View>
            {/* Knob: overlay small circle positioned on arc via rotation */}
            <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Animated.View
                    style={{
                        width: size,
                        height: size,
                        transform: [
                            { rotate: progress.interpolate({ inputRange: [0, 100], outputRange: ['0deg', '360deg'] }) as unknown as string },
                        ],
                    }}
                >
                    <View style={{ position: 'absolute', top: strokeWidth / 2, right: size / 2 - strokeWidth / 2 }}>
                        <View style={{ width: strokeWidth, height: strokeWidth, borderRadius: strokeWidth / 2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: strokeWidth / 3, height: strokeWidth / 3, borderRadius: strokeWidth / 6, backgroundColor: '#2D163E' }} />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    kpiCard: {
        flex: 1,
        borderRadius: 16,
        padding: 14,
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
  kpiBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2B2140',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiNumber: {
    color: '#2B2140',
    fontWeight: '800',
    fontSize: 42,
    marginTop: 6,
  },
  kpiTitleStrong: {
    color: '#2B2140',
    fontWeight: '700',
    marginTop: 6,
  },
  kpiSubtitle: {
    color: '#7A7A86',
    marginTop: 4,
    fontSize: 12,
  },
    kpiLight: {
        backgroundColor: '#FFFFFF',
    },
    kpiPurple: {
        backgroundColor: '#EAE2F8',
    },
    kpiIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F1EEF6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    kpiTitle: {
        color: '#3A3A3A',
        marginBottom: 8,
    },
    kpiValue: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 22,
    },
    banner: {
        backgroundColor: '#2D163E',
        borderRadius: 18,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ringContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewAllPill: {
        backgroundColor: '#EFECEF',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 18,
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        borderWidth: 0.5,
        borderColor: '#EFEFEF',
    },
    orderIndex: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F3F1F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#EFEFF4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 2,
    },
    taskIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusPill: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
    },
    statusBlue: { backgroundColor: '#E4EDFF' },
    statusPink: { backgroundColor: '#F5B0DC' },
    statusText: { fontWeight: '700', fontSize: 12 },
    statusBlueText: { color: '#3B82F6' },
    statusPinkText: { color: '#FFFFFF' },
});

