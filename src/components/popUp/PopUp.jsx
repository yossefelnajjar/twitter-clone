import { useEffect }               from "react";
import { useDispatch, useSelector } from "react-redux";
import exitIcon from "./../../assets/icons/Exit.svg";
import { setShowPopUp } from "./../../redux/slices/popUp-slice";

export default function PopUp({ popUpName, children }) {
  const showPopUp = useSelector(state=>state.showPopUp)
  const dispatch  = useDispatch();

  useEffect(() => {
    // PREVENTING THE SCROLLING IF THERE'S A POPUP ON THE SCREEN
    if (showPopUp != "") {
      document.body.style.maxHeight = "100vh"
      document.body.style.overflow  = "hidden"
    } else {
    // RETURNING THE SCROLLING IF THERE'S NO POPUP ON THE SCREEN
      document.body.style.maxHeight = "initial"
      document.body.style.overflow  = "initial"
    }
  }, [showPopUp]);
  
  function handleExitPopUp() {
    dispatch(setShowPopUp(""));
  }

  return (
    <div className={`z-50 fixed top-0 left-0 bg-blue-200 bg-opacity-20 w-screen h-screen justify-center items-center ${showPopUp === popUpName ? "flex" : "hidden"}`}>
      <div className="lg:h-1/2 lg:w-1/2 2xl:w-1/4 bg-black text-white rounded-3xl p-8 flex flex-col gap-6">
        <div className="exit flex justify-end">
          <img src={exitIcon} onClick={handleExitPopUp} className="rounded-full p-2 cursor-pointer hover:bg-blue-300 hover:bg-opacity-25 transition-all" />
        </div>

        {children}  
      </div>
    </div>
  )
}
