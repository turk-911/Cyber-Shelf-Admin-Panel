import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
interface Props {
    title: string;
    onPress: () => void;
    color?: string;
}
const CustomButton: React.FC<Props> = ({ title, onPress, color }) => {
    return(
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fefefe',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default CustomButton
