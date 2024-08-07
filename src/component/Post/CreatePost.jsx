import React, { Profiler, useEffect, useMemo, useState } from "react";
import { Button } from "../index";
import { useForm } from "react-hook-form";
import { Image, Rolling, admin } from "../Icones";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import database from "../../appwrite/storage";
import { Loader, IoClose } from "../Icones/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function CreatePost() {
  const [textareaHeight, setTextareaHeight] = useState("5vh");
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  let [src, setSrc] = useState([]);
  const { register, handleSubmit, setValue, getValues } = useForm();
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
        return index != e.target.closest("div").id;
      })
    );
  };

  const client = useQueryClient();

  const createPost = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data) => {
      return await database.createPost(data);
    },
    onSuccess: () => {
      setPosting(false);
      setValue("post", "");
      setSrc([]);
      setLoading(false);
      client.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => {
      setPosting(false);
      setLoading(false);
      throw new Error(error.message);
    },
  });

  const { data: profileImg } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const currentUser = await database.gettingUsers(user?.user.$id);
      console.log(currentUser);
      if (currentUser) {
        return currentUser?.profileImg
          ? (await database.getProfileUrl(currentUser?.profileImg))?.href
          : null;
      }
    },
  });

  const postSubmit = async (data) => {
    if (!posting) {
      setPosting(true);
      setLoading(true);
      if (!user.status) {
        navigate("/login-form");
      } else {
        let url = [];

        if (src.length > 0) {
          for (let i = 0; i < src.length; i++) {
            let file = await database.createFile(src[i]);
            if (file) {
              const imgUrl = database.getFilesPreview(file?.$id);
              imgUrl && url.push({ img_url: imgUrl?.href, id: file?.$id });
            }
          }
        }

        data.postimage = JSON.stringify(url);
        data.userId = user.user.$id;
        data.userName = "";
        data.like = 0;
        data.name = user.user.name;
        data.comment = [];
        data.posttime = Date.now();
        createPost.mutate(data);
      }
    }
  };
  return (
    <div className="w-full flex px-4 pt-5 border-b">
      <div className="ProfilePic">
        <div className="h-[52px] w-[52px] bg-gray-300 rounded-full overflow-hidden">
          <img
            src={profileImg || admin}
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
          <div className="w-full  overflow-y-hidden overflow-x-hidden select-none rounded-xl mt-4 flex flex-wrap gap-y-4 justify-center">
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
                accept="image/png, image/jpeg,image/jpg,image/gif"
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
              {!loading ? (
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
