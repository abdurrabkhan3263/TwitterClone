import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Logo } from "../component/index";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/auth";
import { logout, login, setLoader } from "../store/appSlice";
import "./NavStyle.css";
import {
  FaHome,
  IoSearchSharp,
  IoMdNotificationsOutline,
  BiMessageSquareDots,
  VscAccount,
  IoBookmarkOutline,
} from "../component/Icones/index";
import { IoLogOutOutline } from "react-icons/io5";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appReducer.user);
  const loader = useSelector((state) => state.appReducer.loader);
  const [navLoading, setNavLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const Navigation = [
    {
      icons: <FaHome />,
      name: ` Home`,
      url: "/home",
    },
    {
      icons: <IoSearchSharp />,
      name: ` Explore`,
      url: "/home/search",
    },
    {
      icons: <IoMdNotificationsOutline />,
      name: ` Notifications`,
      url: "#",
    },
    {
      icons: <BiMessageSquareDots />,
      name: ` Messages`,
      url: "#",
    },
    {
      icons: <IoBookmarkOutline />,
      name: ` Bookmarks`,
      url: "/home/bookmarks",
    },
    {
      icons: <VscAccount />,
      name: ` Profile`,
      url: `/home/profile/${user.user && user.user.$id}`,
    },
  ];
  const handleNavigation = (url) => {
    navigate(url);
  };
  useEffect(() => {
    service
      .getCurrentUser()
      .then((user) => {
        dispatch(login(user));
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setNavLoading(true);
        dispatch(setLoader(true));
      });
  }, []);
  const handleInOut = () => {
    service.logoutAccount().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  useEffect(() => {
    if (window.innerWidth <= 530) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <div className="pt-5 fixed">
      <ul>
        <li className="rounded-full cursor-pointer">
          <Link to="/home">
            <Logo width="40px" className={"ml-4"} />
          </Link>
        </li>
        <li>
          {Navigation.map((data) => (
            <Button
              type="button"
              onClick={() => {
                if (navLoading) {
                  handleNavigation(data.url);
                }
              }}
              key={data.name}
              className={`text-black flex items-center gap-x-6 px-4 py-3 text-xl border-none ${
                navLoading && "md:hover:bg-gray-200"
              } font-normal`}
            >
              <div className={`${navLoading || "skeleton"}`}>
                <span className={`text-3xl ${navLoading || "opacity-0"}`}>
                  {data.icons}
                </span>
              </div>
              <div className={`${navLoading || "skeleton"}`}>
                <span
                  className={`hidden lg:block  ${navLoading || "opacity-0"}`}
                >
                  {data.name}
                </span>
              </div>
            </Button>
          ))}
        </li>
        <li>
          {!isMobile ? (
            <Button
              className={`${
                !navLoading ? "skeleton" : "bg-blue-500"
              } text-white w-full border-none py-2`}
              onClick={handleInOut}
            >
              <span>{!user.status ? "Login" : "Log Out"}</span>
            </Button>
          ) : (
            <Button
              className={`${
                !navLoading ? "skeleton" : ""
              } text-black w-full border-none py-2 pl-4`}
              onClick={handleInOut}
            >
              <span className="text-3xl w-full">
                {!user.status ? "Login" : <IoLogOutOutline />}
              </span>
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Nav;
