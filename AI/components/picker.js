// ImagePickerPage.js

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';

const PickerPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        const permissionStatus = await Permissions.check('photo');

        if (permissionStatus === 'denied') {
            requestCameraPermission();
        }
    };

    const requestCameraPermission = async () => {
        const permissionStatus = await Permissions.request('photo');

        if (permissionStatus === 'denied') {
            Alert.alert(
                'Permission Denied',
                'Please grant camera access to pick images.'
            );
        }
    };

    const handleImagePicker = async () => {
        try {
            const permissionStatus = await Permissions.check('photo');

            if (permissionStatus === 'authorized') {
                const image = await ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    compressImageQuality: 0.8,
                    includeBase64: true,
                });

                setSelectedImage({
                    uri: image.path,
                    base64: image.data,
                });
            } else {
                Alert.alert(
                    'Permission Denied',
                    'Please grant camera access to pick images.'
                );
            }
        } catch (error) {
            console.log('ImagePicker Error: ', error);
            Alert.alert('Error', 'Failed to pick an image. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
                <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>

            {selectedImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImage.uri }} style={styles.image} />
                </View>
            )}

            <Text style={styles.instructionText}>
                Tap the button to pick an image from your gallery.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 300,
        height: 400,
        borderRadius: 10,
    },
    instructionText: {
        marginTop: 20,
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default PickerPage;
