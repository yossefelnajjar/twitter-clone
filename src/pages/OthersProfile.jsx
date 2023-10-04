
import { useEffect, useState }      from "react";
import { useParams }                from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios                        from "axios";
import banner from "./../assets/images/banner.jpg";
import Tweet      from "./../components/Tweet";
import PageTitle  from "./../components/PageTitle";
import { apiUrl } from "./../components/constants";
import { setShowPopUp } from "./../redux/slices/popUp-slice";

export default function OthersProfile() {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts]       = useState([]);
  const personalInfo        = useSelector((state) => state.personalInfo);
  const dispatch            = useDispatch()
  const { profileId } = useParams();

  useEffect(() => {
    // HIDING ANY POPUP (BECAUSE YOU CAN GET THE OTHERSPROFILE PAGE FROM THE COMMENTS)
    dispatch(setShowPopUp(""));

    //CHEKING IF THE PROFILE IS MINE
    if (localStorage.getItem("personalInfo") && profileId == personalInfo.id) {
      window.location.pathname = "/profile";
    } else {
      // FETCHING THE USER INFO
      axios
      .get(`${apiUrl}/users/${profileId}`)
      .then((response) => { setUserInfo(response.data.data);})
      .catch((error)   => { console.error(error); });

      // FETCHING THE USER PROFILE POSTS
      axios
      .get(`${apiUrl}/users/${profileId}/posts`)
      .then((response) => { setPosts(response.data.data); })
      .catch((error)   => { console.error(error); });
    }
  }, [profileId]);

  // ITERATING OVER THE POSTS TO GENERATE THE TWEETS
  let userPosts = posts?.map((post) => (
    <Tweet
      key={ post.id }
      showProfileFromTweet={ false }
      authorId={ profileId }                        
      postId={ post.id }
      profileImage={ post.author.profile_image }
      name={ post.author.name }
      user={ post.author.username }
      content={ post.body }
      postImage={ post.image }
      time={ post.created_at }
      commentsCount={ post.comments_count }
    />
  ));

  return (
    <div className="timeLine border-x text-white border-white border-opacity-25 xl:ml-72 mt-14 ">
      <PageTitle title={userInfo.name} />

      {JSON.stringify(userInfo) != "{}" && (
        <>
          {/* BANNER (STATIC BECAUSE THE API DOESN'T PROVIDE THIS DATA) */}
          <div className="banner w-full h-80 overflow-hidden flex items-center justify-center">
            <img src={banner} className="w-full" />
          </div>

          {/* PROFILE PICTURE */ }
          <div className="flex">
            <div className="bg-black relative bottom-10 left-10 w-40 h-40 rounded-full overflow-hidden flex justify-center items-center border-4 border-black">
              <img src={userInfo.profile_image} className="w-auto h-auto absolute"/>
            </div>
            
            <div className="relative bottom-10 left-14 overflow-hidden flex flex-col justify-center items-start ">
              <p className="font-semibold text-2xl">{userInfo.name}</p>
              <p className="opacity-50"> @{userInfo.username}</p>
            </div>
          </div>

          {/* SHOWING THE POSTS */}
          { posts.length > 0
            ? (<>
                <div className="flex justify-around items-center mb-5">
                  <p className="flex-1 text-center">
                    {userInfo.posts_count} {userInfo.posts_count <= 10 && userInfo.posts_count > 1 ? "Posts" : "Post"}
                  </p>

                  <p className="flex-1 text-center">
                    {userInfo.comments_count} {userInfo.comments_count <= 10 && userInfo.comments_count > 1 ? "Comments" : "Comment"}
                  </p>
                </div>

                {userPosts}
              </>)
            : (<p className="w-full text-center text-3xl">There's no Tweets yet</p>)
          }
        </>
      )}
    </div>
  );
}



