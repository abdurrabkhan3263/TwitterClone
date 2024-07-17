import React, { useEffect, useState } from "react";
import { database } from "../../appwrite";
import { useSelector } from "react-redux";
import useFindingImg from "../../Hook/useFindingImg";

import {
  Comment,
  Repost,
  Unlike,
  Like,
  IoBookmarkOutline,
  PiBookmarkSimpleFill,
  admin,
} from "../Icones/index";
import { Link, useNavigate } from "react-router-dom";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Post({ data }) {
  const [deleteSlider, setDeleteSlider] = useState(false);
  let {
    $id,
    post,
    userId,
    like,
    comment,
    name,
    likeduser,
    posttime,
    postimage: images,
    BookMarks,
  } = data;

  let [likeNum, setLikeNum] = useState(like);
  let [initial, setInitial] = useState(false);
  let postimage = JSON.parse(images);
  const user = useSelector((state) => state.appReducer.user);
  const profileImg = useFindingImg(userId);
  let [isLike, setIsLike] = useState(likeduser.includes(user.user?.$id));
  const queryClient = useQueryClient();
  const [isBookMark, setIsBookMark] = useState(
    BookMarks.includes(user.user?.$id)
  );

  const [updatedValue, setUpdatedValue] = useState(data);
  const navigate = useNavigate();
  const handlePostImageLeft = () => {};

  const handlePostImageRight = () => {};

  const handleLikeBtn = async () => {
    setIsLike((prev) => !prev);
    setInitial(true);
  };

  const deletePost = useMutation({
    mutationKey: ["delete"],
    mutationFn: async () => {
      if (postimage.length > 0) {
        for (let i = 0; i < postimage.length; i++) {
          await database.deleteFile(postimage[i].id);
        }
      }
      let file = await database.deletePost($id);
      return file;
    },
    onSuccess: () => {
      setDeleteSlider(false);
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => {
      setDeleteSlider(false);
      throw new Error(error.message);
    },
  });

  const handlePostDelete = async () => deletePost.mutate();

  useEffect(() => {
    if (initial) {
      const likeCount = isLike ? likeNum + 1 : likeNum - 1;
      setLikeNum(likeCount);
      const likedUsers = likeduser.includes(user.user?.$id)
        ? likeduser.filter((value) => value !== user.user?.$id)
        : [user.user?.$id, ...likeduser];
      database
        .updatePost($id, {
          like: likeCount,
          likeduser: likedUsers,
        })
        .then((updatedValue) => {
          setUpdatedValue(updatedValue);
        });
    }
  }, [isLike, user.user?.$id]);

  useEffect(() => {
    if (likeduser.includes(user.user?.$id)) {
      setIsLike(true);
    }
  }, [likeduser]);

  useEffect(() => {
    if (BookMarks.includes(user.user?.$id)) {
      setIsBookMark(true);
    }
  }, []);

  document.addEventListener("click", (e) => {
    const classes = Array.from(e.target.classList);

    if (!classes.includes("deletePost")) {
      setDeleteSlider(false);
    }
  });

  const AddBookMark = async () => {
    let bool = !isBookMark;
    setIsBookMark(bool);
    bool
      ? (updatedValue.BookMarks = [user.user?.$id, ...updatedValue.BookMarks])
      : (updatedValue.BookMarks = updatedValue.BookMarks.filter(
          (value) => value !== user.user?.$id
        ));
    database.updatePost(updatedValue.$id, { ...updatedValue });
  };

  return (
    <div className="hover:bg-slate-100 transition-all px-4 py-5 flex cursor-pointer relative">
      <div
        className={`w-1/2 h-fit absolute z-50 right-[60px] rounded-lg py-3 origin-top flex justify-end ${
          deleteSlider ? "scale-y-100" : "scale-y-0"
        } transition-all`}
      >
        <button
          className={`deletePost bg-white text-start py-1.5 px-2.5 text-base font-medium rounded-md transition-all hover:bg-slate-200 shadow-md`}
          onClick={handlePostDelete}
        >
          {deletePost.isPending ? "Deleting..." : "Delete Post"}
        </button>
      </div>
      <div className="PROFILE PIC h-full pr-1">
        <div className="w-[46px] h-[46px] rounded-full overflow-hidden">
          <Link to="">
            <img
              src={(profileImg[0] && profileImg[0]["profileImg"]) || admin}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-start relative">
          <div className="flex gap-3 ml-3 h-fit items-center">
            <p
              className="text-lg font-semibold cursor-pointer hover:underline"
              onClick={() => navigate(`/home/profile/${userId}`)}
            >
              {profileImg[1] && profileImg[1]["name"]}
            </p>
            <p className="text-base cursor-pointer text-gray-600">
              @{name && name.toLowerCase()}
            </p>
            <p className="text-base cursor-pointer text-gray-600"> ∙ 2h</p>
          </div>
          {user.user?.$id === userId ? (
            <div
              onClick={() => setDeleteSlider(!deleteSlider)}
              className="deletePost flex flex-col items-center"
            >
              <p className="deletePost select-none">∘ ∘ ∘</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="POST text-xl">{post && post}</div>
        {postimage.length > 0 ? (
          <div className="POST IMAGE w-full overflow-hidden   mt-4 rounded-xl relative select-none border">
            <div
              className="absolute bottom-1/2 text-white translate-y-1/2 text-4xl"
              onClick={handlePostImageLeft}
            >
              <IoIosArrowDropleftCircle />
            </div>
            <div className={`flex overflow-x-scroll`}>
              {postimage && postimage.length > 0
                ? postimage.map((value) => (
                    <img
                      src={value.img_url}
                      alt="post"
                      className={`transition-all`}
                      key={value}
                    />
                  ))
                : ""}
            </div>
            <div
              className="absolute bottom-1/2 text-white translate-y-1/2 text-4xl right-0"
              onClick={handlePostImageRight}
            >
              <IoIosArrowDroprightCircle />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="LIKE_COMMENT_AND_SHARE flex justify-between text-xl mt-4">
          <div className="flex items-center gap-x-2 select-none">
            <Comment />
            <div className="text-base">{comment.length}</div>
          </div>
          <div className="flex items-center gap-x-2">
            <Repost />
            {/* <div className="text-base"></div> */}
          </div>
          <div className="flex items-center gap-x-2 select-none">
            <div onClick={handleLikeBtn}>{!isLike ? <Unlike /> : <Like />}</div>
            <div className="text-base">{likeNum}</div>
          </div>
          <div className="flex">
            <button onClick={AddBookMark}>
              {!isBookMark ? <IoBookmarkOutline /> : <PiBookmarkSimpleFill />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
