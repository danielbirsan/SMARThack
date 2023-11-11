import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OpenAI from "openai";
import "react-native-url-polyfill/auto";

const GPTreply = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchOpenAIResponse = async () => {
      try {
        const openai = new OpenAI({
          apiKey: "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",
        });

        const apiResponse = await openai.completions.create({
          model: "text-davinci-003",
          prompt:
            "Transform the following JSON:\n" +
            JSON.stringify({
              products: [
                { product_name: "Lapte Napolact 1.5L" },
                { product_name: "Napolitane Alfers" },
                { product_name: "Apa 5L" },
              ],
            }) +
            "\ninto a new json with the fields: “product_name_trimed” which excludes the quantity, “category” like vegetables, fruits, meat, alcohol, snacks and others, “health_id”, which ranges from 1 (bad for health) to 5 (good), “quantity”",
          temperature: 0.8,
          max_tokens: 512,
        });

        setResponse(apiResponse.choices[0]);
      } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
      }
    };

    fetchOpenAIResponse();
  }, []);

  return (
    <View>
      <Text style={styles.responseText}>
        {JSON.stringify(response) || "Loading..."}
      </Text>
    </View>
  );
};

/*console.log("Data:", response);
  try {
    return (
      <View>
        <Text style={styles.responseText}>Response</Text>
      </View>
    );
  } catch (error) {
    console.error("Error:", response);
  }
};*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  responseText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});