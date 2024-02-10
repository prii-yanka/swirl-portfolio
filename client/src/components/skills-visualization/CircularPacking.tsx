import React, { useState } from "react";
import { Tree, data } from "./skillsData";
import { NestedCircularPackingWForce } from "./NestedCircularPackingWForce";

export const CircularPacking = () => {
  // const [dataset, setDataset] = useState<Tree>(data);

  return (
    <>
      <NestedCircularPackingWForce width={100} height={100} data={data} />
    </>
  );
};
