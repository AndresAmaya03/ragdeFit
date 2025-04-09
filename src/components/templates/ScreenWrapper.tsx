import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: any;
    scrollable?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    style,
    scrollable = false,
}) => {
    const Content = scrollable ? ScrollView : View;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Content
                    style={[styles.container, style]} // Apply default and custom styles
                    contentContainerStyle={scrollable ? styles.scrollContent : undefined}
                >
                    {children}
                </Content>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        flexGrow: 1,
    },
});