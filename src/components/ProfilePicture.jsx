import { Link } from "react-router-dom";

export default function ProfilePicture({toPath, picture, onclick, addclass }) {
  return (
    <Link to={toPath} className={`w-9 xl:w-10 lg:w-14 ${addclass}`} onClick={onclick}>
      <img src={picture} className="rounded-full bg-white-700 w-full p-1" />
    </Link>
  );
}
