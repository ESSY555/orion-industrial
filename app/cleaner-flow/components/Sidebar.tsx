import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';

type SidebarItemKey = 'chemical' | 'feedback' | 'evident' | 'tasks' | 'lms' | 'logout';

export type SidebarProps = {
    isOpen?: boolean;
    onToggle?: (open: boolean) => void;
    onSelect?: (key: SidebarItemKey) => void;
    initialActive?: SidebarItemKey;
};

const ACTIVE_COLOR = '#8B4CE8';
const ICON_MUTED = '#6B7280';

export default function Sidebar({ isOpen = false, onToggle, onSelect, initialActive = 'chemical' }: SidebarProps) {
    const [open, setOpen] = useState<boolean>(isOpen);
    const slide = useRef(new Animated.Value(isOpen ? 1 : 0)).current; // 0: closed, 1: open
    const backdropOpacity = slide.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
    const sidebarX = slide.interpolate({ inputRange: [0, 1], outputRange: [-240, 0] });
    const [active, setActive] = useState<SidebarItemKey>(initialActive);

    const items = useMemo(
        () => [
            { key: 'chemical' as const, label: 'Chemical', icon: 'flask-outline' },
            { key: 'feedback' as const, label: 'Feedback', icon: 'chatbubbles-outline' },
            { key: 'evident' as const, label: 'Cleaner Evident', icon: 'camera-outline' },
            { key: 'tasks' as const, label: 'Tasks Overview', icon: 'list-outline' },
            { key: 'lms' as const, label: 'LMS', icon: 'school-outline' },
            { key: 'logout' as const, label: 'Logout', icon: 'log-out-outline' },
        ],
        []
    );

    useEffect(() => {
        setOpen(isOpen);
        Animated.timing(slide, {
            toValue: isOpen ? 1 : 0,
            duration: 260,
            easing: isOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    function handleToggle() {
        const next = !open;
        setOpen(next);
        onToggle?.(next);
        Animated.timing(slide, {
            toValue: next ? 1 : 0,
            duration: 260,
            easing: next ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }

    function handleSelect(key: SidebarItemKey) {
        setActive(prev => (prev === key ? prev : key));
        if (key === 'logout') {
            onToggle?.(false);
            setOpen(false);
            Animated.timing(slide, { toValue: 0, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() => {
                router.replace('/login');
            });
            return;
        }
        onSelect?.(key);
    }

    return (
        <View pointerEvents={open ? 'auto' : 'none'} style={[styles.wrapper, open ? styles.wrapperOpen : undefined]}> 
            <Animated.View
                pointerEvents={open ? 'auto' : 'none'}
                style={[styles.backdrop, { opacity: backdropOpacity }]}
            >
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => { setOpen(false); onToggle?.(false); }} />
            </Animated.View>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarX }] }]}> 
                <TouchableOpacity accessibilityRole="button" onPress={handleToggle} style={[styles.toggleButton, tw`mt-5`]}>
                    <Ionicons name={open ? 'close' : 'menu'} size={18} color="#111827" />
                </TouchableOpacity>

                <View style={[tw``]}>
                   <View
                   > <Text style={[tw`text-black font-bold text-[18px] text-center py-3`]}>Cleaner Tabs</Text>
                   
                   </View>
                    {items.map(item => {
                        const isActive = active === item.key;
                        const backgroundColor = isActive ? ACTIVE_COLOR : '#FFFFFF';
                        const color = isActive ? '#FFFFFF' : '#111827';
                        const iconColor = isActive ? '#FFFFFF' : ICON_MUTED;
                        return (
                            <TouchableOpacity
                                key={item.key}
                                accessibilityRole="button"
                                onPress={() => handleSelect(item.key)}
                                style={[styles.button, { backgroundColor }]}
                            >
                                <Ionicons name={item.icon as any} size={18} color={iconColor} />
                                <Text style={[styles.buttonText, { color }]}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 0,
        zIndex: 2000,
    },
    wrapperOpen: {
        width: width, // allow overlay capture if needed
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.12)',
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 240,
        backgroundColor: '#F9FAFB',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
        paddingTop: 20,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    sidebarOpen: {},
    toggleButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ECECEC',
    },
    buttonText: {
        marginLeft: 10,
        fontWeight: '700',
    },
});


