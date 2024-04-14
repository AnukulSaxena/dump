import React from "react";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className=" shadow-lg w-full text-center">
        10% off for the next purchase
      </div>
      {children}
    </div>
  );
}
