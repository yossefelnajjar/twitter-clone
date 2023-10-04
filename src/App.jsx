import { useEffect }                from "react";
import { Outlet, Route, Routes }    from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home           from "./pages/Home";
import Profile        from "./pages/Profile";
import ApiProblemPage from "./pages/ApiProblemPage";
import SpecificTrend  from "./pages/SpecificTrend";
import OthersProfile  from "./pages/OthersProfile";
import Sidebar         from "./components/sidebar/sidebar/Sidebar";
import RightSidebar    from "./components/sidebar/rightSidebar/RightSidebar";
import SignUpPopUp     from "./components/popUp/SignUpPopUp";
import SignInPopUp     from "./components/popUp/SignInPopUp";
import CommentsPopUp   from "./components/popUp/CommentsPopUp";
import { addInfo } from "./redux/slices/personalInfo-slice";


export default function App() {
  let personalInfo = useSelector(state => state.personalInfo)
  let dispatch     = useDispatch()

  useEffect(() => {
    // IF THERE'S NO PERSONALINFO IN LOCAL STORAGE AND PERSONALINFO IS NOT EMPTY
    if (!localStorage.getItem("personalInfo") && JSON.stringify(personalInfo) != "{}") {
      localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    }
    // IF THERE'S PERSONALINFO IN LOCAL STORAGE AND PERSONALINFO IS EMPTY
    if (localStorage.getItem("personalInfo") && JSON.stringify(personalInfo) == "{}") {
      dispatch(addInfo(JSON.parse(localStorage.getItem("personalInfo"))));
    }
    // IF PERSONALINFO UPDATED
    if (localStorage.getItem("personalInfo") && JSON.stringify(personalInfo) != "{}" && JSON.stringify(personalInfo) != localStorage.getItem("personalInfo")) {
      window.localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    }
  }, [personalInfo]);

  return (
    <>
      <div className="MainContent flex w-full sm:px-0 md:px-16 2xl:px-96">
        <Sidebar />
        <SignUpPopUp />
        <SignInPopUp />
        <CommentsPopUp />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/explore" element={ <Outlet/> } >
            <Route path=""                    element={ <ApiProblemPage title="Explore"/> } />
            <Route path="/explore/:trendName" element={ <SpecificTrend />  } />
          </Route>

          <Route path="/messages"      element={ <ApiProblemPage title="Messages" /> }      />
          <Route path="/notifications" element={ <ApiProblemPage title="Notifications" /> } />
          <Route path="/bookmarks"     element={ <ApiProblemPage title="Bookmarks" /> }     />
          
          <Route path="/profile" element={ <Outlet /> } >
            <Route path=""           element={ <Profile /> }       />
            <Route path=":profileId" element={ <OthersProfile /> } />
          </Route>
        </Routes>

        <RightSidebar />
      </div>
    </>
  );
}
