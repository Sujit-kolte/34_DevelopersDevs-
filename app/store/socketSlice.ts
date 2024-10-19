import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
const initialState: any = null;

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<any>) => {
      state = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export const getSocket = (state: RootState) => state.socket;
const socketReducer = socketSlice.reducer;
export default socketReducer;
