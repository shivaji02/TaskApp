import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import { NavigationProp } from '@react-navigation/native';

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { state, dispatch } = useTimer();
  const [timers, setTimers] = useState(state.timers);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(state.timers.map((timer) =>
        timer.remaining > 0 ? { ...timer, remaining: timer.remaining - 1 } : timer
      ));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.timers]);

  // 🏷️ Sorting Function
  const getSortedTimers = () => {
    return [...timers].sort((a, b) => {
      if (state.sortBy === 'category') {return state.sortOrder === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);}
      if (state.sortBy === 'duration') {return state.sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration;}
      return state.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  };
console.log('>>>>>>>>HomeScreen.tsx',state);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Timers</Text>

      {/* 🔀 Sorting Header */}
      <View style={styles.sortHeader}>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'name', sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' } })}>
          <Text style={styles.sortText}>Name {state.sortBy === 'name' ? (state.sortOrder === 'asc' ? '▲' : '▼') : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'duration', sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' } })}>
          <Text style={styles.sortText}>Duration {state.sortBy === 'duration' ? (state.sortOrder === 'asc' ? '▲' : '▼') : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'category', sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' } })}>
          <Text style={styles.sortText}>Category {state.sortBy === 'category' ? (state.sortOrder === 'asc' ? '▲' : '▼') : ''}</Text>
        </TouchableOpacity>
      </View>

      {/* 🕒 Timer List */}
      <FlatList
        data={getSortedTimers()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.timerCard}>
            <Text>{item.name} - {item.remaining} sec</Text>
            <TouchableOpacity onPress={() => dispatch({ type: 'COMPLETE_TIMER', payload: item.id })}>
              <Text style={styles.completeButton}>✅ Mark Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ➕ Add Timer Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTimer')}>
        <Text style={styles.addButtonText}>➕ Add Timer</Text>
      </TouchableOpacity>

      {/* 📜 View History Button */}
      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyButtonText}>📜 View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sortHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  sortText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  timerCard: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  completeButton: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  historyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
