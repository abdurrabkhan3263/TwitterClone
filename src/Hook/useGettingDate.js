import React, { useEffect, useState } from "react";

function useGettingDate(date) {
  const newDate = new Date(date);
  const month = newDate.toLocaleString("default", { month: "long" });
  const getFullYear = newDate.getFullYear();
  return [month, getFullYear];
}

export default useGettingDate;
