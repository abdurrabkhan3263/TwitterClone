import React, { useState } from "react";
import Container from "../component/Container/Container";
import { Input, Button, Follow, Post } from "../component";
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { Outlet, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SetUp } from "./ProfilePage/index";
import { admin, Rolling, Loader, headerImage } from "../component/Icones";
import useFindingImg from "../Hook/useFindingImg";

function Profile({ className }) {
  const [searchVal, setSearchVal] = useState("");
  const [isSetUp, setIsSetUp] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.appReducer.user);
  const userData = useFindingImg(id);
  return (
    <Container className={`flex justify-between relative ${className}`}>
      {isSetUp ? (
        <div className="w-[35vw] h-[70%] fixed shadow-2xl bg-white rounded-xl z-50 bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2">
          <SetUp setUp={setIsSetUp} postData={userData && userData} />
        </div>
      ) : (
        ""
      )}
      <div className="w-[60%] border-gray-200 border text-wrap">
        <div className="w-full h-14 sticky top-0 bg-white border-b border-gray-200 flex z-40 pl-4 items-center cursor-pointer">
          <p className="text-2xl font-bold">
            {userData[1] && userData[1].name}
          </p>
        </div>
        <div>
          <div className="w-full h-[210px] bg-gray-200">
            <img
              src={(userData[0] && userData[0].headerImg) || Rolling}
              alt="headerImg"
              className={`w-full h-full object-cover`}
            />
          </div>

          <div className="flex justify-between px-4">
            <div className="h-[155px] w-[155px] bg-gray-200 rounded-full border-4 border-white mt-[-10%] overflow-hidden">
              <img
                src={(userData[0] && userData[0].profileImg) || Rolling}
                alt="profileImg"
              />
            </div>
            {user.user && user.user.$id && id === user.user.$id ? (
              <div>
                <Button
                  className={"px-6 py-[6px] text-md hover:bg-slate-200"}
                  onClick={() => setIsSetUp((prev) => !prev)}
                  id="setupBtn"
                >
                  Set Up Profile
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col px-4">
            <p className="text-2xl font-bold">
              {userData[1] && userData[1].name}
            </p>
            <p className="font-normal text-gray-500">@raheemkhan</p>
            <p>{userData[1] && userData[1].bio}</p>
            <p className="pt-4  font-medium text-gray-500 text-[15px] flex items-center gap-1">
              <span className="text-xl">
                <CgCalendarDates />
              </span>
              Joined April 2024
            </p>
            <div className="flex gap-4 pt-2">
              <p className=" font-medium text-gray-500">
                <span className="font-semibold text-black">
                  {(userData[1] &&
                    userData[1].followerUser &&
                    userData[1].followerUser.length) ||
                    0}
                </span>{" "}
                Following
              </p>
              <p className=" font-medium text-gray-500">
                <span className="font-semibold text-black">
                  {(userData[1] &&
                    userData[1].followUsers &&
                    userData[1].followUsers.length) ||
                    0}
                </span>{" "}
                Follow
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
      <div className=" w-[360px] h-[100vh] overflow-hidden right-0 sticky top-0 pt-2 flex flex-col gap-y-4">
        <div className="w-full h-12 bg-[#EFF3F4] rounded-full text-white flex items-center text-base px-6 gap-x-2 justify-between flex-grow-1">
          <div className="text-2xl text-blue-500">
            <IoSearchSharp />
          </div>
          <div className="bg-red-400">
            <Input
              className="py-3 px-2 font-normal text-base bg-[#EFF3F4] text-black border-none flex-grow-1"
              placeholder="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
          <div className="text-2xl text-blue-500">
            {searchVal ? (
              <div onClick={() => setSearchVal("")}>
                <IoClose />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p-2 border rounded-xl">
          <h3 className="text-xl font-extrabold pb-2">Subscribe to Premium</h3>
          <p className="text-base font-normal">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <Button className={"bg-black text-white px-5 py-1"}>Subscribe</Button>
        </div>
        <div className="py-2 border rounded-xl">
          <h4 className="text-[22px] font-bold px-2">What’s happening</h4>
          <div className="flex flex-col pt-3">
            <div className="transition-all hover:bg-slate-200 w-full flex flex-col gap-y-1 px-4 py-2">
              <p className=" text-[14px]">Only on X · Trending</p>
              <p className="font-bold">#HelicopterCrash</p>
              <p className=" text-[14px]">1,597 posts</p>
            </div>
            <div className="transition-all hover:bg-slate-200 w-full flex flex-col gap-y-1 px-4 py-2">
              <p className=" text-[14px]">Only on X · Trending</p>
              <p className="font-bold">#HelicopterCrash</p>
              <p className=" text-[14px]">1,597 posts</p>
            </div>
            <div className="transition-all hover:bg-slate-200 w-full flex flex-col gap-y-1 px-4 py-2">
              <p className=" text-[14px]">Only on X · Trending</p>
              <p className="font-bold">#HelicopterCrash</p>
              <p className=" text-[14px]">1,597 posts</p>
            </div>
            <div className="transition-all hover:bg-slate-200 w-full flex flex-col gap-y-1 px-4 py-2">
              <p className=" text-[14px]">Only on X · Trending</p>
              <p className="font-bold">#HelicopterCrash</p>
              <p className=" text-[14px]">1,597 posts</p>
            </div>
          </div>
        </div>
        <div className="p-2 border rounded-xl">
          <h3 className="text-2xl font-bold">Who to follow</h3>
          <div className="flex flex-col pt-4">
            <Follow />
            <Follow />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
