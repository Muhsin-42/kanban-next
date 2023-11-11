import React, { useEffect, useState } from "react";

type Direction = "horizontal" | "vertical";

const useResize = () => {
  const [orientation, setOrientation] = useState<Direction>("horizontal");

  function handleResize() {
    const _orientation = window.innerWidth < 1024 ? "vertical" : "horizontal";
    setOrientation(_orientation);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { orientation, setOrientation };
};

export default useResize;
