import axios from "axios";
import {
  GetAllrates,
  isLoading,
  loaded,
  setPairErr,
  setPairSuccess,
} from "../reducers/pairs";

const API_KEY = "DePZfelvCFdam6xsGNjIYlQwJSMFJFxa";

export const getAllrates = () => async (dispatch: any) => {
  dispatch(isLoading());
  try {
    const res: any = await (
      await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?apikey=${API_KEY}`
      )
    ).data;
    dispatch(GetAllrates(res.rates));
    dispatch(loaded());
  } catch (error) {
    console.log(error);
    dispatch(setPairErr());
    dispatch(loaded());
  }
};

export const getRates = (val: string) => async (dispatch: any) => {
  dispatch(isLoading());
  try {
    const res: any = await (
      await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?apikey=${API_KEY}&base=${val}`
      )
    ).data;
    let result = Object.keys(res.rates).map((key) => ({
      name: key,
      value: res.rates[key],
    }));
    dispatch(setPairSuccess(result));
    dispatch(loaded());
  } catch (error) {
    console.log(error);
    dispatch(setPairErr());
    dispatch(loaded());
  }
};
