import React, { useState, useEffect } from "react";
import { database } from "../appwrite";

function useFindingImg(id, status) {
  let keys = ["profileImg", "headerImg"];
  const [profileUrl, setProfileUrl] = useState({});
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(false);
    setProfileUrl({});
    setUserData([]);
    database
      .gettingUsers(id)
      .then((userData) => {
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
      })
      .finally(() => setLoading(true));
  }, [id, status]);
  return [profileUrl, userData, loading];
}

export default useFindingImg;
