import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function ModulsScreen() {
  const navigation = useNavigation<any>();
  const params = useLocalSearchParams<{ module?: string; total?: string; title?: string }>();
  const moduleNum = params.module ? Number(params.module) : 1;
  const total = params.total ? Number(params.total) : 6;
  const title = params.title || 'Chemical Handling SK-250';
  const [selected, setSelected] = useState<string | null>(null);

  useLayoutEffect(() => {
    // @ts-ignore
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      {/* Header */}
      <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[18px]`]}>Module {moduleNum} of {total}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="time-outline" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={[tw`px-4`]}>
          {/* Video thumbnail */}
          <View style={styles.videoCard}>
            <Image source={require('../../assets/images/scientists-look-orange-chemicals-glass-laboratory 1.png')} style={{ width: '100%', height: 160, borderRadius: 12 }} resizeMode="cover" />
            <View style={styles.playOverlay}>
              <Ionicons name="play" size={28} color="#FFFFFF" />
            </View>
          </View>

          {/* Title row */}
          <View style={[tw`mt-3 flex-row items-center justify-between`]}>
            <View>
              <Text style={[tw`text-black font-bold`]}> {title} </Text>
              <Text style={[tw`text-[#E565B8] text-[11px] mt-1`]}>Due in 3 days</Text>
            </View>
            <TouchableOpacity style={styles.downloadAll}>
              <Ionicons name="download-outline" size={14} color="#FFFFFF" />
              <Text style={[tw`text-white ml-2 text-[12px]`]}>Download All</Text>
            </TouchableOpacity>
          </View>

          {/* Content card */}
          <View style={styles.contentCard}>
            <View style={[tw`flex-row items-center`]}>
              <Ionicons name="information-circle-outline" size={16} color="#7C5CFF" />
              <Text style={[tw`text-[#7C5CFF] ml-2 font-bold`]}>
                Proper Dilation Ratios
              </Text>
            </View>
            <Text style={[tw`text-[#6B7280] mt-2`]}>
              SK-250 is a concentrated cleaner that must be properly diluted before use. The standard dilution ratio is:
            </Text>
            <View style={styles.bulletBox}>
              {['1:128 - General cleaning', '1:128 - General cleaning', '1:128 - General cleaning'].map((t, i) => (
                <View key={i} style={[tw`flex-row items-center mt-2`]}>
                  <Ionicons name="alert-circle-outline" size={14} color="#7C5CFF" />
                  <Text style={[tw`ml-2 text-[#6B7280] text-[12px]`]}>{t}</Text>
                </View>
              ))}
            </View>
            <Text style={[tw`text-[#6B7280] mt-2`]}>
              Always wear appropriate PPE when handling concentrated chemicals.
            </Text>
          </View>

          {/* Quiz block */}
          <View style={styles.quizCard}>
            <View style={[tw`flex-row items-center`]}>
              <Ionicons name="help-circle-outline" size={16} color="#7C5CFF" />
              <Text style={[tw`ml-2 text-[#7C5CFF] font-bold`]}>Quick Knowledge Check</Text>
            </View>
            <Text style={[tw`text-[#6B7280] mt-2`]}>
              What is the dilution ratio for general cleaning with SK-250?
            </Text>
            {['1.16', '1.14', '1.2', '1.79'].map((opt, i) => {
              const isSelected = selected === opt;
              return (
                <TouchableOpacity key={i} style={[styles.optionRow, isSelected && { borderColor: '#7C5CFF', backgroundColor: '#F3F0FF' }]} onPress={() => setSelected(opt)}>
                  <Text style={[tw`text-black`]}>{opt}</Text>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer nav */}
          <View style={[tw`mt-3 flex-row items-center justify-between`]}>
            <TouchableOpacity style={styles.footerBtnLight} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={16} color="#111827" />
              <Text style={[tw`ml-2 text-black`]}>Previous Module</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerBtnPrimary}>
              <Text style={[tw`text-white mr-2`]}>Next Module</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 14,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadAll: {
    backgroundColor: '#7C5CFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  bulletBox: {
    backgroundColor: '#F6F5FA',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  quizCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  optionRow: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8EF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7C5CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7C9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#7C5CFF',
    borderColor: '#7C5CFF',
  },
  footerBtnLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerBtnPrimary: {
    backgroundColor: '#7C5CFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


