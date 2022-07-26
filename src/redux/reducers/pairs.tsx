import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface dataProps {
  name: string;
  value: number;
}

// Define a type for the slice state
interface initialStateProps {
  base: string;
  value: number;
  loading: boolean;
  pairs: dataProps[];
  allRates: any;
}

// Define the initial state using that type
const initialState: initialStateProps = {
  base: "",
  value: 0,
  loading: false,
  pairs: [],
  allRates: null,
};

export const pairSlice = createSlice({
  name: "pair",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isLoading: (state) => {
      state.loading = true;
    },
    GetAllrates: (state, action: PayloadAction<any>) => {
      state.allRates = action.payload;
    },
    setBase: (state, action: PayloadAction<any>) => {
      state.base = action.payload;
    },
    loaded: (state) => {
      state.loading = false;
    },
    setPairSuccess: (state, action: PayloadAction<any>) => {
      state.pairs = action.payload;
    },
    setPairErr: (state) => {
      return state;
    },
  },
});

export const { isLoading, setBase, loaded, setPairSuccess, setPairErr, GetAllrates } =
  pairSlice.actions;

export default pairSlice.reducer;
