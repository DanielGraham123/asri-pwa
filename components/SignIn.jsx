import React, { useState } from "react";
import Image from "next/image";

import authDecor from "../assets/auth-decoration.png";

import logo from "../public/icon-192x192.png";

import { useRouter } from "next/router";
import Link from "next/link";

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
    <div className="bg-bgIndex bg-cover bg-center bg-no-repeat w-full">
      <div className="w-full ">
        <div className="min-h-screen h-full flex flex-col after:flex-1">
          <div className="flex-1">
            <div className="flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8">
              <Link href="/">
                <a className="text-gray-300 underline pt-36 text-sm">
                  Automatic System For Recognition and Identification
                </a>
              </Link>
            </div>
          </div>
          <div className="shadow-2xl max-w-sm w-3/4 mx-auto px-6 py-8 mt-5">
            <h1 className="text-3xl text-gray-300 font-bold mb-6 flex items-center justify-between">
              <span>Welcome back!</span>
              <Image
                className="transform rotate-90 top-6"
                src={authDecor}
                width="50"
                height="50"
                alt="Authentication decoration"
              />
            </h1>

            <form className="text-gray-300" onSubmit={(e) => submitForm(e)}>
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
                    className="form-input w-full text-gray-300 bg-transparent"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
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
                    className="form-input text-gray-300 w-full bg-transparent"
                    type="password"
                    autoComplete="new-password"
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
                  className="btn bg-transparent border border-gray-600 hover:bg-indigo-800 hover:border-none duration-300 hover:scale-110 text-gray-300 ml-3"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="pt-5 mt-6 border-t text-white border-gray-200">
              <div className="text-sm flex justify-between">
                <span> Don’t you have an account?</span>
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
