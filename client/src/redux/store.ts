import { getCourse } from '@/src/services/courseAPI';
import { getCourseTrainee } from '@/src/services/traineeAPI';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import courseReducer from '../features/course/courseSlice';
import learningPathReducer from '../features/learning-path/learningPathSlice';
import courseModalsReducer from '../features/learning-path/courseModalsSlice';
import lessonModalsReducer from '../features/course/lessonModalsSlice';
import stepperReducer from '../features/stepper/stepperSlice';
import tabReducer from '../features/tab/tabSlice';
import learnerReducer from '../features/course/learnerSlice';
import { getCategory } from '@/src/services/categoryAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseReducer,
    courseLearner: learnerReducer,
    lessonModals: lessonModalsReducer,
    learningPath: learningPathReducer,
    courseModals: courseModalsReducer,
    stepper: stepperReducer,
    tab: tabReducer,
    [getCourse.reducerPath]: getCourse.reducer,
    [getCourseTrainee.reducerPath]: getCourseTrainee.reducer,
    [getCategory.reducerPath]: getCategory.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(getCourse.middleware)
      .concat(getCourseTrainee.middleware)
      .concat(getCategory.middleware),
  // devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
