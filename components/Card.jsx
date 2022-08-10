import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({ children, classes }) {
  return <div className={classNames(classes, "card-elem")}>{children}</div>;
}
