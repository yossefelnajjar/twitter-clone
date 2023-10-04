import { useEffect, useState } from "react";
import axios                   from "axios";
import WhoToFollowRow from "./WhoToFollowRow";

export default function WhoToFollow() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://tarmeezacademy.com/api/v1/users")
      .then((response) => { setUsers(response.data.data); })
      .catch((error)   => { console.error(error); });
  }, []);

  let usersToFollow = users
    .slice(0, 3)
    .map((user) => (<WhoToFollowRow key={ user.id } toPath={user.id} picture={user.profile_image} name={user.name} user={user.username}/>));

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-3xl py-4 flex flex-col gap-5">
      <p className="text-2xl px-4">Who to follow</p>
      {usersToFollow}
    </div>
  );
}
