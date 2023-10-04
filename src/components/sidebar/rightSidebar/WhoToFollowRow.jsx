import { Link }        from "react-router-dom";
import MainBtn        from "./../../buttons/MainBtn";
import ProfilePicture from "./../../ProfilePicture";

export default function WhoToFollowRow({ picture, name, user, toPath }) {
  return (
    <div className="trend flex hover:bg-white hover:bg-opacity-10 transition-all px-4 cursor-pointer items-center">
      <ProfilePicture picture={picture} />

      <div className="flex flex-col flex-1 hover:underline">
        <Link to={`/profile/${toPath}`} className="text-lg">{name}</Link>
        <Link to={`/profile/${toPath}`} className="opacity-25">@{user}</Link>
      </div>

      <MainBtn text="Follow" bgColor="bg-white text-black transition-all" hoverBgColor="hover:bg-opacity-80"/>
    </div>
  );
}
