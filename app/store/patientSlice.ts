import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { patientType } from "../types/patienttype";
type coordinates = {
  lat: string;
  lng: string;
};
// Define the initial state using that type
const initialState: patientType = {
  ContactNo: "",
  DOB: "",
  Email: "",
  Latitude: "",
  Longitude: "",
  Name: "",
};

export const PatientSlice = createSlice({
  name: "patient",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCoordinates: (state, action: PayloadAction<coordinates>) => {},
    updateReports: (state, action: PayloadAction<string>) => {},
    createPatient: (state, action: PayloadAction<patientType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateCoordinates, updateReports, createPatient } =
  PatientSlice.actions;
export const getPatientsCoordinates = (state: RootState) => {
  return {
    Latitude: state.patient.Latitude,
    Longitude: state.patient.Longitude,
  };
};
export const getPatientInfo = (state: RootState) => state.patient;

const patientsliceReducer = PatientSlice.reducer;
export default patientsliceReducer;
