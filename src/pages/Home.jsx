import React, { useState, useEffect } from "react";
import Container from "../component/Container/Container";
import { CreatePost } from "../component";
import AllPosts from "./AllPosts";
import { database } from "../appwrite";
import { Rolling, Loader } from "../component/Icones";
import { RightSection } from "./index";
import { useQuery } from "@tanstack/react-query";

const Home = ({ className }) => {
  const {
    data = "",
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      return await database.getAllPosts();
    },
  });
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await database.getAllPosts();
  //       if (data.documents) {
  //         setData(data.documents);
  //         setError({ message: "", occurred: true });
  //       }
  //     } catch (error) {
  //       setError({ message: error.message, occurred: false });
  //     }
  //   })().finally(() => setLoader(true));
  // }, []);

  return (
    <Container className={`flex justify-between relative ${className}`}>
      <div className="w-[100%] sm:w-[60%] border-gray-200 border text-wrap">
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
            {isLoading ? (
              <div className="w-full text-center mt-12">
                <Loader loaderSrc={Rolling} className={"w-12"} />
              </div>
            ) : isError ? (
              <h1 className=" text-center mt-4 text-2xl font-bold text-red-600">
                {error && error.message}
              </h1>
            ) : (
              Array.isArray(data) && <AllPosts data={data} />
            )}
          </div>
        </div>
      </div>
      <RightSection />
    </Container>
  );
};

export default Home;
