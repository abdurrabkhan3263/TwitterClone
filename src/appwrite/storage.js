import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf_Variable/conf";

class databases {
  client = new Client();
  database;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({
    post,
    postimage,
    userId,
    userName,
    like,
    comment,
    name,
    posttime,
  }) {
    try {
      return await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        ID.unique(),
        { post, postimage, userId, like, comment, userName, name, posttime }
      );
    } catch (error) {
      throw ("AppWrite Error :: CreatePost :: Error :: ", error);
    }
  }
  async deletePost(docId) {
    try {
      return await this.database.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        docId
      );
    } catch (error) {
      throw ("AppWrite Error :: deletePost :: Error :: ", error);
    }
  }
  async getPost(docId) {
    try {
      return await this.database.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        docId
      );
    } catch (error) {
      throw ("AppWrite Error :: GetPost :: Error :: ", error);
    }
  }
  async getAllPosts() {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId
      );
    } catch (error) {
      throw ("AppWrite :: getAllPosts :: Error :: ", error);
    }
  }
  async getUserPost(value, userName, query) {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        query && [Query.equal(value, userName)]
      );
    } catch (error) {
      throw ("AppWrite :: getUserPost :: Error :: ", error);
    }
  }
  async updatePost(docId, { post, like, comment, likeduser, BookMarks }) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        docId,
        { post, like, comment, likeduser, BookMarks }
      );
    } catch (error) {
      throw ("AppWrite :: getUpDatePost :: Error :: ", error);
    }
  }
  async createFile(doc) {
    try {
      return await this.storage.createFile(
        conf.appWriteStorageId,
        ID.unique(),
        doc
      );
    } catch (error) {
      throw ("AppWrite :: Createfile :: Error :: ", error);
    }
  }
  async deleteFile(fileID) {
    try {
      return await this.storage.deleteFile(conf.appWriteStorageId, fileID);
    } catch (error) {
      throw ("AppWrite :: deleteFile :: Error :: ", error);
    }
  }
  getFilesPreview(fileID) {
    try {
      return this.storage.getFilePreview(conf.appWriteStorageId, fileID);
    } catch (error) {
      throw ("AppWrite :: getFilePreview :: Error :: ", error);
    }
  }
  // ADDING PROFILE IMAGE
  async createUsers(
    userId,
    {
      bio,
      headerImg,
      profileImg,
      followUsers = [],
      followerUser = [],
      name,
      isEdited,
      joinDate,
    }
  ) {
    try {
      return await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteUser,
        userId,
        {
          profileImg,
          followUsers,
          followerUser,
          bio,
          headerImg,
          isEdited,
          name,
          joinDate,
          userId,
        }
      );
    } catch (error) {
      throw ("AppWrite :: Error :: CreateUsers :: Error :: ", error);
    }
  }
  async updateUsers(
    docId,
    {
      profileImg,
      followUsers = [],
      followerUser = [],
      bio,
      headerImg,
      isEdited,
      name,
    }
  ) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteUser,
        docId,
        {
          profileImg,
          followUsers,
          followerUser,
          bio,
          headerImg,
          isEdited,
          name,
        }
      );
    } catch (error) {
      throw ("AppWrite :: Error :: UpdateUsers :: Error :: ", error);
    }
  }
  async gettingUsers(userId) {
    try {
      return await this.database.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteUser,
        userId
      );
    } catch (error) {
      throw ("AppWrite :: Error :: GettingUsers :: Error ", error);
    }
  }
  async gettingAllUser(id) {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteUser,
        [Query.limit(2), Query.notEqual("userId", id)]
      );
    } catch (error) {
      throw ("Appwrite :: Error :: GettingAllUsers :: Error ", error);
    }
  }
  async getProfileUrl(fileId) {
    try {
      return this.storage.getFilePreview(conf.appWriteStorageId, fileId);
    } catch (error) {
      throw ("AppWrite :: Error :: getProfileUrl :: Error ", error);
    }
  }
}

const database = new databases();
export default database;
