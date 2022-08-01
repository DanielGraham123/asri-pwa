import Image from "next/image";
import React from "react";

const WelcomeBanner = () => {
  const date = new Date();

  const hour = date.getHours();

  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
        <div className="relative flex gap-2">
          <div className="absolute top-[70px] right-20 w-32 h-28">
            <Image src="/bannericons/22.png" width="150px" height="100px" />
          </div>
          <div className="absolute top-12 -right-24 w-32 h-28">
            <Image src="/bannericons/33.png" width={50} height={50} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
          {hour >= 12
            ? hour >= 17
              ? "Good Evening"
              : "Good Afternoon"
            : "Good Morning"}
          , Doctor.
        </h1>
        <p>Here is what’s has been happening in your dasbhoard.</p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
