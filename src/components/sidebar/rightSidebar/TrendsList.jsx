import { useEffect}                 from "react";
import { useDispatch, useSelector } from "react-redux";
import axios                        from "axios";
import TrendRow      from "./TrendRow";
import { addTrends } from "../../../redux/slices/trends-slice";

export default function TrendsList() {
  const trends   = useSelector(state => state.trends)
  const dispatch = useDispatch()
  
  useEffect(() => {
    axios
      .get("http://tarmeezacademy.com/api/v1/tags")
      .then((response) => { dispatch(addTrends(response.data.data)); })
      .catch((error)   => { console.error(error); });
  }, []);

  const trendRows = trends.map((trend) => (<TrendRow key={ trend.name } toPath={`/explore/${trend.name.toLowerCase()}`} country="US" trendName={trend.name} tweetsCount="2,060" />));

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-3xl py-4 flex flex-col gap-5">
      <p className="text-2xl px-4">Trends for you</p>
      {trendRows}
    </div>
  );
}
