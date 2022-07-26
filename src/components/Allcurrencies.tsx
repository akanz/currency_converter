import { useAppSelector } from "../hooks/redux";
import Loading from "./loading";

interface dataProps {
  name: string;
  value: number;
}

const Allcurrencies = () => {
  const { pairs, loading, base } = useAppSelector((state) => state.pair);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>All currencies</h1>
      <div className="allpairs">
        {pairs.map((rate: dataProps, i: number) => (
          <div className="pairGrp" key={i}>
            <div className="pair">
              {" "}
              {base}/ {rate.name}{" "}
            </div>{" "}
            :<div>{rate.value} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allcurrencies;
