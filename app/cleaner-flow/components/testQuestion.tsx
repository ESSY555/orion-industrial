import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Tailwind-only: removed StyleSheet and unused UiButton
import { mockCourseWithAssignment } from '@/db/mock-db';

type Question = {
  text: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    text:
      'When using SK-250 for heavy soil cleaning, which of the following safety equipment is required? (Select all that apply)',
    options: ['2.23', '1.16', '5.95', '1.34'],
  },
  {
    text: 'What is the recommended dilution ratio for general cleaning with SK-250?',
    options: ['1:64', '1:128', '1:32', '1:8'],
  },
  {
    text: 'Which step should be performed BEFORE applying SK-250 to a surface?',
    options: ['Rinse with hot water', 'Don PPE', 'Turn off ventilation', 'Dilute with oil'],
  },
  {
    text: 'Select the correct storage guideline for SK-250:',
    options: ['Store near heat', 'Keep sealed and labeled', 'Expose to sunlight', 'Mix with acids'],
  },
];

// Right answers for the mock (same index order as QUESTIONS)
const RIGHT_ANSWERS: string[] = [
  '1.16',     // for Q1
  '1:128',    // for Q2
  'Don PPE',  // for Q3
  'Keep sealed and labeled', // for Q4
];

export default function TestQuestion() {
  const navigation = useNavigation<any>();
    const { username } = useLocalSearchParams<{ username?: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedByIndex, setSelectedByIndex] = useState<Record<number, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalDurationSec = (mockCourseWithAssignment.assessmentDuration || 0) * 60;
  const [remainingSec, setRemainingSec] = useState<number>(totalDurationSec);

  useLayoutEffect(() => {
    // @ts-ignore
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const total = QUESTIONS.length;
  const q = QUESTIONS[currentIndex];
  const selected = selectedByIndex[currentIndex] ?? null;
  const setSelected = (opt: string) => setSelectedByIndex((prev) => ({ ...prev, [currentIndex]: opt }));
  const progressPct = Math.round(((currentIndex + 1) / total) * 100);
  const isLast = currentIndex === total - 1;

    const CERTS_KEY = 'sanitrack:certificates';
    const addCertificate = async (title: string) => {
        try {
            const now = new Date();
            const date = `Completed: ${now.toLocaleString(undefined, { month: 'short' })} ${now.getDate()}, ${now.getFullYear()}`;
            const raw = (await AsyncStorage.getItem(CERTS_KEY)) || '[]';
            const parsed: { title: string; date: string }[] = JSON.parse(raw);
            const exists = parsed.some((c) => c.title === title);
            const next = exists ? parsed : [{ title, date }, ...parsed].slice(0, 10);
            await AsyncStorage.setItem(CERTS_KEY, JSON.stringify(next));
        } catch { }
    };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const total = QUESTIONS.length;
    const chosen = Array.from({ length: total }, (_, idx) => selectedByIndex[idx] ?? null);
    const correct = chosen.reduce((acc, ans, idx) => (ans === RIGHT_ANSWERS[idx] ? acc + 1 : acc), 0);
    const pct = (correct / total) * 100;
    Alert.alert('Result', `Score: ${Math.round(pct)}%`, [
      {
        text: 'OK',
        onPress: () => {
          setSelectedByIndex({});
          setCurrentIndex(0);
          if (pct >= 70) {
            (async () => {
              await addCertificate('Chemical Handling Sk-148');
              router.push({ pathname: '/cleaner-flow/certification', params: { username: username ? String(username) : undefined } });
            })();
          }
        },
      },
    ]);
  };

  // countdown effect
  React.useEffect(() => {
    if (submitted) return;
    if (remainingSec <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => {
      setRemainingSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [remainingSec, submitted]);

  return (
    <View style={[tw`flex-1 bg-[#F7F7F7]`]}>
      {/* Header */}
      <View style={[tw`px-4 pt-14 flex-row items-center justify-between`]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-9 h-9 rounded-full bg-white items-center justify-center`}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={[tw`text-black font-bold text-[18px]`]}>Question {currentIndex + 1} of {total}</Text>
        <View style={tw`w-9 h-9 rounded-full bg-white items-center justify-center flex-row`}>
          <Ionicons name="time-outline" size={16} color="#111827" />
          <Text style={[tw`ml-1 text-black`, { fontSize: 12 }]}>{formatTime(remainingSec)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={[tw`px-4 pt-12`]}>
          {/* Progress */}
          <View style={tw`h-2 bg-[#E5E7EB] rounded-lg overflow-hidden`}>
            <View style={[tw`h-2 bg-[#7C5CFF] rounded-lg` as any, { width: `${progressPct}%` }]} />
          </View>

          {/* Question Text */}
          <Text style={[tw`text-black mt-4`, { fontSize: 15, lineHeight: 22 }]}>{q.text}</Text>

          {/* Options */}
          <View style={[tw`mt-4`]}>
            {q.options.map((opt) => {
              const isSelected = selected === opt;
              return (
                <TouchableOpacity key={opt} onPress={() => setSelected(opt)} style={tw.style('rounded-2xl py-4 px-4 mt-3 flex-row items-center justify-between', isSelected ? 'bg-[#E8DDFE] border-2 border-[#7C5CFF]' : 'bg-white border border-[#E5E7EB]')}>
                  <Text style={[tw`text-black`, { fontSize: 14 }]}>{opt}</Text>
                  <View style={tw.style('w-7 h-7 rounded-full items-center justify-center', isSelected ? 'bg-[#7C5CFF]' : 'bg-[#F1F0F5]')}>
                    {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[tw`mt-6 flex-row items-center justify-between`]}>
            <TouchableOpacity
              style={tw`bg-[#EEEEEE] border border-[#E5E7EB] rounded-2xl px-3.5 py-2.5 flex-row items-center`}
              onPress={() => setCurrentIndex((i) => (i > 0 ? i - 1 : 0))}
              disabled={currentIndex === 0}
            >
              <Ionicons name="chevron-back" size={16} color="#2D1B3D" />
              <Text style={[tw`ml-2`, { color: '#2D1B3D', fontWeight: '600', fontSize: 12 }]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style('bg-[#7C5CFF] rounded-2xl px-4 py-3 flex-row items-center', !selected && 'opacity-50')}
              disabled={!selected}
              onPress={() => {
                if (!isLast) {
                  setCurrentIndex((i) => (i < total - 1 ? i + 1 : i));
                  return;
                }
                handleSubmit();
              }}
            >
              <Text style={[tw`mr-2`, { color: '#FFFFFF', fontWeight: '700', fontSize: 12 }]}>{isLast ? 'Submit' : 'Next Question'}</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Tailwind-only: StyleSheet removed


