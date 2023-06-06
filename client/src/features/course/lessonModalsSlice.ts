import type { Lesson } from '@/src/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum lessonModalEnum {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'deleteL',
}

export interface LessonModalsState {
  add: boolean;
  edit: Lesson | null;
  deleteL: Lesson | null;
}

const initialState: LessonModalsState = {
  add: false,
  edit: null,
  deleteL: null,
};

export const lessonModalsSlice = createSlice({
  name: 'lessonModals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: lessonModalEnum; lesson?: Lesson }>) => {
      switch (action.payload.type) {
        case lessonModalEnum.EDIT:
          state.add = false;
          state.edit = action.payload.lesson ?? null;
          state.deleteL = null;
          break;
        case lessonModalEnum.DELETE:
          state.add = false;
          state.edit = null;
          state.deleteL = action.payload.lesson ?? null;
          break;
        default:
          state.add = true;
          state.edit = null;
          state.deleteL = null;
          break;
      }
    },
    closeModal: (state, action: PayloadAction<lessonModalEnum>) => {
      switch (action.payload) {
        case lessonModalEnum.EDIT:
          state.edit = null;
          break;
        case lessonModalEnum.DELETE:
          state.deleteL = null;
          break;
        default:
          state.add = false;
          break;
      }
    },
  },
});

export const { closeModal, openModal } = lessonModalsSlice.actions;

export default lessonModalsSlice.reducer;
