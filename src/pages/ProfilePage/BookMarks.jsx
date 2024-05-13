import React, { useState, useEffect } from "react";
import useData from "./useData";
import { useSelector } from "react-redux";
import AllPosts from "../AllPosts";
import { Rolling, Loader } from "../../component/Icones/index";

function BookMarks() {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState({ message: "", occurred: false });
  const user = useSelector((state) => state.appReducer.user);
  useEffect(() => {
    useData(false)
      .then((result) => {
        result &&
          result.map((postItems) => {
            if (postItems.BookMarks.includes(user.user?.$id)) {
              setData((prev) => [postItems, ...prev]);
              setError({ message: "", occurred: false });
            }
          });
      })
      .catch((error) => setError({ message: error.message, occurred: true }))
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
          No BookMarks Available
        </h1>
      )}
    </div>
  ) : (
    <div className="w-full text-center mt-12">
      <Loader loaderSrc={Rolling} className={"w-12"} />
    </div>
  );
}

export default BookMarks;
