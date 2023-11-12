import React, { useStat, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

const Dialog = ({ isVisible, onClose, jsondata }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await jsondata;
        // Handle the data as needed
        console.log(data);
      } catch (error) {
        // Handle errors if necessary
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Cleanup logic here
    };
  }, [isVisible, onClose, jsondata]);

  const productList = jsondata.products;

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.product_name_trimmed}</Text>
      <Text style={styles.tableCell}>{item.category}</Text>
      <Text style={styles.tableCell}>{item.health_id}</Text>
      <Text style={styles.tableCell}>{item.quantity}</Text>
    </View>
  );
  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
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

          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: "blue", marginTop: 10 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    display: "none",
    padding: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },
  tableHeaderText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});
