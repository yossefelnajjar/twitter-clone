import { useDispatch, useSelector } from "react-redux";
import axios                        from "axios";
import { addInfo }          from "../redux/slices/personalInfo-slice";
import { setEditTweetInfo } from "../redux/slices/editTweetInfo-slice";
import { setTargetPostId }  from "../redux/slices/targetPostId-slice";
import { setShowPopUp }     from "../redux/slices/popUp-slice";
import ProfilePicture from "./ProfilePicture";
import retweet    from "../assets/icons/Retweet.svg";
import likes      from "../assets/icons/React.svg";
import share      from "../assets/icons/Share.svg";
import deleteLogo from "../assets/icons/Delete.svg";
import edit       from "../assets/icons/Edit.svg";
import comments   from "../assets/icons/Reply.svg";
import { Link } from "react-router-dom";
import { apiUrl } from "./constants";

export default function Tweet({authorId, profileImage, name, user, content, postImage, time, commentsCount, showEditAndDelete, postId, showProfileFromTweet }) {
  const personalInfo = useSelector((state) => state.personalInfo);
  const dispatch     = useDispatch();
  
  function handleComments() {
    if (JSON.stringify(personalInfo) != "{}") { 
      dispatch(setShowPopUp("comments"));
      dispatch(setTargetPostId(postId));
    } else {
      dispatch(setShowPopUp("signIn"));
    }
  }
  
  // WILL ONLY APPEAR IN PERSONAL PROFILE (SO WE NEED TO UPDATE THE PERSONALINFO TO UPDATE THE POSTSCOUNT AT THE TOP)
  function handleDelte() {
    // DELETING THE POST
    axios
    .delete(`${apiUrl}/posts/${postId}`, { headers: { authorization: `Bearer ${personalInfo.token}` } })

    // UPDATING THE PERSONALINFO POSTSCOUNT
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

  function handleEdit() {
    dispatch(setShowPopUp("editTweet"))
    dispatch(setEditTweetInfo({ id: postId, bodyContent: content }));
  }

  return (
    <div className="p-4 flex border-y border-white border-opacity-25 gap-5">
      { showProfileFromTweet
          ?<ProfilePicture picture={ profileImage } addclass="cursor-pointer" toPath={authorId == personalInfo.id ? `/profile` : `/profile/${authorId}`} />
          :<ProfilePicture picture={ profileImage } />
      } 

      <div className="flex-1 flex flex-col">
        <div className="tweetHeader flex items-center" >
          { showProfileFromTweet
            ? <><Link to={authorId == personalInfo.id ? `/profile` : `/profile/${authorId}`} className="font-semibold text-lg cursor-pointer hover:underline">{name}</Link> <Link to={authorId == personalInfo.id ? `/profile` : `/profile/${authorId}`} className="ml-1 opacity-50 hover:underline">@{ user }</Link></>
            : <><p className="font-semibold text-lg">{name}</p> <p className="ml-1 opacity-50">@{user}</p></> }
            
            <p className="ml-1 opacity-50">. {time}</p>
        </div>

        <div className="tweetContent flex-1">
          <p>{content}</p>
          {JSON.stringify(postImage) !== "{}" && (
            <div className="w-full flex justify-center rounded-2xl mt-2 border overflow-hidden border-white border-opacity-25 ">
              <img src={postImage} className="w-full" />
            </div>
          )}
        </div>

        <div className="tweetOptions flex justify-between pt-4">

          <div className="tweetCommments flex items-center opacity-50 cursor-pointer transition-all hover:opacity-100 hover:text-blue-500" onClick={handleComments}>
            <img src={comments} alt="" className="rounded-full p-1.5" />
            <p>{commentsCount}</p>
          </div>

          <div className="tweetRetweet flex items-center opacity-50 cursor-pointer transition-all  hover:opacity-100 hover:text-green-500">
            <img src={retweet} alt="" className="rounded-full p-1.5" />
            <p>141</p>
          </div>

          {/* THE API DOESN'T PROVIDE LIKES ON POSTS SO I WILL DO IT MANUALLY */}
          <div className="tweetLikes flex items-center opacity-50 cursor-pointer transition-all hover:opacity-100 hover:text-pink-500">
            <img src={likes} alt="" className="rounded-full p-1.5" />
            <p>2,005</p>
          </div>
          
          { showEditAndDelete == true
            ? (<>
                <div className="tweetEdit flex items-center opacity-50 cursor-pointer transition-all hover:opacity-100 hover:text-blue-500" onClick={handleEdit}>
                  <img src={edit} alt="" className="rounded-full p-1.5 h-10" />
                </div>

                <div className="tweetDelete flex items-center opacity-50 cursor-pointer transition-all hover:opacity-100 hover:text-blue-500" onClick={handleDelte}>
                  <img src={deleteLogo} alt="" className="rounded-full p-1.5 h-10" />
                </div>
              </>)
            : (<div className="tweetDelete flex items-center opacity-50 cursor-pointer transition-all hover:opacity-100 hover:text-blue-500">
                <img src={share} alt="" className="rounded-full p-1.5" />
              </div>)
          }
        </div>
      </div>
    </div>
  );
}
