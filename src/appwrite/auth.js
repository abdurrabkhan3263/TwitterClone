import { Client, Account, ID } from "appwrite";
import conf from "../conf_Variable/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ name, email, password }) {
    // if (!name || !email || !password) {
    //   console.log("not there");
    //   return;
    // }
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        return await this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw ("AppWrite Error :: CreateAccount :: ", error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw ("AppWrite Error :: Login Account :: ", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw ("AppWrite Error :: getCurrentUser :: ", error);
    }
  }
  async logoutAccount() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw ("AppWrite Error :: LogOutAccount :: ", error);
    }
  }
  // gettingAllUser() {
  //   fetch(`${conf.appWriteUrl}/account/sessions/create`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: "your-email@example.com",
  //       password: "your-password",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const { sessionId } = data;

  //       // Retrieve list of users
  //       fetch(`${conf.appWriteUrl}/users`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Appwrite-Project": projectId,
  //           "X-Appwrite-Key": apiKey,
  //           "X-Appwrite-Session": sessionId,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((users) => {
  //           console.log(users); // Array of users
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching users:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error authenticating with Appwrite:", error);
  //     });
  // }
}

let service = new AuthService();
export default service;
