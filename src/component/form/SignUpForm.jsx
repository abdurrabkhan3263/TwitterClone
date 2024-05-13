import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import service from "../../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { Loader, loader as loadergif } from "../Icones";
import { database } from "../../appwrite";

function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [redirection, setRedirection] = useState(false);
  const navigate = useNavigate();
  const signup = async (data) => {
    setError(null);
    setLoader(true);
    try {
      const user = await service.createAccount(data);
      if (user) {
        let userId = user.userId;
        console.log("SignUp For User Data ", user);
        setRedirection(true);
        database
          .createUsers(userId, {
            bio: "",
            headerImg: "",
            profileImg: "",
            followerUser: [],
            followUsers: [],
            name: data.name,
            isEdited: false,
          })
          .then((profileData) => {
            console.log("Profile Data:- ", profileData);
            setTimeout(() => {
              setRedirection(false);
              navigate("/home");
            }, 1000);
          })
          .catch((error) => setError(error));
      }
    } catch (error) {
      setError(error);
    }
    setLoader(false);
  };

  return (
    <div>
      {redirection ? (
        <div className="absolute h-fit font-bold text-center py-2 text-xl px-3 w-[60%] select-none text-blue-500 rounded-lg bg-white right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 shadow-2xl">
          Redirection to the home page
          <div className="w-full">
            <Loader className="w-[16%]" loaderSrc={loadergif} />
          </div>
        </div>
      ) : (
        <div className="px-20 relative">
          <h2 className="font-bold text-3xl">Create your account</h2>
          <p className="w-full text-center py-4">
            Already have an account?
            <span className="text-blue-500 hover:underline">
              <Link to="/login-form"> Log In</Link>
            </span>
          </p>
          {error ? (
            <p className="text-red-500 w-full text-center">{error.message}</p>
          ) : (
            ""
          )}
          <form
            onSubmit={handleSubmit(signup)}
            className="flex flex-col gap-y-8 mt-4"
          >
            <Input
              placeholder="Name"
              type="text"
              className="rounded-md py-4 px-2"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Email"
              type="text"
              {...register("email")}
              className="rounded-md py-4 px-2"
            />
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
              className="rounded-md py-4 px-2"
            />
            <Button
              type={"submit"}
              className={"w-full py-2 bg-black text-white"}
            >
              Create
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
      )}
    </div>
  );
}

export default SignUpForm;
