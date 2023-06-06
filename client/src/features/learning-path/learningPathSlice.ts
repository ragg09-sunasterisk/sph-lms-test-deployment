import type { Course, CourseCategory } from '@/src/shared/utils';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { DropResult } from 'react-beautiful-dnd';

interface LearningPathState {
  values: {
    name: string;
    description: string;
    image: File | string | null;
    category: CourseCategory[];
    courses: Course[];
    isActive: boolean;
  };
  editMode: boolean;
}

const initialState: LearningPathState = {
  values: { name: '', description: '', image: null, courses: [], category: [], isActive: true },
  editMode: true,
};

export const learningPathSlice = createSlice({
  name: 'learningPath',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
    addCategory: (state, action: PayloadAction<CourseCategory[]>) => {
      state.values.category = action.payload;
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      const courses = state.values.courses.filter((course) => course.id !== +action.payload);
      state.values.courses = courses.map((course, index) => ({ ...course, order: index }));
    },
    changeEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    reorderCourses: (state, action: PayloadAction<DropResult>) => {
      const courses = state.values.courses;
      if (action.payload.destination) {
        courses.splice(
          action.payload.destination?.index,
          0,
          courses.splice(action.payload.source?.index, 1)[0]
        );
      }
      state.values.courses = courses.map((course, index) => ({ ...course, order: index }));
    },
  },
});

export const { addCategory, deleteCourse, changeEditMode, reorderCourses, updateForm } =
  learningPathSlice.actions;

export default learningPathSlice.reducer;
