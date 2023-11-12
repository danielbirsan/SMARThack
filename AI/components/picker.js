import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Dialog from "../components/dialog";
import GPTreply, { getData } from "../components/ai";

export default function ImageUpload() {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const [file, setFile] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        setFile(result.assets[0].uri);

        // Send the selected image to the server
        console.log(result.log);
        sendImageToServer(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to pick an image.");
    }

    openDialog();
  };

  const response_global = null;

  const sendImageToServer = async (imageUri) => {
    try {
      const apiUrl = "https://ab97-81-196-9-50.ngrok.io/image"; // Replace with your server endpoint

      const formData = new FormData();
      formData.append("photo", {
        uri: imageUri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle the success response from the server
        console.log("Image uploaded successfully!");
        response_global = response;
      } else {
        // Handle server error or other issues
        console.error("Failed to upload image to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to send image to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Dialog
        isVisible={isDialogVisible}
        onClose={closeDialog}
        jsondata={
          GPTreply(sendImageToServer(response_global)).getData() || {
            products: [
              {
                product_name_trimmed: "Loading...",
                category: "Loading...",
                health_id: "Loading...",
                quantity: "Loading...",
              },
            ],
          }
        }
      />
      <Text style={styles.header}>Add Image:</Text>

      {/* Button to choose image */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      {/* Conditionally render the image or error message */}
      {file ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: file }} style={styles.image} />
        </View>
      ) : (
        <Text style={styles.errorText}></Text>
      )}
    </View>
  );
}

// return (
//     <View style={styles.container}>
//         <Text style={styles.header}>Add Images:</Text>

//         {/* Button to choose images */}
//         <TouchableOpacity style={styles.button} onPress={pickImage}>
//             <Text style={styles.buttonText}>Choose Images</Text>
//         </TouchableOpacity>

//         {/* Conditionally render the images or error message */}
//         {files.length > 0 ? (
//             <View style={styles.imageContainer}>
//                 {files.map((file, index) => (
//                     <Image key={index} source={{ uri: file.uri }} style={styles.image} />
//                 ))}
//             </View>
//         ) : (
//             <Text style={styles.errorText}></Text>
//         )}
//     </View>
// );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",

    justifyContent: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
    margin: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});
