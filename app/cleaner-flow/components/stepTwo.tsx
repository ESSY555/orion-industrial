import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Area = {
  id: string;
  name: string;
  subtitle?: string;
  status?: 'normal' | 'overdue' | 'scheduled' | 'priority';
  checked?: boolean;
  disabled?: boolean;
};

function Checkbox({ checked, disabled }: { checked?: boolean; disabled?: boolean }) {
  return (
    <View
      style={{
        height: 28,
        width: 28,
        borderRadius: 8,
        borderWidth: checked ? 0 : 2,
        borderColor: disabled ? '#D7D7DC' : '#CFCFD6',
        backgroundColor: checked ? '#7B61FF' : disabled ? '#E9E9EE' : '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {checked ? <Ionicons name="checkmark" size={16} color="#FFFFFF" /> : null}
    </View>
  );
}

function AreaCard({ area, toggle }: { area: Area; toggle: (id: string) => void }) {
  const isSelected = Boolean(area.checked);
  const isDisabled = Boolean(area.disabled);
  const bg = isDisabled ? '#E7E7EC' : isSelected ? '#E9E1FF' : '#FFFFFF';
  const border = isDisabled ? '#E7E7EC' : isSelected ? '#7B61FF' : '#E5E6EC';
  const subtitleColor = isDisabled ? '#8F9098' : isSelected ? '#6C6F7A' : '#9A9AA3';

  const statusText = useMemo(() => {
    if (area.status === 'overdue') return 'Overdue for cleaning';
    if (area.status === 'scheduled') return area.subtitle ?? 'Scheduled';
    if (area.status === 'priority') return 'Priority Area';
    return area.subtitle ?? '';
  }, [area]);

  const statusColor =
    area.status === 'overdue' ? '#E93B3B' : area.status === 'priority' ? '#E2A400' : subtitleColor;

  return (
    <Pressable
      onPress={() => (isDisabled ? undefined : toggle(area.id))}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 16,
        backgroundColor: bg,
        borderWidth: isSelected ? 2 : 1,
        borderColor: border,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: isDisabled ? '#000' : 'transparent',
        shadowOpacity: isDisabled ? 0.06 : 0,
        shadowRadius: isDisabled ? 10 : 0,
        shadowOffset: isDisabled ? { width: 0, height: 4 } : { width: 0, height: 0 },
      }}
    >
      <View style={{ marginTop: 2 }}>
        <Checkbox checked={isSelected} disabled={isDisabled} />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: isDisabled ? '#4B4B52' : '#292933' }}>{area.name}</Text>
        {!!statusText && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            {area.status === 'overdue' && (
              <Ionicons name="warning-outline" size={14} color="#E93B3B" style={{ marginRight: 6 }} />
            )}
            <Text style={{ color: statusColor, fontSize: 13 }}>{statusText}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function StepTwo({ previousSelections = [], onSelectionChange }: { previousSelections?: Array<Pick<Area,'id'|'name'>>; onSelectionChange?: (combined: Array<Pick<Area,'id'|'name'>>) => void }) {
  const [areas, setAreas] = useState<Area[]>([
    { id: 'a1', name: 'Shelf', subtitle: 'Picked by Paul', disabled: true },
    { id: 'a2', name: 'Bench', subtitle: 'Last cleaned: 8 hours ago' },
    { id: 'a3', name: 'Sink', status: 'overdue' },
    { id: 'a4', name: 'Cabinet', status: 'scheduled', subtitle: 'Scheduled: 11:30 PM' },
    { id: 'a5', name: 'Table', status: 'priority', checked: true },
  ]);

  const toggle = (id: string) =>
    setAreas((prev) =>
      prev.map((a) => {
        if (a.disabled) return a;
        if (a.id === id) {
          // selecting one toggles others off
          return { ...a, checked: !a.checked };
        }
        return { ...a, checked: false };
      })
    );

  // Combine persisted selections from step 1 with current step selections
  const combinedSelections = useMemo(() => {
    const current = areas.filter((a) => a.checked).slice(0, 1).map((a) => ({ id: a.id, name: a.name }));
    const map = new Map<string, { id: string; name: string }>();
    previousSelections.forEach((p) => map.set(p.id, { id: p.id, name: p.name }));
    current.forEach((c) => map.set(c.id, c));
    return Array.from(map.values());
  }, [areas, previousSelections]);

  const lastSentRef = useRef<string>('');
  useEffect(() => {
    const json = JSON.stringify(combinedSelections);
    if (json !== lastSentRef.current) {
      lastSentRef.current = json;
      onSelectionChange?.(combinedSelections);
    }
  }, [combinedSelections, onSelectionChange]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '800', color: '#2B2B2E' }}>Select Asset</Text>
      <ScrollView style={{ marginTop: 14, backgroundColor: '#FFFFFF' }} contentInsetAdjustmentBehavior="always" contentContainerStyle={{ paddingBottom: 120 }}>
        {areas.map((area) => (
          <AreaCard key={area.id} area={area} toggle={toggle} />
        ))}
      </ScrollView>
    </View>
  );
}


