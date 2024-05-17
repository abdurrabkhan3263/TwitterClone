import React, { useEffect, useState } from "react";
import { Button } from "../index";
import { useForm } from "react-hook-form";
import { Image, Rolling, admin } from "../Icones";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import database from "../../appwrite/storage";
import { Loader, IoClose } from "../Icones/index";

function CreatePost() {
  const [textareaHeight, setTextareaHeight] = useState("5vh");
  const [posting, setPosting] = useState(false);
  let [src, setSrc] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.appReducer.user);
  const handleInputChange = (event) => {
    const { scrollHeight, clientHeight } = event.target;
    if (scrollHeight > clientHeight) {
      setTextareaHeight(scrollHeight + "px");
    }
  };
  const handlePostImage = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setSrc((prev) => [e.target.files[i], ...prev]);
    }
  };
  const removeImage = (e) => {
    setSrc((prev) =>
      prev.filter((value, index) => {
        return index != e.target.id;
      })
    );
  };
  const postSubmit = async (data) => {
    if (!posting) {
      setPosting(true);
      if (!user.status) {
        navigate("/login-form");
      } else {
        let ids = [];
        for (let i = 0; i < src.length; i++) {
          let file = await database.createFile(src[i]);
          console.log(src[i]);
          if (file) {
            ids.push(file.$id);
          }
        }
        data.postimage = ids;
        data.userId = user.user.$id;
        data.userName = "";
        data.like = 0;
        data.name = user.user.name;
        data.comment = [];
        data.posttime = Date.now();
        console.log(data);
        try {
          await database.createPost({ ...data });
          window.location.reload();
          setValue("post", "");
          setValue("images", "");
          setSrc([]);
        } catch (error) {
          throw ("Error is Posting :: error ", error);
        } finally {
          setPosting(false);
        }
      }
    }
  };
  return (
    <div className="w-full flex px-4 pt-5 border-b">
      <div className="ProfilePic">
        <div className="h-[52px] w-[52px] bg-black rounded-full overflow-hidden">
          <img
            src={(user.user && user.user.profileImg) || admin}
            className="h-full w-full object-cover"
            alt="Profile"
          />
        </div>
      </div>
      <div className="ActualPost_Container">
        <form onSubmit={handleSubmit(postSubmit)}>
          <textarea
            cols="100"
            onInput={handleInputChange}
            className="w-full text-[22px] font-normal ml-2 resize-none outline-none border-none px-2"
            placeholder="What is Happening?!"
            style={{ height: textareaHeight }}
            {...register("post", { required: true })}
          ></textarea>
          <div className="w-full h-[1px] bg-gray-300 "></div>
          <div className="w-full  overflow-y-hidden overflow-x-hidden rounded-xl mt-4 flex flex-wrap gap-y-4 justify-center">
            {src.map((value, index) => (
              <div
                className="relative overflow-hidden rounded-xl border"
                key={index}
              >
                <img
                  src={URL.createObjectURL(value)}
                  alt="post"
                  className="w-full object-cover"
                />
                <div
                  className="absolute top-0 right-0 m-1.5 text-2xl p-1 bg-gray-300 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                  onClick={removeImage}
                  id={index}
                >
                  <IoClose />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="w-8 overflow-hidden relative flex items-center justify-center">
              <div className="absolute text-xl">
                <Image />
              </div>
              <input
                type="file"
                multiple
                accept="image/jpg,image/png,image/gif"
                className="opacity-0"
                {...register("images")}
                onChange={handlePostImage}
              />
            </div>
            <Button
              className={
                "bg-blue-400 border-none hover:bg-blue-500 transition-all text-white px-5 py-1"
              }
              type={"submit"}
            >
              {!posting ? (
                "Post"
              ) : (
                <Loader className="w-[18px] py-1" loaderSrc={Rolling} />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
