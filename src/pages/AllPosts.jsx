import React, { useEffect, useState } from "react";
import { Post } from "../component";
import { database, AuthService } from "../appwrite/index";

function AllPosts({ data }) {
  return (
    <div>
      {data.length > 0 ? (
        data.map((data, index) => {
          return (
            <div key={data.$id}>
              <Post data={data} />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center">
          <p className="text-3xl font-medium pt-7">No Post Found</p>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
