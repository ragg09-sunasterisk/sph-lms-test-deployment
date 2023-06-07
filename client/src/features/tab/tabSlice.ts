import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TabState {
  activeTab: number;
  isTabValid: boolean;
}

const initialState: TabState = {
  activeTab: 1,
  isTabValid: true,
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setIsTabValid: (state, action: PayloadAction<boolean>) => {
      state.isTabValid = action.payload;
    },
  },
});

export const { setActiveTab, setIsTabValid } = tabSlice.actions;

export default tabSlice.reducer;
