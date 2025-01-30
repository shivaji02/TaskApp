import React, { createContext, useReducer, useContext } from 'react';
import { TimerContextType, TimerState,  TimerAction } from '../types/timerTypes';

const initialState: TimerState = {
  timers: [],
  history: [],
  sortBy: 'name',
  sortOrder: 'asc',
};

// Creating Context with proper types
const TimerContext = createContext<TimerContextType | undefined>(undefined); // ✅ Fix: Prevent undefined issues

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

    case 'HYDRATE_STATE':
      return action.payload;

    case 'BULK_UPDATE':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload.category
            ? { ...timer, status: action.payload.status }
            : timer
        ),
      };

    case 'BULK_RESET':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload.category
            ? { ...timer, remaining: timer.duration, status: 'paused' }
            : timer
        ),
      };

    case 'ADD_TO_HISTORY':
      return { ...state, history: [action.payload, ...state.history] };

    default:
      return state;
  }
};

// TimerProvider Component
export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  return <TimerContext.Provider value={{ state, dispatch }}>{children}</TimerContext.Provider>;
};

// Custom Hook for using Timer Context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
