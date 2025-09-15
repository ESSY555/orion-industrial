import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';

type Person = {
  name: string;
  status: string;
  start: string;
  end: string;
  assets: string[];
  frequency: string;
  duration: string | number;
};

type SummaryCardProps = {
  person: Person;
};

export default function SummaryCard({ person }: SummaryCardProps) {
  return (
    <View style={tw`px-4`}>
      <View style={[tw`rounded-2xl overflow-hidden`, shadow()]}>
        <BlurView intensity={40} tint="light" style={tw`rounded-2xl bg-white/50`}>
          <View style={[tw`rounded-2xl p-4`]}>
            {/* Name */}
            <Text style={[tw`text-black mb-3`, { fontWeight: '800', fontSize: 18 }]}>
              {person.name}
            </Text>

            {/* Cleaning status with green text */}
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <Text style={mutedLabel()}>Cleaning Status</Text>
              <Text style={{ color: '#22C55E', fontSize: 13, fontWeight: '600' }}>
                {person.status}
              </Text>
            </View>

            {/* Times */}
            <Row label="Start Time" value={person.start} />
            <Row label="End Time" value={person.end} />

            {/* Assets */}
            <View style={tw`flex-row items-center justify-between mt-1 mb-2`}>
              <Text style={mutedLabel()}>Assets Cleaned</Text>
              <View style={tw`flex-row items-center`}>
                {person.assets.map((a, i) => (
                  <View key={i} style={tw`flex-row items-center ml-3`}>
                    <Ionicons name="cube-outline" size={14} color="#6B7280" />
                    <Text style={[tw`text-gray-700 ml-1`, { fontSize: 13 }]}>{a}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Frequency & Duration */}
            <Row label="Frequency" value={person.frequency} />
            <Row label="Duration" value={person.duration} />
          </View>
        </BlurView>
      </View>
    </View>
  );
}

type RowProps = { label: string; value: string | number };

const Row: React.FC<RowProps> = ({ label, value }) => (
  <View style={tw`flex-row items-center justify-between mb-2`}>
    <Text style={mutedLabel()}>{label}</Text>
    <Text style={{ color: '#111827', fontSize: 13, fontWeight: '600' }}>{String(value)}</Text>
  </View>
);

function mutedLabel() {
  return { color: '#6B7280', fontSize: 13 } as const;
}

function shadow() {
  return {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  } as const;
}
