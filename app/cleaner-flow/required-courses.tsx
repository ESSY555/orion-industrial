import React, { useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function requiredCourses() {
    const { username } = useLocalSearchParams<{ username?: string }>();
    const navigation = useNavigation<any>();

    useLayoutEffect(() => {
        // This screen hides any default headers
    }, []);

       // Ensure header is hidden even if navigator defaults change
       useLayoutEffect(() => {
        // @ts-ignore setOptions exists on any stack screen
        navigation.setOptions?.({ headerShown: false, title: '' });
    }, [navigation]);
    return (
        <View style={styles.container}>
             <StatusBar style="dark" backgroundColor="#FFFFFF" />
            <ScrollView style={[tw`h-full`]} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                <View style={styles.inner}>
                {/* Header */}
                <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
                    <View style={[tw`flex-row items-center`]}>
                        <Image source={require('../../assets/images/lady-home.png')} style={{ width: 42, height: 42, borderRadius: 21 }} />
                        <View style={[tw`pl-3`]}>
                            <Text style={[tw`text-black font-bold text-[18px]`]}>Hello {username ? String(username) : 'Emmanuella'}</Text>
                            <Text style={[tw`text-gray-600 text-[13px]`]}>Pandas Factory</Text>
                        </View>
                    </View>
                    <View style={[tw`flex-row items-center`]}>
                        <TouchableOpacity style={[tw`mr-3 bg-white rounded-full shadow-lg p-2`]}>
                            <Image source={require('../../assets/images/refresh.png')} style={[tw`w-6 h-6 p-2 bg-white rounded-full`]} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[tw`bg-white rounded-full shadow-lg p-2`]}>
                            <Image source={require('../../assets/images/new-bell.png')} style={[tw`w-6 h-6 bg-white rounded-full`]} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats */}
                <View style={[tw`px-4 mt-2 flex-row`]}>
                    {/* Completed */}
                    <View style={[styles.statCard, { backgroundColor: '#FFFFFF' }]}>
                        <View style={styles.statIconCircle}>
                            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                        </View>
                        <Text style={styles.statLabel}>Courses{"\n"}Completed</Text>
                        <Text style={[styles.statNumber, { color: '#2B2140' }]}>14</Text>
                        <Image
                            source={require('../../assets/images/experiment-one.png')}
                            style={[styles.statFlask, { tintColor: '#EDE7FF' }]}
                        />
                    </View>
                    {/* Remaining */}
                    <View style={[styles.statCard, { backgroundColor: '#EDE3FF' }]}>
                        <View style={styles.statIconCircle}>
                            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
                        </View>
                        <Text style={styles.statLabel}>Courses{"\n"}Remaining</Text>
                        <Text style={[styles.statNumber, { color: '#2B2140' }]}>3</Text>
                        <Image
                            source={require('../../assets/images/experiment-one.png')}
                            style={[styles.statFlask, { tintColor: '#FBD1E6' }]}
                        />
                    </View>
                </View>

                {/* Highlight Course */}
                <View style={[tw`px-4 mt-4`]}>
                    <View style={styles.heroCard}>
                        <View style={[tw`flex-row items-center justify-between`]}>
                            <Text style={[tw`text-white`, { opacity: 0.9 }]}>Level 3</Text>
                            <View style={[styles.heroPill]}>
                                <Text style={[tw`text-white text-[10px]`]}>50% Complete</Text>
                            </View>
                        </View>
                        <Text style={[tw`text-white font-bold text-[18px] mt-2`]}>Chemistry Essentials</Text>
                        <View style={[tw`flex-row items-center mt-3`]}>
                            <View style={[styles.modulePill]}>
                                <Text style={[tw`text-white text-[10px]`]}>Module 2</Text>
                            </View>
                            <Text style={[tw`text-white ml-3 text-[10px]`, { opacity: 0.6 }]}>Module 6</Text>
                        </View>
                        <View style={[styles.progressTrack, tw`mt-3`]}>
                            <View style={[styles.progressFill, { width: '50%' }]} />
                        </View>
                    </View>
                </View>

                {/* Required Courses */}
                <SectionHeader title="Required Courses" />
                <CourseCard
                    badgeText="Required Training"
                    dueText="Due in 3 days"
                    title="Chemical Handling SK-250"
                    actionText="Continue"
                    thumb={require('../../assets/images/scientists-look-orange-chemicals-glass-laboratory 1.png')}
                    modulesCount={8}
                    durationText="1h 30m"
                    points={10}
                />
                <CourseCard
                    badgeText="Required Training"
                    dueText="Due in 3 days"
                    title="LOTO Procedure SK-250"
                    actionText="Continue"
                    thumb={require('../../assets/images/jugn.png')}
                    modulesCount={4}
                    durationText="30 minutes"
                    points={10}
                    progress={50}
                />

                {/* Recommendations */}
                <SectionHeader title="Recommendations" optional />
                <CourseCard
                    badgeText="Optional"
                    dueText="No Due Date"
                    subtitle="Available in Level 3"
                    title="Advanced Sanitation"
                    actionText="Start"
                    thumb={require('../../assets/images/scientists-look-orange-chemicals-glass-laboratory 1.png')}
                    modulesCount={8}
                    durationText="1h 30m"
                    points={10}
                />

                </View>
            </ScrollView>
        </View>
    );
}

type CourseCardProps = {
    badgeText: string;
    dueText: string;
    subtitle?: string;
    title: string;
    actionText: string;
    thumb: any;
    modulesCount: number;
    durationText: string;
    points: number;
    progress?: number;
};

