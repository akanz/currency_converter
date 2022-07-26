import React, { useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../hooks/redux";
import CurrencyInput from "./CurrencyInput";
import Loading from "./loading";

const Swap = () => {
  const { base, allRates, loading } = useAppSelector((state) => state.pair);
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(1);
  const [currency1, setCurrency1] = useState<any>(base);
  const [currency2, setCurrency2] = useState<any>("EUR");



  useEffect(() => {
    if (!!allRates) {
      const init = () => {
        handleAmount1Change(1);
      };
      init();
    }
  }, [allRates]);

  function format(number: number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1: number) {
    setAmount2(
      parseFloat(format((amount1 * allRates[currency2]) / allRates[currency1]))
    );
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1: any) {
    setAmount2(
      parseFloat(format((amount1 * allRates[currency2]) / allRates[currency1]))
    );
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2: number) {
    setAmount1(
      parseFloat(format((amount2 * allRates[currency1]) / allRates[currency2]))
    );
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2: any) {
    setAmount1(
      parseFloat(format((amount2 * allRates[currency1]) / allRates[currency2]))
    );
    setCurrency2(currency2);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>
        <div className="main">
          <CurrencyInput
            onAmountChange={handleAmount1Change}
            onCurrencyChange={handleCurrency1Change}
            currencies={Object.keys(allRates)}
            amount={amount1}
            currency={currency1}
          />
          <CurrencyInput
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            currencies={Object.keys(allRates)}
            amount={amount2}
            currency={currency2}
          />
        </div>
      </div>
    </>
  );
};

export default Swap;
