import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import '@/components/GlobalFont';
import { Stack, usePathname } from 'expo-router';
import MenuBar from '@/components/MenuBar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { View, DeviceEventEmitter, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Sidebar from '@/app/cleaner-flow/components/Sidebar';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Optional: if you add SF Pro TTFs, load and name them 'SF Pro'
    // 'SF Pro': require('../assets/fonts/SF-Pro.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const isLogin = pathname === '/login' || pathname === 'login' || pathname?.endsWith('/login');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const openSub = DeviceEventEmitter.addListener('sidebar:open', () => setSidebarOpen(true));
    const closeSub = DeviceEventEmitter.addListener('sidebar:close', () => setSidebarOpen(false));
    const toggleSub = DeviceEventEmitter.addListener('sidebar:toggle', () => setSidebarOpen(prev => !prev));
    return () => {
      openSub.remove();
      closeSub.remove();
      toggleSub.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
          {!isLogin && <MenuBar />}
          {!isLogin && (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => DeviceEventEmitter.emit('sidebar:open')}
              style={{ position: 'absolute', left: 16, top: 90, width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 3 }}
            >
              <Ionicons name="menu" size={18} color="#111827" />
            </TouchableOpacity>
          )}
          {!isLogin && (
            <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} onSelect={() => setSidebarOpen(false)} />
          )}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
