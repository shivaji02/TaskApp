import React from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native';


type Props={
    visible:boolean;
    timerName:string;
    onClose:()=>void;
};

const CompletionModal =({ visible, timerName, onClose }: Props) =>(
    <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <Text  style={styles.title}>Timer Complete!</Text>
                <Text style={styles.text}>{timerName} has Finished</Text>
                <Button title='OK' onPress={onClose} />
            </View>
        </View>
    </Modal>
);

const styles= StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modal: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        marginBottom: 15,
      },
    });



export default CompletionModal;