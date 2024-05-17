import React, { useEffect, useState } from "react";
import Container from "../component/Container/Container";
import { useSelector } from "react-redux";
import { database } from "../appwrite";
import AllPosts from "./AllPosts";
import { Rolling, Loader } from "../component/Icones";
import { RightSection } from "./index";
function BookMark() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState({ message: "", occurred: false });
  const user = useSelector((state) => state.appReducer.user);

  useEffect(() => {
    database
      .getAllPosts()
      .then((data) => {
        const bookMarksData = data.documents.filter((value) =>
          value.BookMarks.includes(user.user && user.user.$id)
        );
        setData(bookMarksData);
      })
      .catch((error) => setError({ message: error.message, occurred: true }))
      .finally(() => setLoader(false));
  }, [user.user]);

  return (
    <Container className={`flex justify-between relative`}>
      <div className="w-[100%] md:w-[60%] border-gray-200 border text-wrap px-4 py-3">
        <p className="text-[24px] font-[700]">Bookmark</p>
        {!loader ? (
          data.length > 0 ? (
            error.occurred ? (
              <h1 className=" text-center mt-4 text-2xl font-bold text-red-600">
                {error.message}
              </h1>
            ) : (
              <AllPosts data={data && data} />
            )
          ) : (
            <div className="w-full text-center">
              <h1 className="text-4xl font-extrabold">Save posts for later</h1>
              <p className="text-base text-gray-600 pt-4">
                Bookmark posts to easily find them again in the future.
              </p>
            </div>
          )
        ) : (
          <div className="w-full text-center mt-12">
            <Loader loaderSrc={Rolling} className={"w-12"} />
          </div>
        )}
      </div>
      <RightSection />
    </Container>
  );
}

export default BookMark;
