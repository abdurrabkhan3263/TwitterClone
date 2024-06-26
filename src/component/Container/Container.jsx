import React from "react";

function Container({ className, children }) {
  return (
    <div
      className={`${className} min-h-screen ml-[17%] lg:ml-[18%] text-black`}
    >
      {children}
    </div>
  );
}

export default Container;
