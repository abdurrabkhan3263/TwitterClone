import React, { useState, useEffect } from "react";
import { database } from "../appwrite";

function useFindingImg(id) {
  let keys = ["profileImg", "headerImg"];
  const [profileUrl, setProfileUrl] = useState({});
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    database.gettingUsers(id).then((userData) => {
      setUserData(userData);
      keys.forEach((keys) => {
        if (userData[keys]) {
          database
            .getProfileUrl(userData[keys])
            .then((result) =>
              setProfileUrl((prev) => ({ ...prev, [keys]: result.href }))
            );
        }
      });
    });
  }, []);
  return [profileUrl, userData];
}

export default useFindingImg;
