import { useEffect, useState }      from "react";
import { useDispatch, useSelector } from "react-redux";
import axios                        from "axios";
import PageTitle      from "./../components/PageTitle";
import Tweet          from "./../components/Tweet";
import EditTweetPopUp from "./../components/popUp/EditTweetPopUp";
import MainBtn        from "./../components/buttons/MainBtn";
import banner from "../assets/images/banner.jpg";
import { clearInfo } from "../redux/slices/personalInfo-slice";
import { apiUrl } from "./../components/constants";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const personalInfo = useSelector((state) => state.personalInfo);
  const dispatch     = useDispatch();
  
  useEffect(() => {
    // FETCHING THE PERSONAL PROFILE POSTS
    if (JSON.stringify(personalInfo) != "{}") {
      axios
        .get(`${apiUrl}/users/${personalInfo.id}/posts`)
        .then((response) => { setPosts(response.data.data); })
        .catch((error)   => { console.error(error); });
    }
  }, [personalInfo]);

  // ITERATING OVER THE POSTS TO GENERATE THE TWEETS
  const myPosts = posts?.map((post) => (
    <Tweet key={post.id} showProfileFromTweet={false} postId={post.id} showEditAndDelete={true} profileImage={post.author.profile_image} name={post.author.name} user={post.author.username} content={post.body} postImage={post.image} time={post.created_at} commentsCount={post.comments_count}/>
  ));

  return (
    <div className="timeLine border-x text-white border-white border-opacity-25 xl:ml-72 mt-14">
      <PageTitle title="Profile" />
      <EditTweetPopUp />

      { JSON.stringify(personalInfo) != "{}" ?
        (<>
            {/* BANNER (STATIC BECAUSE THE API DOESN'T PROVIDE THIS DATA) */}
            <div className="banner w-full h-80 overflow-hidden flex items-center justify-center">
              <img src={banner}  className="w-full"/>
            </div>

            {/* PROFILE PICTURE */ }
            <div className="bg-black relative bottom-10 left-10 w-40 h-40 rounded-full overflow-hidden flex justify-center items-center border-4 border-black">
              <img src={personalInfo.picture} className="w-auto h-auto absolute"/>
            </div>

            {/* SHOWING THE (POSTCOUNT + COMMENTSCOUNT + LOGOUT BUTTON + POSTS) */}
            { posts.length > 0
              ? (
                  <>
                    <div className="flex justify-around items-center mb-5">
                      {/* IF POSTSCOUNT IS -1,+1 POST (THIS IS A PROBLEM FROM THE API ITSELF) */}
                      <p className="flex-1 text-center">{ personalInfo.postsCount } {personalInfo.postsCount <= 10 && personalInfo.postsCount > 1 ? "Posts" : "Post"}</p>
                      <p className="flex-1 text-center">{ personalInfo.commentsCount } { personalInfo.commentsCount <= 10 && personalInfo.commentsCount > 1 ? "Comments" : "Comment" }</p>
                      <MainBtn text="logout" bgColor="bg-red-500" hoverBgColor="hover:bg-red-400 mx-5 sm:mx-10 text-center flex-1" onclick={ () => { dispatch(clearInfo()); window.localStorage.removeItem("personalInfo"); window.location.pathname = "/"; } } />
                    </div>
                    {myPosts}
                  </>
                )
              : (<p className="w-full text-center text-3xl">There's no Tweets yet</p>)
            }

        </>)
        :
        <p className="h-full w-full text-3xl flex justify-center items-center text-center">
          Try signing in to see your profile
          <br />
          or Create a New Account
        </p>
      }
    </div>
  );
}
