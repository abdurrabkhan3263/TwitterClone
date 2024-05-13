import { database } from "../../appwrite";
const useData = async (value, useId, isQuery) => {
  const data = await database.getUserPost(value, useId, isQuery);
  return data.documents;
};

export default useData;
