import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
    onClick: () => void;
    children?: React.ReactNode;
    style?: any;
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    variant = 'primary', 
    onClick, 
    children, 
    style
}) => {
    return (
        <TouchableOpacity 
            onPress={onClick}
            style={[styles.base, styles[variant], style]}
        >
            {(variant === 'secondary' || variant === 'tertiary') ? (
                <>
                    <Text style={[styles.baseText, styles[`${variant}Text`]]}>
                        {variant === 'secondary' ? 'View Lost\nItems' : 'Submit Lost\nItem'}
                    </Text>
                    <Image 
                        source={variant === 'secondary' 
                            ? require('../assets/icons/ViewLost.png')
                            : require('../assets/icons/SubmitLost.png')}
                        style={styles.secondaryImage}
                    />
                </>
            ) : variant === 'quaternary' ? (
                <View style={styles.quaternaryContainer}>
                    <Image 
                        source={require('../assets/icons/UserProfile.png')}
                        style={styles.smallQuaternaryImage}
                    />
                </View>
            ) : (
                <Text style={[styles.baseText, styles[`${variant}Text`]]}>
                    {children || label}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        width: 195,
        height: 43,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseText: {
        fontSize: 14,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '600',
        letterSpacing: 0.56,
        textAlign: 'center',
    },
    primary: {
        backgroundColor: 'rgba(0, 114, 42, 0.42)',
        borderWidth: 3,
        borderColor: 'white',
    },
    primaryText: {
        color: 'white',
    },
    secondary: {
        backgroundColor: '#00722A',
        borderWidth: 3,
        borderColor: '#00722A',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        gap: 16,
        width: 212,
        height: 155,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryText: {
        color: '#FCFCFC',
        fontSize: 20,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '700',
        letterSpacing: 0.8,
        textAlign: 'center',
    },
    secondaryImage: {
        width: 64,
        height: 51,
    },
    tertiary: {
        backgroundColor: '#00722A',
        borderWidth: 3,
        borderColor: '#00722A',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        gap: 16,
        width: 212,
        height: 155,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tertiaryText: {
        color: '#FCFCFC',
        fontSize: 20,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '700',
        letterSpacing: 0.8,
        textAlign: 'center',
    },
    quaternaryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 10,
    },
    smallQuaternaryImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    smallHamburgerIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
    },
    quaternaryText: {},
    quaternary: {
        backgroundColor: 'transparent',
    },
});

export default Button;