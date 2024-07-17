import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "./appwrite/auth";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setLoader } from "./store/appSlice";
import { FaXTwitter } from "./component/Icones/index";
import { database } from "./appwrite";

function App() {
  const loader = useSelector((state) => state.appReducer.loader);
  const [userImgUrl, setUserImgUrl] = useState({});
  const [isGetUrl, setIsGetUrl] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    service
      .getCurrentUser()
      .then((user) => {
        database.gettingUsers(user.$id).then((userData) => {
          let { headerImg, profileImg } = userData;
          let promises = [];
          if (!isGetUrl) {
            if (headerImg)
              promises.push(
                database.getProfileUrl(headerImg).then((url) => {
                  setUserImgUrl((prev) => ({ ...prev, headerImg: url.href }));
                })
              );
            if (profileImg)
              promises.push(
                database.getProfileUrl(profileImg).then((url) =>
                  setUserImgUrl((prev) => ({
                    ...prev,
                    profileImg: url.href,
                  }))
                )
              );
            setIsGetUrl(true);
          }
          Promise.all(promises).then(() => {
            const allData = { ...user, ...userImgUrl };
            dispatch(login(allData));
          });
        });
      })
      .catch(() => {
        dispatch(logout());
        navigate("/");
      })
      .finally(() => {
        dispatch(setLoader(true));
      });
  }, [isGetUrl]);
  return !loader ? (
    <div className="w-screen h-screen bg-black text-white text-9xl flex justify-center sm:justify-center items-center">
      <FaXTwitter />
    </div>
  ) : (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
