import React, { useState } from "react";
import Container from "../component/Container/Container";
import { Input, Button, Follow, Post, CreatePost } from "../component";
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import AllPosts from "./AllPosts";
import { database } from "../appwrite";
import { Rolling, Loader } from "../component/Icones";

const Home = ({ className }) => {
  const [searchVal, setSearchVal] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState({ message: "", occurred: false });
  const [loader, setLoader] = useState(false);
  React.useEffect(() => {
    (async () => {
      try {
        const data = await database.getAllPosts();
        if (data.documents) {
          setData(data.documents);
          setError({ message: "", occurred: true });
        }
      } catch (error) {
        setError({ message: error.message, occurred: false });
      }
    })().finally(() => setLoader(true));
  }, []);

  return (
    <Container className={`flex justify-between relative ${className}`}>
      <div className="w-[60%] border-gray-200 border text-wrap">
        <div className="w-full h-14 sticky top-0 bg-white border-b border-gray-200 flex z-40">
          <div className="w-1/2 duration-150 h-full hover:bg-gray-200 flex items-center justify-center text-lg font-medium cursor-pointer">
            For You
          </div>
          <div className="w-1/2 duration-150 h-full hover:bg-gray-200 flex items-center justify-center text-lg font-medium cursor-pointer">
            Following
          </div>
        </div>
        <div>
          <CreatePost />
          <div>
            {loader ? (
              error.occurred ? (
                <AllPosts data={data && data} />
              ) : (
                <h1 className=" text-center mt-4 text-2xl font-bold text-red-600">
                  {error.message}
                </h1>
              )
            ) : (
              <div className="w-full text-center mt-12">
                <Loader loaderSrc={Rolling} className={"w-12"} />
              </div>
            )}
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
};

export default Home;
