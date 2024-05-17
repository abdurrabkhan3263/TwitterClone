import React, { useState } from "react";
import { database } from "../appwrite";
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Input, Button, Follow } from "../component";
import { Rolling, Loader } from "../component/Icones";
import { useSelector } from "react-redux";

function RightSection() {
  const [searchVal, setSearchVal] = useState("");
  const [userToFollow, setUserToFollow] = useState(null);
  const [followLoader, setFollowLoader] = useState(false);
  const [followError, setFollowError] = useState(null);
  const userData = useSelector((state) => state.appReducer.user);
  React.useEffect(() => {
    database
      .gettingAllUser(userData.user && userData.user.$id)
      .then((usersData) => setUserToFollow(usersData.documents))
      .catch((error) => setFollowError(error.message))
      .finally(() => setFollowLoader(true));
  }, [userData]);

  return (
    <div className="w-[260px] pr-2 lg:w-[360px] h-[100vh] overflow-hidden right-0 sticky top-0 pt-2 sm:flex flex-col gap-y-4 hidden ">
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
        {/* <h1 className="text-center text-red-500 font-bold text-lg">
          {followError}
        </h1> */}
        <div className="flex flex-col pt-4">
          {followLoader ? (
            userToFollow &&
            userToFollow.map((userData) => (
              <Follow key={userData.$id} data={userData} />
            ))
          ) : (
            <Loader
              loaderSrc={Rolling}
              classParent={"h-full w-full"}
              className={"object-cover h-[50px]"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RightSection;
