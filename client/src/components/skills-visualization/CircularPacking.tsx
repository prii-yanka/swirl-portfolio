import React, { useState } from "react";
import { NestedCircularPackingWTransition } from "./NestedCircularPackingWTransition";
import { Tree, data } from "./skillsData";
import CirclePackingZoom from "./CirclePackingZoom";
import LeafImage from "./LeafImage";

const BUTTONS_HEIGHT = 50;

const buttonStyle = {
  border: "1px solid #9a6fb0",
  borderRadius: "3px",
  padding: "4px 8px",
  margin: "10px 2px",
  fontSize: 14,
  color: "#9a6fb0",
  opacity: 0.7,
};

export const CircularPacking = () => {
  
  // const [dataset, setDataset] = useState<Tree>(data);

  return (
  <>
    {/* <div style={{ height: BUTTONS_HEIGHT }}>
      <button style={buttonStyle} onClick={() => setDataset(data)}>
        Data 1
      </button>
      <button style={buttonStyle} onClick={() => setDataset(data2)}>
        Data 2
      </button>
    </div> */}
    <NestedCircularPackingWTransition
      width={100}
      height={100}
      // data={dataset}
      data={data}
    />
    {/* <CirclePackingZoom data={dataset} width={700} height={700} padding={100}/> */}
  </>);
};
