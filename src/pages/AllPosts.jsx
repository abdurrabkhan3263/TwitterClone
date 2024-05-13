import React, { useEffect, useState } from "react";
import { Post } from "../component";
import { database, AuthService } from "../appwrite/index";

function AllPosts({ data }) {
  let [newPost, setNewPost] = useState([]);

  useEffect(() => {
    data &&
      data.forEach((post) => {
        let id = [];
        post.postimage.forEach((imgId) => {
          const imgUrl = database.getFilesPreview(imgId);
          if (imgUrl) {
            id.push(imgUrl.href);
          }
        });
        post.allImages = [...id];
      });
    setNewPost(data);
  }, [data]);

  return (
    <div>
      {newPost &&
        newPost.map((data, index) => {
          return (
            <div key={data.$id}>
              <Post data={newPost[newPost.length - 1 - index]} />
            </div>
          );
        })}
    </div>
  );
}

export default AllPosts;
