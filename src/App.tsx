import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import React, { useEffect, lazy, Suspense } from "react";
import useGetLocation from "./hooks/useGetLocation";
import { getAllrates } from "./redux/action";
import { useAppDispatch } from "./hooks/redux";

const Allcurrencies = lazy(() => import("./components/Allcurrencies"));
const Swap = lazy(() => import("./components/Swap"));

function App() {
  const dispatch = useAppDispatch();
  const { getUserCoordinates } = useGetLocation();

  // GET BASE RATE BASED ON USER LOCATION
  useEffect(() => {
    getUserCoordinates();
  }, [getUserCoordinates]);

  // GET ALL PAIRS
  useEffect(() => {
    dispatch(getAllrates());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Suspense fallback={<h1>Loading…</h1>}>
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/allrates" element={<Allcurrencies />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
