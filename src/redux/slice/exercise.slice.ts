import {WEEKDAYS} from '@/screens/internal/Routine/routine.setup.screen';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface ExerciseSliceInterface {
  todaysDay: WEEKDAYS | null;
  didCompleteTodaysExercise: boolean;
}

interface UpdateExerciseSliceAction {
  todaysDay: WEEKDAYS;
  didCompleteTodaysExercise: boolean;
}

const initialState: ExerciseSliceInterface = {
  todaysDay: null,
  didCompleteTodaysExercise: false,
};

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setDidCompleteTodaysExercise: (
      state,
      action: PayloadAction<UpdateExerciseSliceAction>,
    ) => {
      state.didCompleteTodaysExercise =
        action.payload.didCompleteTodaysExercise;
      state.todaysDay = action.payload.todaysDay;
    },
    invalidateExerciseSlice: () => initialState,
  },
});

export const {setDidCompleteTodaysExercise, invalidateExerciseSlice} =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
