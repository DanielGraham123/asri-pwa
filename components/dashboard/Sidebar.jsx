import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import SidebarLinkGroup from "./SidebarLinkGroup";
import DashLink from "./DashLink";
import Image from "next/image";

import logo from "@/icon-192x192.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const hasWindow = typeof window !== "undefined";

  const [storedSidebarExpanded, setStoredSidbar] = useState(
    hasWindow && JSON.parse(localStorage.getItem("sidebar-expanded"))
  );

  const [sidebarExpanded, setSidebarExpanded] = useState(null);

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const router = useRouter();
  const { pathname } = router;

  console.log("pathname", router.pathname);

  useEffect(() => {
    let sd = JSON.parse(localStorage.getItem("sidebar-expanded"));
    console.log("sidebar-expanded: ", sd);

    if (hasWindow) {
      setSidebarExpanded(sd);

      setStoredSidbar(sd);
    }
  }, []);

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else if (sidebarExpanded === null) {
      setSidebarExpanded(storedSidebarExpanded);
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      // setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      // setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div suppressHydrationWarning={true}>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-indigo-800 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-900 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <DashLink href="/dashboard">
            <a className="flex items-center gap-3">
              <Image src={logo} width="50" height="50" className="" />
              {sidebarExpanded && (
                <span className="text-3xl font-medium text-gray-300 -mb-2">
                  A.S.R.I.
                </span>
              )}
            </a>
          </DashLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/dashboard" && "bg-gray-700 bg-opacity-40"
                }`}
              >
                <DashLink href="/dashboard">
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname === "/dashboard" && "hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname === "/dashboard" && "!text-indigo-500"
                          }`}
                          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                        />
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname === "/dashboard" && "!text-indigo-600"
                          }`}
                          d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname === "/dashboard" && "!text-indigo-200"
                          }`}
                          d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-80 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  </a>
                </DashLink>
              </li>

              {/* Appointments */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("appointments") &&
                  "bg-gray-700 bg-opacity-40"
                }`}
              >
                <DashLink href="/appointments">
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes("appointments") &&
                      "hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            pathname.includes("appointments")
                              ? "text-indigo-500"
                              : "text-slate-600"
                          }`}
                          d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                        />
                        <path
                          className={`fill-current  ${
                            pathname.includes("appointments")
                              ? "text-indigo-500"
                              : "text-slate-400"
                          }`}
                          d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-80 2xl:opacity-100 duration-200">
                        Appointments
                      </span>
                    </div>
                  </a>
                </DashLink>
              </li>

              {/* Patients */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("patients") && "bg-gray-700 bg-opacity-40"
                }`}
              >
                <DashLink href="/patients">
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes("patients") && "hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname.includes("patients") && "!text-indigo-500"
                          }`}
                          d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname.includes("patients") && "!text-indigo-500"
                          }`}
                          d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-80 2xl:opacity-100 duration-200">
                        Patients
                      </span>
                    </div>
                  </a>
                </DashLink>
              </li>

              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <DashLink href="">
                        <a
                          className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                            pathname.includes("settings") &&
                            "hover:text-slate-200"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current text-slate-600 ${
                                    pathname.includes("settings") &&
                                    "!text-indigo-500"
                                  }`}
                                  d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                                />
                                <path
                                  className={`fill-current text-slate-400 ${
                                    pathname.includes("settings") &&
                                    "!text-indigo-500"
                                  }`}
                                  d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                                />
                                <path
                                  className={`fill-current text-slate-600 ${
                                    pathname.includes("settings") &&
                                    "!text-indigo-500"
                                  }`}
                                  d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                                />
                                <path
                                  className={`fill-current text-slate-400 ${
                                    pathname.includes("settings") &&
                                    "!text-indigo-500"
                                  }`}
                                  d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-80 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                  open && "transform rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                      </DashLink>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <DashLink href="/settings/account">
                              <a
                                className={`block text-slate-400 hover:text-slate-200 transition duration-150 truncate`}
                              >
                                <span
                                  className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes("account") &&
                                    "!text-indigo-500"
                                  }`}
                                >
                                  My Account
                                </span>
                              </a>
                            </DashLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <DashLink href="/settings/notifications">
                              <a
                                className={`block text-slate-400 hover:text-slate-200 transition duration-150 truncate ${
                                  pathname.includes("notifications") &&
                                  "!text-indigo-500"
                                }`}
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  My Notifications
                                </span>
                              </a>
                            </DashLink>
                          </li>

                          <li className="mb-1 last:mb-0">
                            <DashLink href="/settings/feedback">
                              <a
                                className={`block text-slate-400 hover:text-slate-200 transition duration-150 truncate ${
                                  pathname.includes("feedback") &&
                                  "!text-indigo-500"
                                }`}
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Give Feedback
                                </span>
                              </a>
                            </DashLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
