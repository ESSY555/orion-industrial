import React from 'react';
import StepTwo from './components/stepTwo';
import { useLocalSearchParams } from 'expo-router';

export default function StepTwoScreen() {
  const params = useLocalSearchParams<{ selectedCount?: string }>();
  const selected = Number(params.selectedCount ?? '0');
  return <StepTwo selectedCount={isNaN(selected) ? 0 : selected} />;
}


