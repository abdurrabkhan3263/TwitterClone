import { memo, useState } from "react";
import { Button } from "./index";
import { admin } from "./Icones";
import { useEffect } from "react";
import useFindingImg from "../Hook/useFindingImg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FollowUnFollow } from "../Hook/index";
import { database } from "../appwrite";

function Follow({ data }) {
  let userMediaData = useFindingImg(data.$id);
  const user = useSelector((state) => state.appReducer.user);
  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();
  const [followLoading, setFollowLoading] = useState(true);
  const followUnfollow = () => {
    if (Object.keys(data.length > 0 && user.length > 0)) {
      setIsFollow((prev) => !prev);
      FollowUnFollow(user.user && user.user.$id, data.$id);
    }
  };
  useEffect(() => {
    setFollowLoading(true);
    if (Object.keys(data.length > 0)) {
      database
        .gettingUsers(data && data.$id)
        .then((res) => {
          res["followerUser"].includes(user.user && user.user.$id)
            ? setIsFollow(true)
            : setIsFollow(false);
        })
        .finally(() => setFollowLoading(false));
    }
  }, [data.$id, isFollow, user.user]);
  return (
    <div className="flex justify-between items-center">
      <div className="peer overflow-hidden rounded-full h-14 w-14">
        <img
          src={
            (userMediaData &&
              userMediaData[0] &&
              userMediaData[0]["profileImg"]) ||
            admin
          }
        />
      </div>
      <div className="flex flex-col">
        <h3
          className="peer-hover:text-blue-400 font-bold select-none cursor-pointer hover:underline"
          onClick={() => navigate(`/home/profile/${data.$id}`)}
        >
          {data && data.name}
        </h3>
        <p className="text-base">@{data && data.name.toLowerCase()}</p>
      </div>
      <div className="lg:w-1/3 flex justify-center">
        <Button
          className={`${isFollow ? "bg-gray-400" : "bg-black"} ${
            isFollow ? "text-black" : "text-white"
          } px-1.5 lg:px-3.5 py-1`}
          onClick={followUnfollow}
        >
          {isFollow ? "UnFollow" : "Follow"}
        </Button>
      </div>
    </div>
  );
}

export default Follow;
