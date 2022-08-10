import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import { SignIn } from "@/components/index";
import { TopLoadingProvider, useTopLoader } from "@/contexts/LoadingContext";

export default function Home() {
  return (
    <div>
      <Head>
        <title>A.S.R.I.</title>
        <meta name="description" content="A.S.R.I. Login Page" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignIn />
      </main>
    </div>
  );
}
