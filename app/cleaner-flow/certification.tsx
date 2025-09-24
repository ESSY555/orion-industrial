import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Certification() {
  const navigation = useNavigation<any>();
    const { username } = useLocalSearchParams<{ username?: string }>();
    const [recent, setRecent] = useState<{ title: string; date: string }[]>([]);
    //   const { name } = useLocalSearchParams<{ name?: string }>();

  useLayoutEffect(() => {
    // @ts-ignore
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const raw = (await AsyncStorage.getItem('sanitrack:certificates')) || '[]';
                const list = JSON.parse(raw) as { title: string; date: string }[];
                if (mounted) setRecent(list);
            } catch {
                if (mounted) setRecent([]);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

  return (
    <View style={[tw`flex-1 bg-[#F7F7F7]`]}> 
      {/* Header */}
      <View style={[tw`px-4 pt-14 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[18px]`]}>Certifications</Text>
        <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="time-outline" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={[tw`px-4 mt-10`]}>
          {/* Top certificate card */}
          <View style={styles.certificateShadow}> 
            <View style={styles.certificateCard}>
              <View style={styles.badgeDot} />
              <View style={[tw`items-center`]}>
                <View style={[tw`flex-row items-center`]}>
                  <Ionicons name="business-outline" size={16} color="#F59E0B" />
                  <Text style={[tw`text-[12px] ml-2`, { color: '#F59E0B', fontWeight: '700' }]}>Pandas Factory</Text>
                </View>
                <Text style={[tw`mt-2`, { color: '#2B2140', fontWeight: '900', fontSize: 26 }]}>Level 2 Certified</Text>
                <Text style={[tw`mt-1`, { color: '#6B7280', fontSize: 12 }]}>Basic Skills & Awareness</Text>
                              <Text style={[tw`mt-3`, { color: '#2B2140', fontWeight: '600', fontSize: 16 }]}>{username ? String(username) : 'Emmanuella'}</Text>
                <View style={styles.nameUnderline} />
              </View>
              <View style={[tw`flex-row items-center justify-between mt-3`]}>
                <Text style={[tw`text-[12px]`, { color: '#111827' }]}>Issued: May 15, 2025</Text>
                <Text style={[tw`text-[12px]`, { color: '#111827' }]}>ID: PF-2025-L2-0847</Text>
              </View>
            </View>
          </View>

          {/* Authorized Chemicals */}
          <View style={[styles.sectionCard, tw`mt-4`]}>
            <View style={[tw`flex-row items-center justify-between mb-3`]}>
              <Text style={[tw`text-black font-bold`]}>Authorized Chemicals</Text>
              <TouchableOpacity style={[tw`flex-row items-center`]}>
                <Text style={[tw`text-[#6B7280] text-[12px] mr-1`]}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <View style={[tw`flex-row flex-wrap justify-between`]}>
              {['SK-250', 'SK-146', 'SK-148', 'SK-831', 'SK-833', 'SK-839'].map((code) => (
                <View key={code} style={styles.chemItem}>
                  <View style={styles.chemIconWrap}>
                    <Ionicons name="flask-outline" size={16} color="#7C5CFF" />
                  </View>
                  <Text style={[tw`text-[#6B7280] mt-2 text-[12px]`]}>{code}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Certifications */}
          <View style={[styles.sectionCard, tw`mt-4`]}>
            <View style={[tw`flex-row items-center justify-between mb-3`]}>
              <Text style={[tw`text-black font-bold`]}>Recent Certifications</Text>
              <TouchableOpacity style={[tw`flex-row items-center`]}>
                <Text style={[tw`text-[#6B7280] text-[12px] mr-1`]}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

                      {(recent.length ? recent : [
                          { title: 'Chemical Handling Sk-148', date: 'Completed: Jul 28, 2025' },
              { title: 'LOTO Procedures', date: 'Completed: Aug 5, 2025' },
                      ]).map((row, idx) => (
              <View key={idx} style={[styles.recentRow, idx === 0 ? tw`mb-3` : null]}> 
                              <View style={[tw`flex-row items-center flex-1`]}>
                  <View style={styles.recentThumb}>
                                      <Image source={require('../../assets/images/experiment-one.png')} style={{ width: 52, height: 32 }} resizeMode="contain" />
                  </View>
                                  <View style={[tw`ml-3`, { flexShrink: 1 }]}>
                                      <Text style={[tw`text-black font-semibold text-[14px]`]} numberOfLines={1} ellipsizeMode="tail">{row.title}</Text>
                                      <Text style={[tw`text-[#6B7280] text-[12px] mt-1`]}>{row.date}</Text>
                  </View>
                </View>
                              <View style={[tw`flex-row items-center`]}>
                                  <TouchableOpacity style={[tw`mr-3 flex-row items-center`]}>
                                      <Text style={[tw`text-[#7C5CFF] text-[12px] mr-1`]}>View</Text>
                                      <Ionicons name="eye-outline" size={16} color="#7C5CFF" />
                                  </TouchableOpacity>
                                  <TouchableOpacity accessibilityRole="button">
                                      <Ionicons name="download-outline" size={18} color="#6B7280" />
                                  </TouchableOpacity>
                              </View>
              </View>
            ))}
          </View>

          {/* Download All */}
          <TouchableOpacity style={styles.downloadAll}>
            <Ionicons name="cloud-download-outline" size={16} color="#FFFFFF" />
            <Text style={[tw`text-white ml-2`]}>Download All Certificates</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateShadow: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  certificateCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F5C88F',
    padding: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  badgeDot: {
    position: 'absolute',
    left: -6,
    top: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF9800',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  nameUnderline: {
    marginTop: 6,
    width: '80%',
    height: 2,
    backgroundColor: '#F5C88F',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  chemItem: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  chemIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1EAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentThumb: {
    width: 46,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F6F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadAll: {
    marginTop: 14,
    backgroundColor: '#7C5CFF',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});


