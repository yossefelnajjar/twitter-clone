import { useEffect, useState } from "react";
import { useSelector }         from "react-redux";
import { Link }                from "react-router-dom";
import twitterLogo           from "../../../assets/icons/Twitter.svg";
import homeLogo              from "../../../assets/icons/Home.svg";
import homeFillLogo          from "../../../assets/icons/Home-Fill.svg";
import exploreLogo           from "../../../assets/icons/Explore.svg";
import exploreFillLogo       from "../../../assets/icons/Explore-Fill.svg";
import notificationsLogo     from "../../../assets/icons/Notifications.svg";
import notificationsFillLogo from "../../../assets/icons/Notifications-Fill.svg";
import messagesLogo          from "../../../assets/icons/Messages.svg";
import messagesFillLogo      from "../../../assets/icons/Messages-Fill.svg";
import bookmarksLogo         from "../../../assets/icons/Bookmarks.svg";
import bookmarksFillLogo     from "../../../assets/icons/Bookmarks-Fill.svg";
import profileLogo           from "../../../assets/icons/Profile.svg";
import profileFillLogo       from "../../../assets/icons/Profile-Fill.svg";
import SidebarBtn from "../../buttons/SidebarBtn";

export default function Sidebar() {  
  const [links, setLinks] = useState([]);
  const [fill, setFill]   = useState(window.location.pathname);
  
  const personalInfo = useSelector((state) => state.personalInfo);

  useEffect(() => {
    const sidebarLinks = [
      {
        logo: homeLogo,
        logoFill: homeFillLogo,
        text: "Home",
        path: "/",
      },
      {
        logo: exploreLogo,
        logoFill: exploreFillLogo,
        text: "Explore",
        path: "/explore",
      },
      {
        logo: notificationsLogo,
        logoFill: notificationsFillLogo,
        text: "Notifications",
        path: "/notifications",
      },
      {
        logo: messagesLogo,
        logoFill: messagesFillLogo,
        text: "Messages",
        path: "/messages",
      },
      {
        logo: bookmarksLogo,
        logoFill: bookmarksFillLogo,
        text: "Bookmarks",
        path: "/bookmarks",
      },
      {
        logo: profileLogo,
        logoFill: profileFillLogo,
        text: "Profile",
        path: "/profile",
      },
    ];

    const mappedLinks = sidebarLinks.map((link) => {
      // HIDE PROFILE FROM SIDEBAR WHEN THERE'S NO PERSONALINFO
      if (JSON.stringify(personalInfo) == "{}" && link.text == "Profile") {
        return;
      }

      return (
        <Link key={link.text} to={link.path} onClick={() => { setFill(link.path);}}>
          <SidebarBtn logo={fill == link.path ? link.logoFill : link.logo} text={link.text} />
        </Link>
      );
    });
    
    setLinks(mappedLinks);
  }, [fill, personalInfo]);

  return (
    <div className="fixed w-64 flex-col gap-5 items-start p-3 hidden xl:flex">
      <Link to="/">
        <img src={twitterLogo} alt="" className=" px-4 scale-150 " />
      </Link>

      {links}
    </div>
  );
}
