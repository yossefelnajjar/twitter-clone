import { useState }                 from "react";
import { useDispatch, useSelector } from "react-redux";
import axios                        from "axios";
import { setShowPopUp } from "../../redux/slices/popUp-slice";
import { addInfo }      from "../../redux/slices/personalInfo-slice";
import PopUp   from "./PopUp";
import MainBtn from "../buttons/MainBtn";
import { apiUrl } from "../constants";

export default function EditTweetPopUp() {
  const [newEditTweetBody, setNewEditTweetBody] = useState("");
  const personalInfo  = useSelector((state) => state.personalInfo);
  const editTweetInfo = useSelector((state) => state.editTweetInfo);
  const dispatch      = useDispatch()

  return (
    <PopUp popUpName="editTweet">
        <div className="flex-1 mb-5">
          <label htmlFor="editTweetBody" className="text-2xl pl-2 text-blue-500">Edit Your Tweet</label>
          <textarea value={newEditTweetBody} id="editTweetBody" onChange={(e) => {setNewEditTweetBody(e.target.value);}} 
            className="resize-none mt-1 w-full h-full py-3 px-2 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          ></textarea>
        </div>

        <div className="w-full flex justify-end flex-col items-center">
          <MainBtn text="Confirm" bgColor="w-full bg-blue-500 text-center text-white px-5 py-3" hoverBgColor="hover:bg-blue-400" onclick={()=>{
            axios
              .put(`${apiUrl}/posts/${editTweetInfo.id}`, {body: newEditTweetBody},{headers: {authorization: `Bearer ${personalInfo.token}`}})
              .then(()     => { dispatch(addInfo({ ...personalInfo })); dispatch(setShowPopUp("")); })
              .catch((err) => { console.log(err.response.data.error_message); });
            }}/>
        </div>
    </PopUp>
  );
}
