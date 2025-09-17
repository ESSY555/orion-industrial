import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

type TimeRow = {
  id: string;
  label: string;
  optional?: boolean;
};

const rows: TimeRow[] = [
  { id: 'r1', label: 'Release to Sanitation' },
  { id: 'r2', label: 'Ready to QA' },
  { id: 'r3', label: 'QA Start Pre-op' },
  { id: 'r4', label: 'QA Finish Pre-op' },
  { id: 'r5', label: 'Time USDA', optional: true },
  { id: 'r6', label: 'Released to Production' },
];

function CurrentTimeButton({ onNow }: { onNow: () => void }) {
  return (
    <Pressable
      onPress={onNow}
      style={{
        borderWidth: 1,
        borderColor: '#7B61FF',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: '#7B61FF', fontWeight: '700' }}>Current Time</Text>
    </Pressable>
  );
}

export default function StepThree() {
  const [values, setValues] = useState<Record<string, string>>({});

  const setNow = (id: string) => {
    const d = new Date();
    const hh = `${d.getHours()}`.padStart(2, '0');
    const mm = `${d.getMinutes()}`.padStart(2, '0');
    setValues((p) => ({ ...p, [id]: `${hh}:${mm}` }));
  };

  return (
    <View style={[{ flex: 1, paddingBottom: 100 }, tw`bg-[#FFFFFF]`]}>
      <Text style={{ marginTop: 12, fontSize: 18, fontWeight: '800', color: '#2B2B2E' }}>Fresh Kitchen</Text>

      <View style={{ marginTop: 10, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 10 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {rows.map((row) => (
            <View key={row.id} style={{ marginBottom: 14 }}>
              <Text style={{ color: '#6C6F7A', marginBottom: 8 }}>
                {row.label}
                {row.optional ? ' (Optional)' : ''}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#E5E6EC',
                    backgroundColor: '#F9F9FB',
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Ionicons name="time-outline" size={16} color="#6C6F7A" />
                  <TextInput
                    placeholder="00:00"
                    value={values[row.id] ?? ''}
                    onChangeText={(t) => setValues((p) => ({ ...p, [row.id]: t }))}
                    style={{ marginLeft: 8, fontWeight: '700', color: '#2B2B2E', paddingVertical: 0 }}
                  />
                </View>
                <CurrentTimeButton onNow={() => setNow(row.id)} />
              </View>
            </View>
          ))}

<View style={[{ marginTop: 12, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, tw`mb-28`]}>
        <View>
          <Text style={{ color: '#6C6F7A' }}>Total Duration</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#2B2B2E' }}>0 hrs 0 mins</Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: '#E5E6EC', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 12 }}>
          <Text style={{ color: '#6C6F7A', fontWeight: '700' }}>Not Done</Text>
        </View>
      </View>
        </ScrollView>
      </View>

     
    </View>
  );
}


