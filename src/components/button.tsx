import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    label: string;
    onClick: () => void;
    children?: React.ReactNode;
    style?: any;
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    children, 
    style 
}) => {
    return (
        <TouchableOpacity 
            onPress={onClick}
            style={[styles.button, style]}
        >
            <Text style={styles.buttonText}>
                {children || label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 195,
        height: 43,
        backgroundColor: 'rgba(0, 114, 42, 0.42)',
        borderRadius: 14,
        borderWidth: 3,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '600',
        letterSpacing: 0.56,
        textAlign: 'center',
    }
});

export default Button;