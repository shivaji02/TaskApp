import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimerState } from "../types/timerTypes";


const STORAGE_KEY = '@taskapp_timers';
export const loadPersistedState = async () : Promise<TimerState> =>{

    try{
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return  jsonValue ? JSON.parse(jsonValue) : {timers:[],history:[]};
    }  catch(e){
        console.log("Failed to loadtmer",e);
        return {timers:[],history:[]};
    }
};

export const persistState = async (state:TimerState):Promise<void>=>{
    try{
        await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    }catch(e){
        console.log("Failed to persist//save timers",e);
    }
};
