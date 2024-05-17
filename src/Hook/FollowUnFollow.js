import React, { useState } from "react";
import { database } from "../appwrite";

async function FollowUnFollow(currentUserId, profileUserId) {
  let activeUser = [];
  let profileUser = [];
  let promise = [];
  promise.push(
    database.gettingUsers(currentUserId).then((result) => (activeUser = result))
  );
  promise.push(
    database
      .gettingUsers(profileUserId)
      .then((result) => (profileUser = result))
  );
  Promise.all(promise).then(() => {
    if (profileUser["followerUser"].includes(activeUser["$id"])) {
      let followerUser = profileUser["followerUser"].filter(
        (ids) => ids != activeUser["$id"]
      );
      let followUsers = activeUser["followUsers"].filter(
        (ids) => ids != profileUser["$id"]
      );
      database.updateUsers(profileUser["$id"], { followerUser }).then((res) => {
        if (res) {
          database.updateUsers(activeUser["$id"], { followUsers });
        }
      });
    } else if (!profileUser["followerUser"].includes(activeUser["$id"])) {
      let followerUser = [...profileUser["followerUser"], activeUser["$id"]];
      let followUsers = [...activeUser["followUsers"], profileUser["$id"]];
      database.updateUsers(profileUser["$id"], { followerUser }).then((res) => {
        if (res) {
          database.updateUsers(activeUser["$id"], { followUsers });
        }
      });
    }
  });
}

export default FollowUnFollow;
