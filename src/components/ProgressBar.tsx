import React from 'react'
import { StyleSheet, View } from 'react-native';



type ProgressBarProps ={
    progress :number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${progress * 100}%` }]} />
        </View>
    );
};

const styles=  StyleSheet.create({
    container:{
        height:8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
        marginVertical: 8,
        },
        progress:{
            height:'auto',
            backgroundColor: '#4CAF50',

        }
})

export default ProgressBar;