import { Link } from "react-router-dom";

export default function TrendRow({ country, trendName, tweetsCount, toPath }) {
  return (
    <Link to={ toPath } className="trend hover:bg-white hover:bg-opacity-10 px-4 transition-all cursor-pointer">
      <p className="opacity-25 text-sm">Trending in {country}</p>
      <p className="uppercase font-semibold text-lg hover:underline">#{trendName}</p>
      <p className="opacity-25 text-sm">{tweetsCount} Tweets</p>
    </Link>
  );
}
