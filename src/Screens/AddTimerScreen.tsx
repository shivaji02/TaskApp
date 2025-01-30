import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import uuid from 'react-native-uuid'; // Ensure you're using react-native-uuid

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  AddTimer: undefined;
};

type AddTimerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTimer'>;

const AddTimerScreen = ({ navigation }: { navigation: AddTimerScreenNavigationProp }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useTimer();

  const handleSubmit = () => {
    if (!name.trim() || !duration.trim() || !category.trim()) {
      setError('⚠ Please fill all fields');
      return;
    }
    if (isNaN(Number(duration)) || Number(duration) <= 0) {
      setError('⚠ Duration must be a positive number');
      return;
    }

    const newTimer = {
      id: uuid.v4(),
      name,
      duration: Number(duration),
      remaining: Number(duration),
      category,
      status: 'paused' as 'paused',
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });

    // ✅ Move directly to Home Screen after adding
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create New Timer</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput style={styles.input} placeholder="Timer Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Duration (seconds)" keyboardType="numeric" value={duration} onChangeText={setDuration} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 15, backgroundColor: '#fff' },
  submitButton: { backgroundColor: '#2ECC71', padding: 15, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginBottom: 10, padding: 10 },
  backButtonText: { fontSize: 16, color: '#007BFF' },
  errorText: { color: '#E74C3C', fontSize: 14, marginBottom: 15, textAlign: 'center' },
});

export default AddTimerScreen;
