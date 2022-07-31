import React, { useEffect, useRef, useState } from "react";
import { useTopLoader } from "../contexts/LoadingContext";
import TopLoader from "react-top-loading-bar";
import Head from "next/head";
import { Banner, Header, Sidebar } from "../components";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toploadingRef = useRef();
  const { topLoading, complete } = useTopLoader;

  useEffect(() => {
    if (topLoading === true) {
      toploadingRef.current.continuousStart();
      console.log("complete:", complete);
    } else {
      !complete
        ? toploadingRef.current.complete()
        : toploadingRef.current.continuousStart();
    }
  }, [topLoading]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen overflow-hidden">
        <TopLoader color="#9c2cf2" height={3} ref={toploadingRef} />

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 moverflow-y-auto overflow-x-">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {children}
            </div>
          </main>

          <Banner message={"Welcome, Daniel"} emoji={"👋"} />
        </div>
      </div>
    </>
  );
}
