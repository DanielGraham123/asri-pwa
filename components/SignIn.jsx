import React, { useState } from "react";
import Image from "next/image";

import authDecor from "../assets/auth-decoration.png";

import { useRouter } from "next/router";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault();

    if (username && password) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative flex bgImage">
      <div className="w-full ">
        <div className="min-h-screen h-full flex flex-col after:flex-1">
          <div className="flex-1">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <a className="block" href="index.html">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                      id="logo-a"
                    >
                      <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                      <stop stopColor="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                      id="logo-b"
                    >
                      <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                      <stop stopColor="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="max-w-md mx-auto px-4 py-8">
            <h1 className="text-3xl text-gray-800 font-bold mb-6 flex items-center">
              <span>Welcome back!</span>
              <Image
                className="transform rotate-90 absolute top-6"
                src={authDecor}
                width="50"
                height="50"
                alt="Authentication decoration"
              />
            </h1>

            <form onSubmit={(e) => submitForm(e)}>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="code"
                  >
                    User Code
                  </label>
                  <input
                    id="code"
                    className="form-input w-full"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="form-input w-full"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="mr-1">
                  <a
                    className="text-sm underline hover:no-underline"
                    href="reset-password.html"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="pt-5 mt-6 border-t border-gray-200">
              <div className="text-sm">
                Don’t you have an account?
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="signup.html"
                >
                  Sign Up
                </a>
              </div>
              <div className="mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
