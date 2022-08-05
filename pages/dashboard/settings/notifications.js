import React, { useEffect } from "react";
import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";

export default function Notifications() {
  const { title, setTitle } = useHeaderContext();

  useEffect(() => {
    setTitle("Notifications");
    console.log("title: ", title);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Notifications</div>
    </>
  );
}

Notifications.Layout = DashboardLayout;
