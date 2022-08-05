import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import patients from "@/patientlist";

export default function PatientID() {
  const { title, setTitle } = useHeaderContext();
  const [data, setData] = useState();

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    setTitle("Patient Name");
    console.log("title: ", title);
    console.log("records: ", patients);

    setData(patients.filter((item) => item.id === parseInt(id))[0]);
  }, [id]);

  console.log("record: ", data);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>Patient: {id}</div>
      <button
        className="bg-blue-600 text-white shadow-lg px-3 py-2 animate-pulse rounded-lg mt-8"
        onClick={() =>
          router.push({ pathname: `/patients/${id}/booklet`, query: data })
        }
      >
        View Booklet
      </button>
    </>
  );
}

PatientID.Layout = DashboardLayout;
