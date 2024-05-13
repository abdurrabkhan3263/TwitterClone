import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useData from "./useData";
import AllPosts from "../AllPosts";
import { Rolling, Loader } from "../../component/Icones/index";
import { useParams } from "react-router-dom";

function Posts() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState({ message: "", occurred: false });
  const user = useSelector((state) => state.appReducer.user);
  const { id } = useParams();
  useEffect(() => {
    useData("userId", id, true)
      .then((result) => {
        setData(result);
        setError({ message: "", occurred: false });
      })
      .catch((error) => {
        setError({ message: error.message, occurred: true });
      })
      .finally(() => setLoader(false));
  }, []);
  if (error.occurred) {
    return (
      <h1 className=" text-center mt-4 text-2xl font-bold text-red-500">
        {error.message}
      </h1>
    );
  }

  return !loader ? (
    <div>
      {data.length > 0 ? (
        <AllPosts data={data} />
      ) : (
        <h1 className=" text-center mt-4 text-2xl font-bold">
          No Posts Available
        </h1>
      )}
    </div>
  ) : (
    <div className="w-full text-center mt-12">
      <Loader loaderSrc={Rolling} className={"w-12"} />
    </div>
  );
}

export default Posts;
