// import React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Tabs } from 'expo-router';
// import { useColorScheme } from '@/components/useColorScheme';
// import Colors from '@/constants/Colors';

// // Tab Bar Icon Component
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
// }

// // Main Tab Layout
// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         tabBarStyle: { backgroundColor: 'rgb(21, 154, 138)' }, // Custom background color
//         headerShown: true, // Hides the header
//       }}>
//       {/* Home Screen */} 
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
//         }}
//       />
//       {/* Calendar Screen */}
//       <Tabs.Screen
//         name="calendar"
//         options={{
//           title: 'Calendar',
//           tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
//         }}
//       />
//       {/* Charts Screen */}
//       <Tabs.Screen
//         name="charts"
//         options={{
//           title: 'Charts',
//           tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
//         }}
//       />
//       {/* Profile Screen */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }






// import React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Link, Tabs } from 'expo-router';
// import { Pressable } from 'react-native';

// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';
// import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         // Disable the static render of the header on web
//         // to prevent a hydration error in React Navigation v6.
//         headerShown: useClientOnlyValue(false, false),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Link href="/modal" asChild>
//               <Pressable>
//                 {({ pressed }) => (
//                   <FontAwesome
//                     name="info-circle"
//                     size={25}
//                     color={Colors[colorScheme ?? 'light'].text}
//                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//                   />
//                 )}
//               </Pressable>
//             </Link>
//           ),
//         }}
//       />
//       {/* <Tabs.Screen
//         name="two"
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       /> */}
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => {
//             console.log('Home Tab Rendered');
//             return <TabBarIcon name="home" color={color} />;
//           },
//         }}
//       />
//     </Tabs>
//   );
// }
