import { useState }    from "react";
import { useDispatch } from "react-redux";
import axios           from "axios";
import { addInfo }      from "../../redux/slices/personalInfo-slice";
import { setShowPopUp } from "../../redux/slices/popUp-slice";
import PopUp   from "./PopUp";
import MainBtn from "../buttons/MainBtn";
import { apiUrl } from "../constants";

export default function SignInPopUp() {
  const [signInUserName, setSignInUserName] = useState("");
  const [signInPass, setSignInPass]         = useState("");
  const dispatch = useDispatch();

  return (
    <PopUp popUpName="signIn">
        <div>
          <label htmlFor="signInUsername" className="pl-2">Username</label>
          <input type="text" value={signInUserName} onChange={(e) => { setSignInUserName(e.target.value); }} placeholder="Username" id="signInUsername"
            className="mt-1 w-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
          <p className="text-red-500" id="signInUserNameErrorMsg"></p>
        </div>

        <div>
          <label htmlFor="signInPassword" className="pl-2">Password</label>
          <input type="password" value={signInPass} onChange={(e) => { setSignInPass(e.target.value);}} placeholder="Password" id="signInPassword"
            className="mt-1 w-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
          <p className="text-red-500" id="signInPasswordErrorMsg"></p>
        </div>

        <div className="w-full flex justify-end flex-col items-center flex-1">
          <MainBtn text="Sign in" bgColor="w-full bg-blue-500 text-center text-white px-5 py-3" hoverBgColor="hover:bg-blue-400"
            onclick={(e) => {
              const signInUserNameErrorMsg = document.getElementById("signInUserNameErrorMsg");
              const signInPasswordErrorMsg = document.getElementById("signInPasswordErrorMsg");
              signInUserNameErrorMsg.innerText = "";
              signInPasswordErrorMsg.innerText = "";

              axios
                .post(`${apiUrl}/login`, { username: signInUserName, password: signInPass})
                .then((response) => {
                  dispatch(addInfo({
                    id: response.data.user.id,
                    name: response.data.user.name,
                    userName: response.data.user.username,
                    password: signInPass,
                    picture: response.data.user.profile_image,
                    postsCount: response.data.user.posts_count,
                    commentsCount: response.data.user.comments_count,
                    token: response.data.token,
                  }));
                  e.target.remove(); // REMOVING THE BUTTON TO SHOW THE SignInSuccessfullyMsg 
                  document.getElementById("SignInSuccessfullyMsg").style.display = "block";
                  setTimeout(() => { dispatch(setShowPopUp("")); }, 500);
                })
                .catch((error) => {
                  const errors = error.response.data.errors;
                  if (errors.email    != undefined) { errors.email.forEach((element)    => { signInUserNameErrorMsg.innerText = element; signInPasswordErrorMsg.innerText = element; }); }
                  if (errors.password != undefined) { errors.password.forEach((element) => { signInPasswordErrorMsg.innerText += element; }); }
                });
            }}
          />
          <p className="text-green-500 text-xl hidden" id="SignInSuccessfullyMsg">You Signed in successfully</p>
        </div>
    </PopUp>
  );
}
