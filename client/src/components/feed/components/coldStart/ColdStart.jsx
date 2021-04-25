import React from "react";
import ColdStartStepper from "./components/ColdStartStepper";

const ColdStart = ({ coldStartData }) => {
  return (
    <>
      <ColdStartStepper {...coldStartData} />
    </>
  );
};

export default ColdStart;
