export interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  category: string;
  status: 'running' | 'paused' | 'completed';
  createdAt?: Date;
  completedAt?: Date;
}

export interface TimerState {
  timers: Timer[];
  history: Timer[];
  sortOrder: 'asc' | 'desc';

  sortBy: 'name' | 'duration' | 'category' | 'completedAt';

}



export type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'COMPLETE_TIMER'; payload: string }
  | { type: 'SET_SORT'; payload: { sortBy: TimerState['sortBy']; sortOrder: TimerState['sortOrder'] } }
  | { type: 'HYDRATE_STATE'; payload: TimerState }
  | { type: 'BULK_UPDATE'; payload: { category: string; status: Timer['status'] } }
  | { type: 'BULK_RESET'; payload: { category: string } }
  | { type: 'ADD_TO_HISTORY'; payload: Timer };

export interface TimerContextType {
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
}
