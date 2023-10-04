import { useEffect, useState }      from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link }                     from "react-router-dom";
import axios                        from "axios";
import { addInfo } from "./../../redux/slices/personalInfo-slice";
import { apiUrl }  from "../constants";
import MainBtn        from "./../buttons/MainBtn";
import PopUp          from "./PopUp";
import ProfilePicture from "./../ProfilePicture";

export default function CommentsPopUp() {
  const [commentValue, setCommentValue]   = useState("");
  const [tweetComments, setTweetComments] = useState([]);
  const personalInfo = useSelector((state) => state.personalInfo);
  const postId       = useSelector((state) => state.targetPostId);
  const dispatch     = useDispatch();
  
  useEffect(() => {
    // CONDITION (BECAUSE THIS WILL RENDER WHEN THE PAGE LOADS AS IT IS IN THE APP COMPONENT) && (commentValue == "" BECAUSE WE WANT TO FETCH THE DATA WHEN COMMENTS VALUE IS EMPTY -MEANING WHEN THE POSTID CHANGES AS YOU CLIKC THE COMMENT ON THE TWEET AND WHENYOU HIT COMMENT BUTTON-)
    if (postId != null && commentValue == "") {
      axios
      .get(`${apiUrl}/posts/${postId}`)
      .then((response) => { setTweetComments(response.data.data.comments); })
      .catch((error)   => { console.log(error); })
    }
  }, [postId, commentValue]);

  function handleNewComment() {
    // SENDING THE COMMENT
    axios
      .post(`${apiUrl}/posts/${postId}/comments`, { body: commentValue }, { headers: { Authorization: `Bearer ${personalInfo.token}` }, })
      .then(()       => { setCommentValue(""); dispatch(setTweetComments([...tweetComments])); })
      .catch((error) => { console.error(error); });
    // UPDATING THE COMMENTSCOUNT IN PERSOALINFO (AS IT APPEARS IN THE PROFILE)
    axios
      .get(`${apiUrl}/users/${personalInfo.id}`)
      .then((response) => { dispatch(addInfo({ ...personalInfo, commentsCount: response.data.data.comments_count })); })
      .catch((error)   => { console.error(error); });
  }

  const fullComments = tweetComments?.map((comment) => {
    const regex = /(\d{4}-\d{2}-\d{2})/;
    const commentDate = regex.exec(comment.author.created_at)[0];
    
    return (
      <div key={comment.id} className="p-4 flex border-y border-white border-opacity-25 gap-5">
        <ProfilePicture picture={ comment.author.profile_image } toPath={comment.author.id == personalInfo.id ? `/profile` : `/profile/${comment.author.id}`} />

        <div className="flex-1 flex flex-col">
          <div className="tweetHeader flex items-center">
            <Link to={comment.author.id == personalInfo.id ? `/profile` : `/profile/${comment.author.id}`} className="font-semibold text-lg cursor-pointer hover:underline">{ comment.author.name }</Link>
            <p className="ml-1 opacity-50">@{comment.author.username} . {commentDate}</p>
          </div>

          <div className="tweetContent flex-1"> <p>{comment.body}</p> </div>
        </div>
      </div>
    );
  });

  return (
    <PopUp popUpName="comments">
      <div className="flex-1 overflow-y-auto">
        {tweetComments != [] && fullComments}
      </div>

      <div className="flex justify-end gap-1 w-full">
        <input type="text" value={commentValue} onChange={(e) => { setCommentValue(e.target.value);}} placeholder="Type a Comment"
          className="mt-1 w-full py-3 px-2 flex-1 rounded-2xl border focus:outline-none focus:border-blue-500 placeholder:text-white placeholder:text-opacity-25 focus:placeholder:text-transparent text-white text-xl bg-transparent"
          />
        <p className="text-red-500" id="CommentErrorMsg"></p>
        <MainBtn text="Comment" bgColor=" bg-blue-500 text-center text-white px-5 py-3" hoverBgColor="hover:bg-blue-400" onclick={ handleNewComment } />
      </div>
    </PopUp>
  );
}
