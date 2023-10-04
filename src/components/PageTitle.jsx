import { useSelector } from "react-redux";
import { Link }        from "react-router-dom";
import previous from "./../assets/icons/Previous.svg";

export default function PageTitle({ title }) {
  const personalInfo = useSelector(state => state.personalInfo)
  
  return (
    <div className="pageTitle z-50 flex justify-between items-center text-2xl pl-5 bg-transparent bg-opacity-75 backdrop-blur-lg text-white h-14 border-x border-white border-opacity-25 -mt-14 w-full">
      <div className="flex items-center gap-5">
        {/* SHOWING BACK TO HOME BUTTON WHEN SIDEBAR IS HIDDEN */}
        { window.location.pathname != "/" && (<Link to="/" className="xl:hidden"><img src={previous} alt="" /></Link> )}
        <p>{title}</p>
      </div>

      {/* SHOWING PROFILE BUTTON WHEN SIDEBAR IS HIDDEN */}
      {JSON.stringify(personalInfo) != "{}" &&  window.location.pathname != "/profile" ? ( <div> <Link to="/profile" className="xl:hidden hover:underline mr-4">@{personalInfo.userName}</Link> </div> ) : null}
    </div>
  );
}
