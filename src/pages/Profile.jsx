import React, { useState, useCallback, useEffect } from "react";
import Container from "../component/Container/Container";
import { Button } from "../component";
import { CgCalendarDates } from "react-icons/cg";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SetUp } from "./ProfilePage/index";
import { Loader, Rolling, admin, headerImage } from "../component/Icones";
import { useFindingImg, useGettingDate, FollowUnFollow } from "../Hook/index";
import RightSection from "./RightSection";
import { database } from "../appwrite";

function Profile({ className }) {
  const [isSetUp, setIsSetUp] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.appReducer.user);
  const [isFollow, setIsFollow] = useState(false);
  const userData = useFindingImg(id, isFollow);
  const activeUserData = useFindingImg(user.user && user.user.$id, isFollow);
  const fullDate = useGettingDate(userData[1]["joinDate"]);
  const [followLoading, setFollowLoading] = useState(true);
  const followUnfollow = () => {
    if (Object.keys(userData[1]).length > 0 && activeUserData[1]) {
      setIsFollow((prev) => !prev);
      FollowUnFollow(user.user && user.user.$id, id);
    }
  };

  useEffect(() => {
    setFollowLoading(true);
    if (Object.keys(userData[1]).length > 0) {
      database
        .gettingUsers(id)
        .then((res) => {
          res["followerUser"].includes(user.user && user.user.$id)
            ? setIsFollow(true)
            : setIsFollow(false);
        })
        .finally(() => setFollowLoading(false));
    }
  }, [id, isFollow, user.user, userData[1]]);
  return (
    <Container className={`flex justify-between relative ${className}`}>
      {isSetUp ? (
        <div className="w-[100vw] h-[100vh] lg:w-[35vw] lg:h-[70%] min-h-[75%] fixed shadow-2xl bg-white rounded-xl z-50 bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2">
          <SetUp setUp={setIsSetUp} postData={userData && userData} />
        </div>
      ) : (
        ""
      )}
      <div className="w-full lg:w-[60%] border-gray-200 border text-wrap">
        <div className="w-full h-14 sticky top-0 bg-white border-b border-gray-200 flex z-40 pl-4 items-center cursor-pointer">
          <p className="text-2xl font-bold">
            {userData[1] && userData[1].name}
          </p>
        </div>
        <div>
          <div className="w-full h-[210px] bg-gray-200">
            {userData[2] && userData[2] ? (
              <img
                src={(userData[0] && userData[0].headerImg) || headerImage}
                alt="headerImg"
                className={`w-full h-full object-cover`}
              />
            ) : (
              <Loader
                loaderSrc={Rolling}
                classParent={"h-full w-full flex justify-center items-center"}
                className="h-[90px] object-cover"
              />
            )}
          </div>
          <div className="flex justify-between px-4">
            <div className="h-[155px] w-[155px] bg-gray-200 rounded-full border-4 border-white mt-[-10%] overflow-hidden">
              {userData[2] && userData[2] ? (
                <img
                  src={(userData[0] && userData[0].profileImg) || admin}
                  alt="profileImg"
                />
              ) : (
                <Loader
                  loaderSrc={Rolling}
                  classParent={"h-full w-full flex justify-center items-center"}
                  className="h-[90px] object-cover"
                />
              )}
            </div>
            {user.user && user.user.$id && id === user.user.$id ? (
              <div>
                <Button
                  className={
                    "lg:px-6 lg:py-[6px] px-1 text-md hover:bg-slate-200 text-base"
                  }
                  onClick={() => setIsSetUp((prev) => !prev)}
                  id="setupBtn"
                >
                  {userData[2] ? (
                    userData[1].isEdited ? (
                      "Edit"
                    ) : (
                      "Setup Profile"
                    )
                  ) : (
                    <Loader
                      loaderSrc={Rolling}
                      classParent={
                        "h-full w-full flex justify-center items-center"
                      }
                      className="h-[28px] object-cover"
                    />
                  )}
                </Button>
              </div>
            ) : (
              <Button
                className={`px-6 py-1 ${
                  isFollow ? "bg-gray-400" : "bg-black"
                } ${isFollow ? "text-black" : "text-white"} `}
                onClick={followUnfollow}
              >
                {followLoading ? (
                  <Loader
                    loaderSrc={Rolling}
                    classParent={
                      "h-full w-full flex justify-center items-center"
                    }
                    className="h-[28px] object-cover"
                  />
                ) : isFollow ? (
                  "UnFollow"
                ) : (
                  "Follow"
                )}
              </Button>
            )}
          </div>

          <div className="flex flex-col px-4">
            <p className="text-2xl font-bold">
              {userData[1] && userData[1].name}
            </p>
            <p className="font-normal text-gray-500">
              @
              {userData[1] &&
                userData[1].name &&
                userData[1].name.toLowerCase()}
            </p>
            <p>{userData[1] && userData[1].bio}</p>
            <p className="pt-4  font-medium text-gray-500 text-[15px] flex items-center gap-1">
              <span className="text-xl">
                <CgCalendarDates />
              </span>
              Joined {fullDate[0] && fullDate[0]} {fullDate[1] && fullDate[1]}
            </p>
            <div className="flex gap-4 pt-2">
              <p className=" font-medium text-gray-500 select-none hover:underline">
                <span className="font-semibold text-black">
                  {(userData[1] &&
                    userData[1].followUsers &&
                    userData[1].followUsers.length) ||
                    0}
                </span>{" "}
                Following
              </p>
              <p className="font-medium text-gray-500 select-none hover:underline">
                <span className="font-semibold text-black">
                  {(userData[1] &&
                    userData[1].followerUser &&
                    userData[1].followerUser.length) ||
                    0}
                </span>{" "}
                Followers
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between flex-grow border-b-[1.5px]">
            <Link to={`/home/profile/${id && id}`} className="w-full">
              <p className="hover:bg-gray-200 w-full text-center select-none cursor-pointer py-3 mt-3 font-semibold text-lg text-gray-600">
                Posts
              </p>
            </Link>
            <Link to={`bookmarks/${id && id}`} className="w-full">
              <p className="hover:bg-gray-200 w-full text-center select-none cursor-pointer py-3 mt-3 font-semibold text-lg text-gray-600">
                BookMarks
              </p>
            </Link>
            <Link to={`likepost/${id && id}`} className="w-full">
              <p className="hover:bg-gray-200 w-full text-center select-none cursor-pointer py-3 mt-3 font-semibold text-lg text-gray-600">
                Like
              </p>
            </Link>
          </div>
          <div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <RightSection />
    </Container>
  );
}

export default Profile;
