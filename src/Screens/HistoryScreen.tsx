import React from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import { NavigationProp } from '@react-navigation/native';

const HistoryScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { state, dispatch } = useTimer();

  const getSortedHistory = () => {
    return [...state.history].sort((a, b) => {
      if (state.sortBy === 'category') {return state.sortOrder === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);}
      if (state.sortBy === 'completedAt') {return state.sortOrder === 'asc' ? new Date(a.completedAt ?? 0).getTime() - new Date(b.completedAt ?? 0).getTime() : new Date(b.completedAt ?? 0).getTime() - new Date(a.completedAt ?? 0).getTime();}
      return state.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  };
  return (
    <View style={styles.container}>
     

      <View style={styles.sortHeader}>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'name', sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' } })}>
          <Text style={styles.sortText}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'category', sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' } })}>
          <Text style={styles.sortText}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'completedAt', sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' } })}>
          <Text style={styles.sortText}>Completed Time</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getSortedHistory()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>{item.name} - Completed at {new Date(item.completedAt ?? 0).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  justifyContent: 'space-between',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
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
});

export default HistoryScreen;
