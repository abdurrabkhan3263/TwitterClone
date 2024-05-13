import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Rolling, Loader } from "../../component/Icones/index";
import AllPosts from "../AllPosts";
import useData from "./useData";

function Like() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.appReducer.user);
  useEffect(() => {
    useData(false)
      .then((postItems) => {
        setError(false);
        postItems.map((postData) => {
          if (postData.likeduser.includes(user.user?.$id)) {
            setData((prev) => [postData, ...prev]);
          }
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoader(false));
  }, []);
  return !loader ? (
    <div>
      <div>
        {data.length > 0 ? (
          <AllPosts data={data} />
        ) : (
          <div>
            {!error ? (
              <h1 className=" text-center mt-4 text-2xl font-bold">
                Not Like Any Post
              </h1>
            ) : (
              <h1 className=" text-center mt-4 text-2xl font-bold text-red-500">
                {error.message}
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="w-full text-center mt-12">
      <Loader loaderSrc={Rolling} className={"w-12"} />
    </div>
  );
}

export default Like;
