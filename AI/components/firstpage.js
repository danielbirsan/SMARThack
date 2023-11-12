// WelcomePage.js

import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageUpload from './picker';
import GPTreply from './ai';
import FlatListBasics from './lista_cumparaturi';
const WelcomePage = ({ navigation }) => {
    const handleGetStarted = () => {
        navigation.navigate('ImageUpload');
    };
    const handleGet = () => {
        navigation.navigate('FlatListBasics');
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://th.bing.com/th/id/R.8424e2aef278dbe74c9ea65670414e89?rik=hvio3bLfYPmjjw&riu=http%3a%2f%2fmarvlunreed.com%2fwp-content%2fuploads%2f2015%2f01%2fwelcome.jpg&ehk=pgBw%2fB1WM8i0jFdo1%2bcepNkMJvBlVf4XdQYXqFpkGaI%3d&risl=&pid=ImgRaw&r=0.jpeg' }}
                style={styles.image}
            />
            <Text style={styles.title}>BonScan</Text>
            <Text style={styles.message}>Incarca bonurile!</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Incepe acum</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleGet}>
                <Text style={styles.buttonText}>AI</Text>
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
        marginTop: 20,
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

    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover', // Adjust as needed: 'cover', 'contain', 'stretch', etc.
    },
});

export default WelcomePage;
