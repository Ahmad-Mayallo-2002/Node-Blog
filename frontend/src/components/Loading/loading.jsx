import React from "react";

export default function Loading({
  width = "150px",
  height = "150px",
  borderWidth = "10px",
}) {
  return (
    <div
      className={`loading border-[#6366f1] animate-spin rounded-full`}
      style={{
        width: width,
        height: height,
        borderWidth: borderWidth,
      }}
    ></div>
  );
}
