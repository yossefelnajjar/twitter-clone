import { useEffect, useState } from "react";
import { useSelector }         from "react-redux";
import InfiniteScroll          from "react-infinite-scroll-component";
import { useParams }           from "react-router-dom";
import axios                   from "axios";
import PageTitle  from "../components/PageTitle";
import Tweet      from "../components/Tweet";
import { apiUrl } from "../components/constants";

export default function SpecificTrend() {
  const [trendData, setTrendData]   = useState();
  const [trendPosts, setTrendPosts] = useState();
  const trends = useSelector((state) => state.trends);
  const { trendName } = useParams();
  
  const trendsNames = trends.map((trend) => trend.name);
  const targetTrendIndex = trendsNames.indexOf(trendName) + 1;
  
  useEffect(() => {
    axios
    .get(`${apiUrl}/tags/${targetTrendIndex}/posts`)
    .then((response) => { setTrendData(response.data); setTrendPosts(response.data.data); })
    .catch((error)   => { console.error(error); });
  }, [targetTrendIndex]);
  
  function nextData() {
    axios
      .get(trendData.links.next)
      .then((response) => { setTrendPosts([...trendPosts, ...response.data.data]); setTrendData(response.data); })
      .catch((error)   => { console.error(error); });
  }

  const finalTrendPosts = trendPosts?.map((post) => (
    <Tweet key={ post.id } profileImage={ post.author.profile_image } name={ post.author.name } user={ post.author.username } content={ post.body } postImage={ post.image } time={ post.created_at } commentsCount={ post.comments_count } />
  ))

  return (
    <>
      <div className="timeLine border-x text-white border-white border-opacity-25 xl:ml-72 relative mt-14 ">
        <PageTitle title={ `#${trendName.toUpperCase()}` } />

        {trendPosts != undefined && (
          <InfiniteScroll
            dataLength = { trendPosts.length }
            next       = { nextData }
            hasMore    = { trendData.links.next != null }
            loader     = { <p className="w-full text-center">Loading...</p> }
            endMessage = { <p className="w-full text-center">No more data to load.</p> }
          >
            {finalTrendPosts}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}
