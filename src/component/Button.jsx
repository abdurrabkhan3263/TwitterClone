import React from "react";

function Button({ children, type, className, onClick, ...props }) {
  return (
    <div>
      <button
        type={type}
        className={`${className} border rounded-full font-medium text-lg  my-4  duration-500`}
        {...props}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
