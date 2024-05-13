import React from "react";

function Loader({ loaderSrc, className, classParent }) {
  return (
    <div className={`flex justify-center ${classParent}`}>
      <img src={loaderSrc} alt="loader" className={className} />
    </div>
  );
}

export default Loader;
