// src/components/CategorySection.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import TimerItem from './TimerItem';
import { Timer } from '../types/timerTypes';

type CategorySectionProps = {
  category: string;
};

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { state, dispatch } = useTimer();
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Filter timers by category
  const timersInCategory = state.timers.filter(
    timer => timer.category === category
  );

  // Handle bulk actions for the category
  const handleBulkAction = (actionType: 'start' | 'pause' | 'reset') => {
    if (actionType === 'reset') {
      dispatch({ 
        type: 'BULK_RESET', 
        category: category 
      });
    } else {
      dispatch({
        type: 'BULK_UPDATE',
        category: category,
        status: actionType === 'start' ? 'running' : 'paused'
      });
    }
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity 
      onPress={() => setIsExpanded(!isExpanded)}
      style={[styles.header1, styles.header]}
    >
      <Text style={styles.categoryText}>
        {category} ({timersInCategory.length})
      </Text>
      <Text style={styles.arrow}>
        {isExpanded ? '▼' : '▶'}
      </Text>
    </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {timersInCategory.map((timer: Timer) => (
            <TimerItem key={timer.id} timer={timer} />
          ))}
          
          {/* Bulk Action Buttons */}
          <View style={styles.buttonGroup}>
            <Button
              title="Start All"
              onPress={() => handleBulkAction('start')}
              color="#4CAF50"
            />
            <Button
              title="Pause All"
              onPress={() => handleBulkAction('pause')}
              color="#FFA000"
            />
            <Button
              title="Reset All"
              onPress={() => handleBulkAction('reset')}
              color="#F44336"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  header1:{
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    marginVertical: 4,
  },
  categoryText:{
    fontSize: 16,
    fontWeight: '600',

  },
  buttonGroup:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,

  },


  
});

export default CategorySection;