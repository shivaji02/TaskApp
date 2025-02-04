import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Vibration } from 'react-native';
import { FlatList, Switch } from 'react-native-gesture-handler';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerScreen = () => {
    interface Timer {
        id: number;
        duration: number;
        timeLeft: number;
        isRunning: boolean;
        intervalId: NodeJS.Timeout | null;
    }
    
    const [timers, setTimers] = useState<Timer[]>([]);
    const[darkMode,setDarkMode] = useState(false);

useEffect(() => {
    loadTimers();
}, []);

const addTimer = () => {
    const newTimer = { id: Date.now(), duration: 60, timeLeft: 60, isRunning: false, intervalId: null };
    setTimers([...timers, newTimer]);
    saveTimers([...timers, newTimer]);
};

const toggleTimer = (id: number) => {
    setTimers(timers.map(timer => {
        if (timer.id === id) {
            if (!timer.isRunning) {
                timer.intervalId = setInterval(() => {
                    setTimers(prevTimers => prevTimers.map(t => {
                        if (t.id === id && t.timeLeft > 0) {
                            return { ...t, timeLeft: t.timeLeft - 1 };
                        } else if (t.id === id && t.timeLeft === 0) {
                            Vibration.vibrate();
                            if (t.intervalId) clearInterval(t.intervalId);
                            return { ...t, isRunning: false };
                        }
                        return t;
                    }));
                }, 1000);
            } else {
                if (timer.intervalId) clearInterval(timer.intervalId);
            }
            return { ...timer, isRunning: !timer.isRunning };
        }
        return timer;
    }));
};

const resetTimer = (id: number) => {
    setTimers(timers.map(timer => timer.id === id ? { ...timer, timeLeft: timer.duration, isRunning: false } : timer));
};

const deleteTimer = (id: number) => {
    setTimers(timers.filter(timer => timer.id !== id));
    AsyncStorage.removeItem('timers');
};

const saveTimers = async (timers: Timer[]) => {
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
};

const loadTimers = async () => {
    const data = await AsyncStorage.getItem('timers');
    if (data) {
        setTimers(JSON.parse(data));
    }
};


    return (
        <View style={[styles.container, darkMode  ? styles.darkContainer : styles.lightContainer]}>
            <Switch  value={darkMode} onValueChange={setDarkMode}/>
            <Button title="Add Timer" onPress={addTimer}/>
            <FlatList
            data={timers}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item}) => (
                <View style={styles.timer}>
                    <Text style={darkMode ? styles.darkText : styles.lightText}>{item.timeLeft}</Text>
                    <ProgressBar progress={item.timeLeft/item.duration}  color="red"/>
                    <Text style={darkMode ? styles.darkText : styles.lightText}>{item.duration}</Text>
                    <View style={styles.buttonRow}>

                    <Button title={item.isRunning ? 'Pause' : 'Start'} onPress={()=>toggleTimer(item.id)}/>
                    <Button title="Reset" onPress={()=>resetTimer(item.id)}/>
                    <Button title="Delete" onPress={()=>deleteTimer(item.id)}/>
                    </View>
                </View>
            )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    timer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    darkText: {
        color: 'white',
    },
    lightText: {
        color: 'black',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'auto',
    },

});

export default TimerScreen;