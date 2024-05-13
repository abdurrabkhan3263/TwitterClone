const conf = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWriteStorageId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appWriteUser: String(import.meta.env.VITE_APPWRITE_COLLEC_USERS),
};

export default conf;
