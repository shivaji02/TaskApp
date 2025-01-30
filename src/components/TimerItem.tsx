import React,{useEffect, useState} from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useTimer } from '../contexts/TimerContext';
import { Timer } from '../types/timerTypes';
import ProgressBar from './ProgressBar';
import CompletionModal from './CompletionModal';

const TimerItem: React.FC<{ timer: Timer }> = ({ timer }) => {
const [showCompletionModal,setShowCompletionModal] = useState(false);
    const {dispatch} = useTimer();
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if(timer.alertThreshold && timer.remaining === timer.alertThreshold){
          Alert.alert(
            'Halfway Alert',
            `Timer "${timer.name}" is Half Passed`,
            [{text:'OK'}]
          );
        }
        if (timer.status === 'completed' && timer.remaining === 0) {
          setShowCompletionModal(true);
        }

        if (timer.status === 'running') {
          interval = setInterval(() => {
            const newRemaining = timer.remaining - 1;

            if (newRemaining <= 0) {
              dispatch({ type: 'ADD_TO_HISTORY', payload: timer });
              dispatch({
                type: 'UPDATE_TIMER',
                payload: {
                  ...timer,
                  remaining: 0,
                  status: 'completed',
                },
              });
            } else {
              dispatch({
                type: 'UPDATE_TIMER',
                payload: { ...timer, remaining: newRemaining },
              });
            }
          }, 1000);
        }

        return ()=>clearInterval(interval);
    },[timer.status, timer.remaining, timer, dispatch]);


    return(
        <View style={styles.container}>
            <ProgressBar progress={timer.remaining / timer.duration}/>
            <Text>{timer.name}</Text>
            <Text>{timer.remaining}</Text>
            <Button
                title={timer.status === 'running' ? 'pause' : 'start'}
                onPress={()=>dispatch({
                    type:'UPDATE_TIMER',
                    payload:{...timer,status:timer.status === 'running' ? 'paused' : 'running'},
                })} />
            <Button
              title="Reset"
              onPress={()=>dispatch({
                type:'UPDATE_TIMER',
                payload:{
                  ...timer,
                  remaining:timer.duration,
                  status:'paused',
                },
              })}
          />
      <CompletionModal
        visible={showCompletionModal}
        timerName={timer.name}
        onClose={() => setShowCompletionModal(false)}
      />

    </View>
    );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignContent:'center',
      justifyContent:'center',
    },
});
export default TimerItem;
