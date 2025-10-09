import React, { useLayoutEffect, useMemo, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/routes/homeStack';
import { mockCourseWithAssignment } from '@/db/mock-db';

export default function FinalTest() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FinalTest'>>();

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const totalDurationSec = (mockCourseWithAssignment.assessmentDuration || 0) * 60;
  const [remainingSec, setRemainingSec] = useState<number>(totalDurationSec);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (remainingSec <= 0) return;
    const id = setInterval(() => {
      setRemainingSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [remainingSec]);

  return (
    <View style={[tw`flex-1 bg-[#F7F7F7]`]}>
      {/* Header */}
      <View style={[tw`px-4 pt-14 pb-3 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-9 h-9 rounded-full bg-white items-center justify-center`}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[24px]`]}>Final Assessment</Text>
        <View style={tw`w-9 h-9 rounded-full bg-white items-center justify-center flex-row`}>
          <Ionicons name="time-outline" size={18} color="#111827" />
          <Text style={[tw`ml-1 text-black`, { fontSize: 12 }]}>{formatTime(remainingSec)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={true}>
        <View style={[tw`px-4 mt-8`]}>
          {/* White Info Card */}
          <View style={tw`bg-white rounded-2xl p-4`}>
            <BulletRow icon="help-circle-outline" text={
              <Text style={tw`text-black`}>
                There are <Text style={tw`text-black font-bold text-[12px]`}>{mockCourseWithAssignment.questionsAndOptions.length} Questions</Text>
              </Text>
            } />
            <BulletRow icon="time-outline" text={
              <Text style={tw`text-black`}>
                You have <Text style={tw`text-black font-bold text-[12px]`}>{mockCourseWithAssignment.assessmentDuration} minutes</Text> to finish
              </Text>
            } />
            <BulletRow icon="checkmark-circle-outline" text={
              <Text style={tw`text-black`}>
                The pass mark is <Text style={tw`text-black font-bold text-[12px]`}>{mockCourseWithAssignment.minimumPassScore}%</Text>
              </Text>
            } />
            <BulletRow icon="create-outline" text={
              <Text style={tw`text-black`}>
                You have only <Text style={tw`text-black font-bold text-[12px]`}>{mockCourseWithAssignment.courseAssignment?.maxAttempts ?? 1} attemps</Text>
              </Text>
            } />
          </View>

          {/* Purple Tips Card */}
          <View style={tw`bg-[#EDE7FF] rounded-2xl p-4 mt-4`}>
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
            <TouchableOpacity style={tw`bg-[#EEEEEE] border border-[#E5E7EB] rounded-2xl px-3.5 py-4 flex-row items-center`} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={16} color="#111827" />
              <Text style={[tw`ml-2 text-black text-[12px]`]}>Go Back to Modules</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-[#7C5CFF] rounded-2xl px-4 py-3 flex-row items-center`} onPress={() => navigation.navigate('TestQuestion')}>
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
      <View style={tw`w-7 h-7 rounded-full bg-[#7C5CFF] items-center justify-center`}>
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



