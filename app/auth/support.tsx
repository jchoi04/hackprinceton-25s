// src/pages/Support.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types'; // Adjust the path to your types file if needed

type SupportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Support'>;

const Support = ({ navigation }: { navigation: SupportScreenNavigationProp }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Support Circle</Text>
        <Text style={styles.subtitle}>
          View your connected caregivers and family at a glance.
        </Text>
        <View style={styles.circle}>
          <View style={styles.user}>
            <View style={styles.profilePicture} />
            <Text style={styles.userName}>Mark Zuckerman</Text>
            <Text style={styles.userRelation}>Son</Text>
          </View>
          <View style={styles.user}>
            <View style={styles.profilePicture} />
            <Text style={styles.userName}>Mark Zuckerberg</Text>
            <Text style={styles.userRelation}>Personal Attendant</Text>
          </View>
        </View>
        <Text style={styles.blurb}>
          Click on any user to learn more.
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Navigate to Add User screen
            navigation.navigate('AddUser');
          }}
        >
          <Text style={styles.addButtonText}>Add Another User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#98BC9C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#98BC9C',
    marginBottom: 24,
    textAlign: 'center',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FFAFA3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  user: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userRelation: {
    fontSize: 12,
    color: '#555',
  },
  blurb: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#98BC9C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Support;
