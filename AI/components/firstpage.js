// WelcomePage.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PickerPage from './picker';
const WelcomePage = ({ navigation }) => {
    const handleGetStarted = () => {
        navigation.navigate('PickerPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sanatate</Text>
            <Text style={styles.message}>Incarca bonurile!</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Incepe acum</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({


    body:
    {
        backgroundColor: '#F5FCFF',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        paddingHorizontal: 20,

        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    buttonContainer: {
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    buttonText: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomePage;
