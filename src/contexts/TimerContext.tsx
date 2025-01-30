import React, { createContext, useReducer, useContext } from 'react';
import { TimerContextType, TimerState, TimerAction } from '../types/timerTypes';

const initialState: TimerState = {
  timers: [{
    id: '1',
    name: ' Timer1',
    duration: 60,
    remaining: 60,
    category: 'Work',
    status: 'paused',
    createdAt: new Date(),
  }],
  history: [],
  sortBy: 'name',
  sortOrder: 'asc',
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };

    case 'COMPLETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter((t) => t.id !== action.payload),
        history: [
          {
            ...state.timers.find((t) => t.id === action.payload)!,
            completedAt: new Date(),
          },
          ...state.history,
        ],
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    default:
      return state;
  }
};


export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  return <TimerContext.Provider value={{ state, dispatch }}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('something went wrong with TimerContext');
  }
  return context;
};
