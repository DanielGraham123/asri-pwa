import Link from "next/link";

import React from "react";

const DashLink = ({ children, href }) => {
  return (
    <Link suppressHydrationWarning={true} href={href}>
      {children}
    </Link>
  );
};

export default DashLink;
