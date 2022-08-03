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
    setTitle("Id");
    console.log("title: ", title);
    console.log("records: ", patients);

    setData(patients.filter((item) => item.id === parseInt(id))[0]);
  }, [id]);

  console.log("record: ", data);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>Patient: {id}</div>
      <button
        onClick={() =>
          router.push({ pathname: `/patients/${id}/booklet`, query: data })
        }
      >
        Booklet
      </button>
    </>
  );
}

PatientID.Layout = DashboardLayout;
