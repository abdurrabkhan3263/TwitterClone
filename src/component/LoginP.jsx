import React, { useEffect, useState } from "react";
import { Button, Logo } from "./index";
import { IoClose } from "./Icones/index";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  let [form, setForm] = useState(false);
  const navigate = useNavigate();
  const status = useSelector((state) => state.appReducer.user.status);
  const location = useLocation();
  useEffect(() => {
    let loc = location.pathname;
    if (loc !== "/") {
      setForm(true);
    }
  }, [location]);
  useEffect(() => {
    if (status) navigate("/home");
  }, [status]);
  return (
    <div className="lg:flex lg:justify-between lg:items-center h-screen lg:px-96 relative">
      <div
        className={`p-2 absolute lg:w-1/3 w-[95%] lg:h-2/3 right-[50%] translate-x-[50%] bottom-[50%] translate-y-[50%] bg-white drop-shadow-2xl  rounded-xl ${
          !form ? "hidden" : "block"
        }`}
      >
        <div className=" text-3xl">
          <button
            onClick={() => {
              setForm((prev) => !prev);
              navigate("/");
            }}
          >
            <IoClose />
          </button>
        </div>
        <Outlet />
      </div>
      <div className="lg:w-1/3 w-[50%]">
        <Logo width="400px" className={"flex justify-center lg:block"} />
      </div>

      <div className="lg:w-2/3 w-full lg:flex lg:justify-end">
        <div className="flex lg:block flex-col pl-4 lg:pl-0">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold">Happening now</h1>
            <div className="flex justify-between items-end">
              <h4 className="text-4xl font-semibold pt-6">Join today.</h4>
            </div>
          </div>
          <div className="w-[90%] lg:w-[70%] pt-6">
            <div>
              <h3 className="font-semibold">Create Account</h3>
              <Button
                type={"button"}
                className={`w-full border-blue-500 hover:bg-blue-600 bg-blue-500 text-white py-1.5`}
                onClick={() => {
                  setForm((prev) => !prev);
                  navigate("/sign-form");
                }}
              >
                Create Account
              </Button>
            </div>
            <div>
              <h2 className="font-semibold">
                Already have an account? <Link to="/login">Login</Link>
              </h2>
              <Button
                type={"button"}
                className={`w-full text-blue-500 hover:bg-blue-100 bg-white py-1.5`}
                onClick={() => {
                  setForm((prev) => !prev);
                  navigate("/login-form");
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
