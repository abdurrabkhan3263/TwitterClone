import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import service from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as LogIn } from "../../store/appSlice";
import { useNavigate, Link } from "react-router-dom";
import { Loader, loader as loadergif } from "../Icones";
import { database } from "../../appwrite";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setError(null);
    setLoader(true);
    try {
      let user = await service.login(data);
      if (user) {
        let session = await service.getCurrentUser();
        navigate("/home");
        if (session) {
          let userData = await database.gettingUsers(session.$id);
          if (userData) {
            dispatch(LogIn(userData));
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  };
  return (
    <div>
      <div className="px-20">
        <h2 className="font-bold text-3xl">Login your account</h2>
        <p className="w-full text-center py-4">
          Do you want to create account?
          <span className="text-blue-500 hover:underline">
            <Link to="/sign-form"> Sign In</Link>
          </span>
        </p>
        {error ? (
          <p className="text-red-500 w-full text-center">{error}</p>
        ) : (
          ""
        )}
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col gap-y-8 mt-4"
        >
          <Input
            placeholder="Email"
            type="text"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                    value
                  ) || "Email address must be a valid address",
              },
            })}
            className="rounded-md py-4 px-2"
          />
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
            className="rounded-md py-4 px-2"
          />
          <Button type={"submit"} className={"w-full py-2 bg-black text-white"}>
            Login
          </Button>
        </form>
        {loader ? (
          <div className="w-full">
            <Loader className="w-[16%]" loaderSrc={loadergif} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default LoginForm;
