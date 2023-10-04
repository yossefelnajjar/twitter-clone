import { useSelector } from "react-redux";
import Footer       from "./../../Footer";
import NewToTwitter from "./NewToTwitter";
import Search       from "./../../Search";
import TrendsList   from "./TrendsList";
import WhoToFollow  from "./WhoToFollow";

export default function RightSidebar() {
  const personalInfo = useSelector((state) => state.personalInfo);

  return (
    <div className="text-white hidden xl:flex flex-col ml-10 gap-3 w-96">
      <Search />
      {JSON.stringify(personalInfo) != "{}" ? <TrendsList /> : <NewToTwitter />}
      <WhoToFollow />
      <Footer />
    </div>
  );
}
