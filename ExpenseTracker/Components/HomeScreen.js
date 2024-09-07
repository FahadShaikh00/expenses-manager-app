import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getUserInfo } from '../jwtHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
      console.log("on homescreen", info);
    };

    fetchUserInfo();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('jwt_token');
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login'); // Navigate to the Login screen after logout
  };

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const handleAddIncome = () => {
    setModalVisible(false);
    navigation.navigate('Income'); // Navigate to Add Income screen
  };

  const handleAddExpense = () => {
    setModalVisible(false);
    navigation.navigate('AddExpense'); // Navigate to Add Expense screen
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          {/* <Text>{userInfo?.username}</Text> */}
        </View>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>October</Text>
          <FontAwesome name="angle-down" size={24} color="black" />
        </View>
        <TouchableOpacity>
          <MaterialIcons name="logout" size={24} color="black" onPress={handleLogout} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Account Balance</Text>
        <Text style={styles.balanceValue}>$9400</Text>
      </View>

      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeContainer}>
          <Text style={styles.incomeLabel}>Income</Text>
          <Text style={styles.incomeValue}>$5000</Text>
        </View>
        <View style={styles.expenseContainer}>
          <Text style={styles.expenseLabel}>Expenses</Text>
          <Text style={styles.expenseValue}>$1200</Text>
        </View>
      </View>

      <View style={styles.spendFrequencyContainer}>
        <Text style={styles.spendFrequencyLabel}>Spend Frequency</Text>
        <View style={styles.graphPlaceholder}></View>
      </View>

      <View style={styles.transactionContainer}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionHeaderLabel}>Recent Transaction</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionIconContainer}>
            <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Shopping</Text>
            <Text style={styles.transactionSubtitle}>Buy some grocery</Text>
          </View>
          <Text style={styles.transactionAmount}>- $120</Text>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionIconContainer}>
            <MaterialCommunityIcons name="netflix" size={24} color="black" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Subscription</Text>
            <Text style={styles.transactionSubtitle}>Disney+ Annual...</Text>
          </View>
          <Text style={styles.transactionAmount}>- $80</Text>
        </View>

        <View style={styles.transactionItem}>
          <View style={styles.transactionIconContainer}>
            <MaterialCommunityIcons name="food" size={24} color="black" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Food</Text>
            <Text style={styles.transactionSubtitle}>Buy a ramen</Text>
          </View>
          <Text style={styles.transactionAmount}>- $32</Text>
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="compare-arrows" size={24} color="black" />
          <Text>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleAddButtonPress}>
          <FontAwesome name="plus-circle" size={40} color="purple" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="finance" size={24} color="black" />
          <Text>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user" size={24} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddIncome}>
              <Text style={styles.modalButtonText}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleAddExpense}>
              <Text style={styles.modalButtonText}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    marginRight: 5,
  },
  notificationIcon: {
    marginLeft: 'auto',
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  balanceLabel: {
    fontSize: 18,
    color: '#888',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeContainer: {
    backgroundColor: '#d4f8e8',
    padding: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  incomeLabel: {
    fontSize: 18,
    color: '#00c853',
  },
  incomeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00c853',
  },
  expenseContainer: {
    backgroundColor: '#ffd1d1',
    padding: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  expenseLabel: {
    fontSize: 18,
    color: '#d32f2f',
  },
  expenseValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  spendFrequencyContainer: {
    marginVertical: 20,
  },
  spendFrequencyLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  graphPlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  transactionContainer: {
    marginVertical: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionHeaderLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: 'purple',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  transactionIconContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionSubtitle: {
    color: '#888',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'purple',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
