import { useRef, useState }         from "react";
import { useDispatch, useSelector } from "react-redux";
import axios                        from "axios";
import schedule from "../assets/icons/Schedule.svg";
import gif      from "../assets/icons/Gif.svg";
import emoji    from "../assets/icons/Emoji.svg";
import poll     from "../assets/icons/Poll.svg";
import media    from "../assets/icons/Media.svg";
import MainBtn        from "./buttons/MainBtn";
import ProfilePicture from "./ProfilePicture";
import { addInfo } from "../redux/slices/personalInfo-slice";
import { apiUrl }  from "./constants";

export default function TweetEditor() {
  const [tweetBody, setTweetBody]   = useState("")
  const [tweetImage, setTweetImage] = useState("")
  const errorMsgP                   = useRef();
  const personalInfo = useSelector(state => state.personalInfo)
  const dispatch     = useDispatch()  

  function handleNewTweet() {
    const newTweetFormData = new FormData();
    newTweetFormData.append("body", tweetBody);
    if (tweetImage != "") { newTweetFormData.append("image", tweetImage); }
    
    axios
      .post(`${apiUrl}/posts`,  newTweetFormData, {headers: {authorization: `Bearer ${personalInfo.token}`}})
      .catch((error) => {
        let newTweetError = error.response.data.errors;
        errorMsgP.current.innerHTML = "";
        if (newTweetError.body != undefined) { errorMsgP.current.innerText += newTweetError.body[0]; }
        if (newTweetError.image != undefined) { let imageErrors = newTweetError.image.map((err) => (" " + err));  errorMsgP.current.innerText += imageErrors; } 
      })

    setTweetBody(""); // remove the tweet body
    setTweetImage(""); // remove the tweet Image

    // UPDATING THE PERSONALINFO POSTSCOUNT (AS IT APPEARS IN THE PROFILE PAGE)
    axios
      .get(`${apiUrl}/users/${personalInfo.id}`)
      .then((response) => {
          dispatch(addInfo({
            ...personalInfo,
            postsCount: response.data.data.posts_count,
          }));
        })
      .catch((error) => { console.error(error); });
  }

  return (
    <div className="p-4 flex border-y border-white border-opacity-25 gap-5">
      <ProfilePicture picture={ personalInfo.picture } />

      <div className="flex-1 flex flex-col h-40">
        {/* TWEET BODY */}
        <textarea placeholder="What's happening?" value={ tweetBody } onChange={ (e) => { setTweetBody(e.target.value); } }
          onClick={ ()=>{errorMsgP.current.innerHTML = "";}}
          className="placeholder:text-white placeholder:text-2xl w-full flex-1 bg-transparent text-lg focus:outline-none resize-none placeholder:opacity-50"></textarea>
          
        <div className="tweetOptions flex justify-between">
          <div className="tweetOptionsIcons flex">
            {/* TWEET IMAGE */ }
            <label htmlFor="tweetImage" className="flex justify-center">
              <img src={media} className="mr-2 cursor-pointer"  />
            </label>
            <input type="file" id="tweetImage" className="hidden" onChange={ (e) => {setTweetImage(e.target.files[0]);} } onClick={ ()=>{errorMsgP.current.innerHTML = "";}} />
            
            {/* OTHER UNFUNCTIONAL LOGOS (BECAUSE THE API DOSEN'T PROVIDE THIS TYPE OF DATA) */ }
            <img src={poll} className="mr-2 cursor-pointer" />
            <img src={gif} className="mr-2 cursor-pointer" />
            <img src={emoji} className="mr-2 cursor-pointer" />
            <img src={schedule} className="mr-2 cursor-pointer" />
          </div>
          
          <div className="tweetOptionsTweet">
            <MainBtn text="Tweet" bgColor="bg-blue-500" hoverBgColor="hover:bg-blue-400" onclick={handleNewTweet} />
          </div>
        </div>

        <p ref={errorMsgP} className="text-red-500"></p>
      </div>
    </div>
  );
}
