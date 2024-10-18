import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { nurseType } from "../types/nursetype";
type coordinates = {
  lat: string;
  lng: string;
};
// Define the initial state using that type
const initialState: nurseType = {
  AverageRating: "",
  ContactNo: "",
  DOB: "",
  Email: "",
  Latitude: "",
  Longitude: "",
  Name: "",
  TotalNoOfPatientsAppeared: "",
};

export const NurseSlice = createSlice({
  name: "nurse",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCoordinates: (state, action: PayloadAction<coordinates>) => {},
    createNurse: (state, action: PayloadAction<nurseType>) => {
      state = action.payload;
      return state;
    },
  },
});

const nursesliceReducer = NurseSlice.reducer;

export default nursesliceReducer;
export const getNurseCoordinates = (state: RootState) => {
  return {
    Latitude: state.patient.Latitude,
    Longitude: state.patient.Longitude,
  };
};
export const { updateCoordinates, createNurse } = NurseSlice.actions;
export const getNurseInfo = (state: RootState) => state.nurse;
