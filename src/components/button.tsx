import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import UserPalette from '../constants/UserPalette';

interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary' | 'editButtons' | 'approveButton';
    onClick: () => void;
    children?: React.ReactNode;
    style?: any;
    color?: string;
    isAdmin?: boolean;
    editText?: string;
    editBackgroundColor?: string;
    editIcon?: any;
    icon?: any;
}

const Button: React.FC<ButtonProps> = ({ 
    label,
    variant = 'primary',
    onClick,
    children,
    style,
    color = '#00722A',
    isAdmin = false,
    editText,
    editBackgroundColor,
    editIcon,
}) => {
    return (
        <TouchableOpacity 
            onPress={onClick}
            style={[
                styles.base, 
                styles[variant], 
                (variant === 'secondary' || variant === 'tertiary' || variant === 'quinary') ? { backgroundColor: color, borderColor: color } : {},
                variant === 'editButtons' && editBackgroundColor ? { backgroundColor: editBackgroundColor } : {},
                style
            ]}
        >
            {(variant === 'secondary' || variant === 'tertiary' || variant === 'quinary') ? (
                <>
                    <Text style={[styles.baseText, styles[`${variant}Text`]]}>
                        {variant === 'secondary' ? 'View Lost\nItems' : variant === 'tertiary' ? 'Submit Lost\nItem' : 'View & Edit\nLost Items'}
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
            ) : variant === 'editButtons' ? (
                <View style={styles.editButtonsContainer}>
                    <View style={styles.editButtonsInnerContainer}>
                        {editIcon && <Image source={editIcon} style={styles.editButtonIcon} resizeMode="contain" />}
                        <Text style={styles.editButtonsText}>
                            {editText || 'Default Edit Text'}
                        </Text>
                    </View>
                </View>
            ) : variant === 'approveButton' ? (
                <View style={styles.approveButtonContainer}>
                    <Text style={[styles.baseText, styles.approveButtonText]}>
                        {children || label}
                    </Text>
                    <Image 
                        source={require('../assets/icons/ApproveItemIcon.png')}
                        style={styles.approveButtonIcon}
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
        backgroundColor: UserPalette.blue,
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
        backgroundColor: UserPalette.blue,
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
    editButtons: {
        width: 136,
        height: 100,
        paddingHorizontal: 19,
        paddingVertical: 16,
        backgroundColor: '#1e753e',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2.5,
    },
    editButtonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18,
        height: 63.74,
    },
    editButtonsText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '600',
        letterSpacing: 0.8,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    editButtonsInnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    approveButtonContainer: {
        backgroundColor: UserPalette.blue,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        gap: 16,
        width: 212,
        height: 155,
        justifyContent: 'center',
        alignItems: 'center',
    },
    approveButtonIcon: {
        width: 67,
        height: 60,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    approveButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Ubuntu Sans',
        fontWeight: '700',
        letterSpacing: 0.8,
        textAlign: 'center',
        alignSelf: 'stretch',
        marginTop: 30,
    },
});

export default Button;