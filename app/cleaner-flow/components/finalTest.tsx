import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';

export default function FinalTest() {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    // @ts-ignore
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  return (
    <View style={[tw`flex-1 bg-[#F7F7F7]`]}>
      {/* Header */}
      <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[24px]`]}>Final Assessment</Text>
        <View style={styles.iconButton}>
          <Ionicons name="time-outline" size={18} color="#111827" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={true}>
        <View style={[tw`px-4 mt-8`]}>
          {/* White Info Card */}
          <View style={styles.whiteCard}>
            <BulletRow icon="help-circle-outline" text={
              <Text style={tw`text-black`}>
                There are <Text style={tw`text-black font-bold text-[12px]`}>20 Questions</Text>
              </Text>
            } />
            <BulletRow icon="time-outline" text={
              <Text style={tw`text-black`}>
                You have <Text style={tw`text-black font-bold text-[12px]`}>25 minutes</Text> to finish
              </Text>
            } />
            <BulletRow icon="checkmark-circle-outline" text={
              <Text style={tw`text-black`}>
                The pass mark is <Text style={tw`text-black font-bold text-[12px]`}>70%</Text>
              </Text>
            } />
            <BulletRow icon="create-outline" text={
              <Text style={tw`text-black`}>
                You have only <Text style={tw`text-black font-bold text-[12px]`}>3 attemps</Text>
              </Text>
            } />
          </View>

          {/* Purple Tips Card */}
          <View style={styles.tipsCard}>
            <View style={[tw`flex-row items-center mb-2`]}>
              <Ionicons name="bulb-outline" size={16} color="#7C5CFF" />
              <Text style={[tw`ml-2 text-[#7C5CFF] font-bold text-[14px]`]}>Read the below very well</Text>
            </View>
            <View style={{ paddingLeft: 6 }}>
              <TipText style={[tw`text-[12px]`]} index={1} text="If you fail, you will have to review the material again and retake the test" />
              <TipText style={[tw`text-[12px]`]} index={2} text="Try to finish before your time runs out" />
              <TipText style={[tw`text-[12px]`]} index={3} text="Read the questions very well before answering" />
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={[tw`mt-6 flex-row items-center justify-between`]}>
            <TouchableOpacity style={[styles.footerBtnLight, tw`py-5`]} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={16} color="#111827" />
              <Text style={[tw`ml-2 text-black text-[12px]`]}>Go Back to Modules</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.footerBtnPrimary, tw`py-5`]} onPress={() => router.push('/cleaner-flow/test-question')}>
              <Text style={[tw`text-white mr-2 text-[12px]`]}>Start Test</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function BulletRow({ icon, text }: { icon: any; text: React.ReactNode }) {
  return (
    <View style={[tw`flex-row items-center mb-4`]}>
      <View style={styles.pillIcon}>
        <Ionicons name={icon} size={14} color="#FFFFFF" />
      </View>
      <View style={{ marginLeft: 10 }}>{text}</View>
    </View>
  );
}

function TipText({ index, text, style }: { index: number; text: string; style?: any }) {
  return (
    <View style={{ flexDirection: 'row', marginTop: 6 }}>
      <Text style={[tw`text-[#6B7280]`, style]}>{index}. </Text>
      <Text style={[tw`text-[#6B7280] flex-shrink`, style]}>{text}</Text>
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
  whiteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  pillIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7C5CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsCard: {
    backgroundColor: '#EDE7FF',
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
  },
  footerBtnLight: {
    backgroundColor: '#EEEEEE',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerBtnPrimary: {
    backgroundColor: '#7C5CFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


