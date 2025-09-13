import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkOrders from '@/app/WorkOrders';
import SelectedItemsScreen from '@/app/supervisor-flow/selected-items';
import SupervisorEditScreen from '@/app/supervisor-flow/edit';
import EditTaskScreen from '@/app/supervisor-flow/edit-task';


const Stack = createStackNavigator();

const StackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="WorkOrders"
            component={WorkOrders}
            options={{ headerShown: false, title: 'Work Orders' }}
        />
        <Stack.Screen
            name="SupervisorSelectedItems"
            component={SelectedItemsScreen}
            options={{ headerShown: false, title: 'Selected Items' }}
        />
        <Stack.Screen
            name="SupervisorEdit"
            component={SupervisorEditScreen}
            options={{ headerShown: false, title: 'Edit Work Order' }}
        />
        <Stack.Screen
            name="SupervisorEditTask"
            component={EditTaskScreen}
            options={{ headerShown: false, title: 'Edit task' }}
        />
    </Stack.Navigator>
);

export default function App() {
    return (
        <NavigationContainer>
            <StackScreen />
        </NavigationContainer>
    );
}
