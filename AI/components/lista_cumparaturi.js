import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';

const FlatListBasics = () => {
  const jsonData = {
  "products": [
    {
      "product_name_trimmed": "Lapte Napolact",
      "category": "dairy",
      "health_id": 4,
      "quantity": "1.5L"
    },
    {
      "product_name_trimmed": "Napolitane Alfers",
      "category": "snacks",
      "health_id": 3,
      "quantity": null
    },
    {
      "product_name_trimmed": "Apa",
      "category": "beverage",
      "health_id": 5,
      "quantity": "5L"
    }
  ]
};

const productList = jsonData.products;

  // renderItem function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.product_name_trimmed}</Text>
      <Text style={styles.tableCell}>{item.category}</Text>
      <Text style={styles.tableCell}>{item.health_id}</Text>
      <Text style={styles.tableCell}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Product</Text>
        <Text style={styles.tableHeaderText}>Category</Text>
        <Text style={styles.tableHeaderText}>Health ID</Text>
        <Text style={styles.tableHeaderText}>Quantity</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item.product_name_trimmed}
      />
    </View>
  );
};

export default FlatListBasics;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});