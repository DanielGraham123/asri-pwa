import React from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { MdClose } from "react-icons/md";
import signature from "@/assets/signature.png";
import Image from "next/image";

function MobileWarning() {
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <div className="pb-5 relative text-center">
        <MdPhoneAndroid size={100} className=" text-blue-400"></MdPhoneAndroid>

        <div className="absolute -top-2 -left-2">
          <MdClose className=" text-red-500 " size={120} />
        </div>
      </div>
      <div className=" text-center">
        <p className="mb-3 text-sm text-indigo-500">
          Sorry this site is optimized for desktop view.
        </p>
        <p className="text-xl">
          Please do well to open it on a{" "}
          <span className="font-semibold underline text-indigo-600">
            desktop/laptop
          </span>
        </p>
      </div>

      <div className="text-center pt-5">
        <Image src={signature} className="" width={120} height={70} />
      </div>
    </div>
  );
}

export default MobileWarning;
