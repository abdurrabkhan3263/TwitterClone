import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./pages/Body.jsx";
import Login from "./component/LoginP.jsx";
import { SignUpForm, LoginForm } from "./component/form/index.js";
import { Like, Posts, BookMarks, SetUp } from "./pages/ProfilePage/index.js";
import {
  Home,
  Explore,
  Notification,
  Profile,
  BookMark,
} from "./pages/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Login />,
        children: [
          {
            path: "/login-form",
            element: <LoginForm />,
          },
          {
            path: "/sign-form",
            element: <SignUpForm />,
          },
        ],
      },
      {
        path: "/home",
        element: <Body />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/home/profile/:id",
            element: <Profile />,
            children: [
              {
                path: "/home/profile/:id",
                element: <Posts />,
              },
              {
                path: "likepost/:id",
                element: <Like />,
              },
              {
                path: "bookmarks/:id",
                element: <BookMarks />,
              },
              {
                path: "setup",
                element: <SetUp />,
              },
            ],
          },
          {
            path: "/home/message",
            element: <Notification />,
          },
          {
            path: "/home/notification",
            element: <Home />,
          },
          {
            path: "/home/search",
            element: <Explore />,
          },
          {
            path: "/home/bookmarks",
            element: <BookMark />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);
