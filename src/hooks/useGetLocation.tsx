import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "./redux";
import { getRates } from "../redux/action/index";
import { setBase } from "../redux/reducers/pairs";

// THIS IS LEFT HERE FOR TESTING PURPOSES ONLY
const apiURL = "https://ipgeolocation.abstractapi.com/v1";
const apiKey = "50922e3dcbfd4a7eb8e723f5a2aa77c7";

const useGetLocation = () => {
  const [error, setError] = useState<string>("");
  const [userDetails, setuserDetails] = useState<any>(null);
  const dispatch = useAppDispatch();
  const getUserCoordinates = useCallback(async () => {
    try {
      const response: any = await (
        await axios.get(`${apiURL}/?api_key=${apiKey}`)
      ).data;
     
      setuserDetails(response);
      dispatch(setBase(response?.currency?.currency_code));
    } catch (error) {
      setError("Something went wrong getting Geolocation from API!");
    }
  }, [dispatch]);

  useEffect(() => {
    userDetails && dispatch(getRates(userDetails?.currency?.currency_code));
  }, [userDetails, dispatch]);

  return { getUserCoordinates, error };
};

export default useGetLocation;
