import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
    onClick: () => void;
    children?: React.ReactNode;
    style?: any;
    color?: string;
    isAdmin?: boolean; //change between UserProfile and UserAdminProfile pictures
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    variant = 'primary', 
    onClick, 
    children, 
    style,
    color = '#00722A',
    isAdmin = false
}) => {
    return (
        <TouchableOpacity 
            onPress={onClick}
            style={[
                styles.base, 
                styles[variant], 
                (variant === 'secondary' || variant === 'tertiary' || variant === 'quinary') ? { backgroundColor: color, borderColor: color } : {},
                style
            ]}
        >
            {(variant === 'secondary' || variant === 'tertiary' || variant === 'quinary') ? (
                <>
                    <Text style={[styles.baseText, styles[`${variant}Text`]]}>
                        {variant === 'secondary' ? 'View Lost\nItems' : variant === 'tertiary' ? 'Submit Lost\nItem' : 'Edit Lost\nItems'}
                    </Text>
                    <Image 
                        source={variant === 'secondary' 
                            ? require('../assets/icons/ViewLost.png')
                            : variant === 'tertiary' 
                            ? require('../assets/icons/SubmitLost.png')
                            : require('../assets/icons/EditLost.png')}
                        style={[styles.secondaryImage, variant === 'quinary' && styles.editLostImage]}
                    />
                </>
            ) : variant === 'quaternary' ? (
                <View style={styles.quaternaryContainer}>
                    <Image 
                        source={isAdmin 
                            ? require('../assets/icons/UserAdminProfile.png') 
                            : require('../assets/icons/UserProfile.png')}
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
    quinary: {
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
    quinaryText: {
        color: '#FCFCFC',
        fontSize: 20,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '700',
        letterSpacing: 0.8,
        textAlign: 'center',
    },
    editLostImage: {
        resizeMode: 'contain',
    },
});

export default Button;