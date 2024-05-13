import React, { forwardRef, useEffect } from "react";

function Input({ className, type, ...props }, ref) {
  return (
    <div>
      <input
        type={type}
        {...props}
        ref={ref}
        className={`outline-none border focus:border-blue-500 w-full  ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
