import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav } from "./index";
function Home() {
  return (
    <div className="flex text-blue-500 justify-center">
      <div className="w-full  lg:w-[70%]">
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
