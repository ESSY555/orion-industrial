import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import { Text, View } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

type RootStackParamList = {
    WorkOrders: undefined;
};

export default function dashboard() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showAll, setShowAll] = useState(false);

    // Ensure header is hidden even if navigator defaults change
    useLayoutEffect(() => {
        // @ts-ignore setOptions exists on any stack screen
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`, { backgroundColor: '#F7F7F7' }]} showsVerticalScrollIndicator={false}>
                {/* Header */}

                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <View style={[tw`flex-row items-center`]}>
                        <Image source={require('../assets/images/lady-home.png')} style={{ width: 42, height: 42, borderRadius: 21 }} />
                        <View style={[tw`pl-3`]}>
                            <Text style={[tw`text-black font-bold text-[18px]`]}>
                                Hello Emmanuella
                            </Text>
                            <Text style={[tw`text-gray-600 text-[13px]`]}>Pandas Factory</Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row items-center`]}>
                        <TouchableOpacity style={[tw`mr-3 bg-white rounded-full shadow-lg p-2`]}>
                            <Image source={require('../assets/images/refresh.png')} style={[tw`w-6 h-6 p-2 bg-white rounded-full`]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`bg-white rounded-full shadow-lg p-2`]}>
                            <Image source={require('../assets/images/new-bell.png')} style={[tw`w-6 h-6 bg-white rounded-full`]} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* KPI Grid */}
                <View style={[tw`px-4 mt-8 mb-5`]}>
                    <View style={[tw`flex-row`]}>
                        <View style={[styles.kpiCard, styles.kpiLight]}>
                            <View style={[styles.kpiIcon]}>
                                <Image source={require('../assets/images/active-task.png')} style={{ width: 30, height: 30 }} />
                            </View>

                            <Text style={[styles.kpiTitle, tw`text-[13.6px]`]}>Active Tasks</Text>
                            <Text style={[styles.kpiValue, tw`text-[42px]`]}>
                                2
                            </Text>
                        </View>
                        <View style={[styles.kpiCard, styles.kpiPurple]}>
                            <View style={[tw`bg-[#2D1B3D] rounded-full p-2 inline-block w-8 h-8`]}>
                                <Image source={require('../assets/images/teams-assigned.png')} style={{ width: 14, height: 14 }} />
                            </View>
                            <Text style={[styles.kpiTitle, tw`text-[13.6px] pt-2`]}>Teams Assigned</Text>
                            <Text style={[styles.kpiValue, tw`text-[42px]`]}>
                                2
                            </Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row mt-5`]}>
                        <View style={[styles.kpiCard, styles.kpiPurple]}>
                            <View style={[styles.kpiIcon]}>
                                <Image source={require('../assets/images/report-review.png')} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={[styles.kpiTitle, tw`text-[13.6px]`]}>Reports to Review</Text>
                            <Text style={[styles.kpiValue, tw`text-[42px]`]}>
                                12
                            </Text>
                        </View>
                        <View style={[styles.kpiCard, styles.kpiLight]}>
                            <View style={[tw`bg-[#2D1B3D] rounded-full p-2 inline-block w-8 h-8`]}>
                                <Image source={require('../assets/images/areas-cleaned.png')} style={{ width: 14, height: 14 }} />
                            </View>
                            <Text style={[styles.kpiTitle, tw`text-[13.6px] pt-2`]}>Areas Cleaned</Text>
                            <Text style={[styles.kpiValue, tw`text-[42px]`]}>
                                6
                            </Text>

                        </View>
                    </View>
                </View>

                {/* Work Orders banner */}
                <View style={[tw`px-4 mt-4 mb-5`]}>
                    <View style={[styles.banner]}>
                        <View>
                            <Text style={[tw`text-white font-bold text-[20px]`]}>Work Orders Done</Text>
                            <Text style={[tw`text-white mt-1 text-[12px]`]}>
                                3/8 <Text style={[tw`text-[12px] text-white/60`]}>reviews completed today</Text>
                            </Text>
                            <TouchableOpacity style={tw`flex-row items-center mt-2`}>

                                <Text style={[{ color: '#F28BFD' }, tw`text-[14px]`]}>Continue</Text>
                                <Ionicons name="arrow-forward" size={16} color="#F28BFD" style={{ marginLeft: 6 }} />

                            </TouchableOpacity>
                        </View>
                        <View style={[styles.ringContainer]}>
                            <ProgressRing percent={69} size={92} strokeWidth={10} />
                        </View>
                    </View>
                </View>

                {/* Work Orders list header */}
                <View style={[tw`px-4 mt-5 flex-row items-center justify-between`]}>
                    <Text style={[tw`text-black font-bold`]}>Work Orders</Text>
                    <TouchableOpacity style={[styles.viewAllPill]} onPress={() => {
                        // @ts-ignore navigate is available via useNavigation
                        (navigation as any).navigate?.('WorkOrders');
                    }}>
                        <Text style={[tw`text-black`]}>View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Work Orders list */}
                <View style={[tw`px-4 mt-3 mb-6`]}>
                    {(showAll ? [
                        { id: 1, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 2, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 3, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Cleaned', color: '#2ECC71' },
                        { id: 4, title: 'Locker Room', subtitle: 'Benches and Lockers', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 5, title: 'Main Hallway', subtitle: 'Floors and Corners', status: 'Cleaned', color: '#2ECC71' },
                        { id: 6, title: 'Office 2B', subtitle: 'Desks and Windows', status: 'Not Cleaned', color: '#E74C3C' },
                    ] : [
                        { id: 1, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 2, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Not Cleaned', color: '#E74C3C' },
                        { id: 3, title: 'Fresh Kitchen Room', subtitle: 'Shelf and Cabinet', status: 'Cleaned', color: '#2ECC71' },
                    ]).map((item) => (
                        <View key={item.id} style={[styles.orderCard, tw`shadow-lg py-8`]}>
                            <View style={[tw`flex-row items-center flex-1`]}>
                                <View style={[styles.orderIndex]}>
                                    <Text style={[tw`text-black`]}>{item.id}</Text>
                                </View>
                                <View style={[tw`pl-3`]}>
                                    <Text style={[tw`text-black font-bold text[14px]`]}>{item.title}</Text>
                                    <Text style={[tw`text-gray-600 mt-1 text-[11.5px]`]}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <Text style={[{ color: item.color, fontWeight: '600' }, tw`text-[12px]`]}>
                                {item.status}
                            </Text>

                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
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
});

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
