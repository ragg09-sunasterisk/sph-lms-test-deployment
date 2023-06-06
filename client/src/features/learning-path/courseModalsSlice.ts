import type { Course } from '@/src/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum courseModalEnum {
  ADD = 'add',
  DELETE = 'deleteC',
}

export interface CourseModalsState {
  add: boolean;
  deleteC: Course | null;
}

const initialState: CourseModalsState = {
  add: false,
  deleteC: null,
};

export const courseModalsSlice = createSlice({
  name: 'courseModals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: courseModalEnum; course?: Course }>) => {
      switch (action.payload.type) {
        case courseModalEnum.DELETE:
          state.add = false;
          state.deleteC = action.payload.course ?? null;
          break;
        default:
          state.add = true;
          break;
      }
    },
    closeModal: (state, action: PayloadAction<courseModalEnum>) => {
      switch (action.payload) {
        case courseModalEnum.DELETE:
          state.deleteC = null;
          break;
        default:
          state.add = false;
          break;
      }
    },
  },
});

export const { closeModal, openModal } = courseModalsSlice.actions;

export default courseModalsSlice.reducer;
