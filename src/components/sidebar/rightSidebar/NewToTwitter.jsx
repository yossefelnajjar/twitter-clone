import { useDispatch } from "react-redux";
import { setShowPopUp } from "./../../../redux/slices/popUp-slice";
import MainBtn          from "./../../buttons/MainBtn";

export default function NewToTwitter() {
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-3xl p-4 flex flex-col gap-2 ">
      <div className="NewToTwitterTop">
        <p className="text-2xl">New to Twitter?</p>
        <p className="opacity-30 text-sm">Sign up now to get your own personalized timeline!</p>
      </div>

      <div className="NewToTwitterMiddle flex flex-col my-3 gap-2">
        <MainBtn text="Sign in" bgColor="bg-white" hoverBgColor="font-semibold hover:bg-opacity-60 transition-all text-center text-black" onclick={() => { dispatch(setShowPopUp("signIn")); }} />
        <MainBtn text="Create account" bgColor="bg-white" hoverBgColor="font-semibold hover:bg-opacity-60 transition-all text-center text-black" onclick={() => { dispatch(setShowPopUp("signUp")); }} />
      </div>

      <div className="NewToTwitterBottom flex flex-wrap gap-1">
        <p className="text-sm inline opacity-30">By signing up, you agree to the</p>
        <p className="text-sm cursor-pointer text-blue-500 hover:underline inline">Terms of Service</p>
        <p className="text-sm inline opacity-30">and</p>
        <p className="text-sm cursor-pointer text-blue-500 hover:underline inline">Privacy Policy</p>
        <p className="text-sm inline opacity-30">, including</p>
        <p className="text-sm cursor-pointer text-blue-500 hover:underline inline">Cookie Use.</p>
      </div>
    </div>
  );
}