function CourseCard({ badgeText, dueText, subtitle, title, actionText, thumb, modulesCount, durationText, points, progress }: CourseCardProps) {
    return (
        <View style={[tw`px-4 mt-3`]}>
            <View style={styles.courseCard}>
                <View style={[tw`flex-row items-center justify-between`]}>
                    <BadgeLeft text={badgeText} />
                    <BadgeRight text={dueText} />
                </View>
                {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                <View style={[tw`flex-row mt-3`]}>
                    <View style={[tw`flex-1 pr-3`]}>
                        <Text style={[tw`text-black font-bold text-[16px]`]}>{title}</Text>
                        <View style={[tw`flex-row items-center mt-2`]}>
                            <Text style={[tw`text-[#E565B6] font-semibold`]}>{actionText}</Text>
                            <Ionicons name="arrow-forward" size={14} color="#E565B8" style={{ marginLeft: 4 }} />
                        </View>
                        <View style={[tw`flex-row items-center mt-3`]}>
                            <View style={[tw`flex-row items-center`]}>
                                <Image source={require('../../assets/images/book.png')} style={styles.metaIcon} />
                                <Text style={[styles.metaText, tw`text-black font-bold`]}>{modulesCount} Modules</Text>
                            </View>
                            <View style={styles.metaDot} />
                            <View style={[tw`flex-row items-center`]}>
                                <Image source={require('../../assets/images/clock1.png')} style={styles.metaIcon} />
                                    <Text style={[styles.metaText, tw`text-black font-bold`]}>{durationText}</Text>
                            </View>
                            <View style={styles.metaDot} />
                            <View style={[tw`flex-row items-center`]}>
                                <Image source={require('../../assets/images/cupp.png')} style={styles.metaIcon} />
                                <Text style={[styles.metaText, tw`text-[#FBA82C] font-bold pt-2`]}>+ {points} points</Text>
                            </View>
                        </View>
                        {typeof progress === 'number' && (
                            <View style={[tw`mt-3`]}>
                                <Text style={[tw`text-[#E565B8] text-[10px] font-semibold`]}>{`${progress}% complete`}</Text>
                                <View style={[styles.progressTrackLight, tw`mt-1`]}>
                                    <View style={[styles.progressFillPink, { width: `${progress}%` }]} />
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={[styles.thumbWrap, tw``]}>
                        <Image source={thumb} style={styles.thumbImage} resizeMode="contain" />
                    </View>
                </View>
            </View>
        </View>
    );
}

function BadgeLeft({ text }: { text: string }) {
    const isOptional = text.toLowerCase() === 'optional';
    return (
        <View style={[isOptional ? styles.optionalBadge : styles.badgeLight]}>
            <Text style={[tw`text-[10px]`, { color: isOptional ? '#7C5CFF' : '#111827' }]}>{text}</Text>
        </View>
    );
}

function BadgeRight({ text }: { text: string }) {
    const isNoDue = text.toLowerCase() === 'no due date';
    return (
        <View style={[isNoDue ? { backgroundColor: '#F3F4F6' } : styles.badgeDue, styles.badgeBase]}>
            <Text style={[tw`text-[10px]`, { color: isNoDue ? '#6B7280' : '#FF5CA8' }]}>{text}</Text>
        </View>
    );
}

function SectionHeader({ title, optional }: { title: string; optional?: boolean }) {
    return (
        <View style={[tw`px-4 mt-6 mb-2`]}>
            <View style={[tw`flex-row items-center justify-between`]}>
                <View style={[tw`flex-row items-center`]}>
                    <Text style={[tw`text-black font-bold`]}>{title}</Text>
                </View>
                <TouchableOpacity style={[styles.viewAll]}>
                    <Text style={[tw`text-black text-[12px]`]}>View All</Text>
                    <Ionicons name="chevron-forward" size={16} color="#111827" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    inner: {
        flex: 1,
    },
    statCard: {
        flex: 1,
        borderRadius: 20,
        padding: 14,
        marginRight: 12,
        overflow: 'hidden',
    },
    statIconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#2B2140',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statLabel: {
        position: 'absolute',
        top: 12,
        right: 12,
        color: '#2B2140',
        fontSize: 11,
        opacity: 0.9,
        textAlign: 'right',
    },
    statNumber: {
        fontWeight: '800',
        fontSize: 28,
        marginTop: 18,
    },
    statFlask: {
        position: 'absolute',
        right: 10,
        bottom: -6,
        width: 64,
        height: 64,
        opacity: 0.8,
    },
    heroCard: {
        backgroundColor: '#2D163E',
        borderRadius: 18,
        padding: 18,
    },
    heroPill: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    modulePill: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    progressTrack: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressFill: {
        height: 6,
        backgroundColor: '#F38FFF',
        borderRadius: 6,
    },
    progressTrackLight: {
        height: 6,
        backgroundColor: '#F5E6F0',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressFillPink: {
        height: 6,
        backgroundColor: '#E565B8',
        borderRadius: 6,
    },
    subtitle: {
        color: '#7A7A86',
        fontSize: 11,
        marginTop: 8,
    },
    courseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 14,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    metaIcon: {
        width: 12,
        height: 12,
        marginRight: 6,
    },
    metaText: {
        color: '#7A7A86',
        fontSize: 11,
    },
    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 8,
    },
    badgeLight: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    badgeDue: {
        backgroundColor: '#FFE9F3',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    badgeBase: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    thumbWrap: {
        width: 100,
        height: 84,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    thumbImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    optionalBadge: {
        backgroundColor: '#EEF2FF',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    viewAll: {
        backgroundColor: '#FFFFFF',
        borderColor: '#EFEFEF',
        borderWidth: 1,
        borderRadius: 18,
        paddingHorizontal: 10,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

