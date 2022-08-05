import React, { useEffect } from "react";
import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";

export default function Feedback() {
  const { title, setTitle } = useHeaderContext();

  useEffect(() => {
    setTitle("Feedback");
    console.log("title: ", title);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Feedback</div>
    </>
  );
}

Feedback.Layout = DashboardLayout;
