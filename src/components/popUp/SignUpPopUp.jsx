import { useState }    from "react";
import { useDispatch } from "react-redux";
import axios           from "axios";
import { addInfo }      from "../../redux/slices/personalInfo-slice";
import { setShowPopUp } from "../../redux/slices/popUp-slice";
import MainBtn from "../buttons/MainBtn";
import PopUp   from "./PopUp";
import { apiUrl } from "../constants";

export default function SignUpPopUp() {
  const [signupName, setSignupName]             = useState("");
  const [signupUserName, setSignupUserName]     = useState("");
  const [signupPass, setSignupPass]             = useState("");
  const [signupImageValue, setSignupImageValue] = useState("");
  const [signupImage, setSignupImage]           = useState("");
  
  let dispatch = useDispatch();

  return (
    <PopUp popUpName="signUp">
        <div>
          <label htmlFor="name" className="pl-2">Name</label>
          <input type="text" value={signupName} id="name" placeholder="Name" onChange={(e) => { setSignupName(e.target.value); }}
            className="mt-1 w-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
          <p className="text-red-500" id="userErrorMsg"></p>
        </div>

        <div>
          <label htmlFor="username" className="pl-2">Username</label>
          <input type="text" value={signupUserName} id="username" placeholder="Username" onChange={(e) => { setSignupUserName(e.target.value);}}
            className="mt-1 w-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
          <p className="text-red-500" id="userNameErrorMsg"></p>
        </div>

        <div>
          <label htmlFor="password" className="pl-2">Password</label>
          <input type="password" value={signupPass} id="password" placeholder="Password" onChange={(e) => {setSignupPass(e.target.value);}}
            className="mt-1 w-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
          <p className="text-red-500" id="passwordErrorMsg"></p>
        </div>

        <div>
          <label htmlFor="picture" className="pl-2">Picture</label>
          <input type="file" value={signupImageValue} id="picture" onChange={(e) => { setSignupImageValue(e.target.value); setSignupImage(e.target.files[0]); }}
            className="mt-1 w-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
          <p className="text-red-500" id="imageErrorMsg"></p>
        </div>

        <div className=" w-full flex justify-end flex-col items-center flex-1">
          <MainBtn text="Create account" bgColor="w-full bg-blue-500 text-center text-white px-5 py-3" hoverBgColor="hover:bg-blue-400"
            onclick={(e) => {
              const userErrorMsg     = document.getElementById("userErrorMsg");
              const userNameErrorMsg = document.getElementById("userNameErrorMsg");
              const passwordErrorMsg = document.getElementById("passwordErrorMsg");
              const imageErrorMsg    = document.getElementById("imageErrorMsg");
              userErrorMsg.innerText     = ""; 
              userNameErrorMsg.innerText = "";
              passwordErrorMsg.innerText = ""; 
              imageErrorMsg.innerText    = "";
              
              const registerFormData = new FormData();
              registerFormData.append("name",     signupName);     
              registerFormData.append("username", signupUserName);
              registerFormData.append("password", signupPass); 
              registerFormData.append("image",    signupImage);

              axios
                .post(`${apiUrl}/register`, registerFormData)
                .then((response) => {
                  dispatch(
                    addInfo({
                      id: response.data.user.id,
                      name: response.data.user.name,
                      userName: response.data.user.username,
                      password: signupPass,
                      picture: response.data.user.profile_image,
                      postsCount: response.data.user.posts_count,
                      commentsCount: response.data.user.comments_count,
                      token: response.data.token,
                    })
                  );
                  e.target.remove(); // REMOVING THE BUTTON TO SHOW THE accountCreatedMsg
                  document.getElementById("accountCreatedMsg").style.display = "block";
                  setTimeout(() => { dispatch(setShowPopUp("")); }, 500);
                })
                .catch((error) => {
                  const errors = error.response.data.errors;
                  if (errors.name     != undefined) { errors.name.forEach((element)     => { userErrorMsg.innerText     += element; }); }
                  if (errors.username != undefined) { errors.username.forEach((element) => { userNameErrorMsg.innerText += element; }); }
                  if (errors.password != undefined) { errors.password.forEach((element) => { passwordErrorMsg.innerText += element; }); }
                  if (errors.image    != undefined) { errors.image.forEach((element)    => { imageErrorMsg.innerText    += element; }); }
                });
            }}
          />
          <p className="text-green-500 text-xl hidden" id="accountCreatedMsg">Your Account Has Been Created successfully</p>
        </div>
    </PopUp>
  );
}
