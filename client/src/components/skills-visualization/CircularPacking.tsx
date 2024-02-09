import React, { useState } from "react";
import { NestedCircularPackingWTransition } from "./NestedCircularPackingWTransition";
import { Tree, data } from "./skillsData";
import { NestedCircularPackingWForce } from "./NestedCircularPackingWForce";

export const CircularPacking = () => {
  // const [dataset, setDataset] = useState<Tree>(data);

  return (
    <>
      {/* <NestedCircularPackingWTransition
      width={100}
      height={100}
      // data={dataset}
      data={data}
    /> */}

      <p>Force: </p>
      <NestedCircularPackingWForce
      width={100}
      height={100}
      data={data}
    />
      {/* <NestedCircularPacking width={100} height={100} data={data} /> */}
    </>
  );
};
