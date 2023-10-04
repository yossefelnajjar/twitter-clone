import { useEffect, useState } from "react";
import { useSelector }         from "react-redux";
import InfiniteScroll          from "react-infinite-scroll-component";
import axios                   from "axios";
import PageTitle   from "./PageTitle";
import Tweet       from "./Tweet";
import TweetEditor from "./TweetEditor";
import { apiUrl } from "./constants";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [data, setData]   = useState({});
  const personalInfo = useSelector((state) => state.personalInfo);
  
  useEffect(() => {
    axios
      .get(`${apiUrl}/posts?page=1`)
      .then((response) => { setPosts(response.data.data); setData(response.data); })
      .catch((error)   => { console.error(error); });
  }, [personalInfo]);

  function nextData() {
    axios
      .get(data.links.next)
      .then((response) => { setPosts([...posts, ...response.data.data]); setData(response.data); })
      .catch((error)   => { console.error(error); });
  }
  
  const tweets = posts.map((post) => (
    <Tweet
      key={post.id}
      showProfileFromTweet={true}
      authorId={post.author.id}
      postId={post.id}
      profileImage={post.author.profile_image}
      name={post.author.name}
      user={post.author.username}
      content={post.body}
      postImage={post.image}
      time={post.created_at}
      commentsCount={post.comments_count}
    />
  ));

  return (
    <div className="timeLine h-full border-x text-white border-white border-opacity-25 xl:ml-72 mt-14">
      <PageTitle title="Home" />
      {JSON.stringify(personalInfo) != "{}" && <TweetEditor />}

      {JSON.stringify(data) != "{}" && (
        <InfiniteScroll
          dataLength = { posts.length }
          next       = { nextData }
          hasMore    = { data.links.next != null }
          loader     = { <p className="w-full text-center">Loading...</p> }
          endMessage = { <p className="w-full text-center">No more data to load.</p> }
        >
          {tweets}
        </InfiniteScroll>
      )}
    </div>
  );
}
