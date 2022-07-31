import React, { useEffect, useRef, useState } from "react";
import { useTopLoader } from "../contexts/LoadingContext";
import Head from "next/head";
import TopLoader from "react-top-loading-bar";
import { Banner, Header, Sidebar } from "../components";

function DashboardLayout({ children }) {
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
        <title>Title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen overflow-hidden">
        <TopLoader color="#9c2cf2" height={3} ref={toploadingRef} />

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y- overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="">{children}</main>

          <Banner message={"Welcome, Daniel"} emoji={"👋"} />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
