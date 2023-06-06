import type { CourseCategory, DBCourse, Lesson } from '@/src/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type DropResult } from 'react-beautiful-dnd';

export interface CourseState {
  values: {
    name: string;
    description: string;
    image: File | string | null;
    category: CourseCategory[];
    lessons: Lesson[];
  };
  editMode: boolean;
}

const initialState: CourseState = {
  values: { name: '', description: '', image: null, lessons: [], category: [] },
  editMode: true,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
    addLesson: (state, action: PayloadAction<Omit<Lesson, 'order'>>) => {
      state.values.lessons = [
        ...state.values.lessons,
        { ...action.payload, order: state.values.lessons.length },
      ];
    },
    addCategory: (state, action: PayloadAction<CourseCategory[]>) => {
      state.values.category = action.payload;
    },
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      state.values.lessons = state.values.lessons.map((lesson) =>
        lesson.id === action.payload.id ? action.payload : lesson
      );
    },
    deleteLesson: (state, action: PayloadAction<string>) => {
      const lessons = state.values.lessons.filter((lesson) => lesson.id !== action.payload);
      state.values.lessons = lessons.map((lesson, index) => ({ ...lesson, order: index }));
    },
    changeEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    reorderLessons: (state, action: PayloadAction<DropResult>) => {
      const lessons = state.values.lessons;
      if (action.payload.destination) {
        lessons.splice(
          action.payload.destination?.index,
          0,
          lessons.splice(action.payload.source?.index, 1)[0]
        );
      }
      state.values.lessons = lessons.map((lesson, index) => ({ ...lesson, order: index }));
    },
    /* eslint-disable @typescript-eslint/naming-convention */
    reset: (state, action: PayloadAction<DBCourse | undefined>) => {
      if (action.payload !== undefined) {
        const { category, img_path, lessons, name, description } = action.payload;
        state.values = {
          name,
          description,
          category,
          image: img_path,
          lessons,
        };
      } else {
        state.values = initialState.values;
      }
    },
  },
});

export const {
  updateForm,
  addLesson,
  addCategory,
  updateLesson,
  deleteLesson,
  changeEditMode,
  reorderLessons,
  reset,
} = courseSlice.actions;

export default courseSlice.reducer;
