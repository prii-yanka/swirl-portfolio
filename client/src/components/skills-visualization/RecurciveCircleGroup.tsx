import React, { useEffect, createContext, useContext, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { MyHierarchyCircularNode } from "./MyHierarchyCircularNode";
import { Tree } from "./skillsData";

interface NodeProps {
  node: MyHierarchyCircularNode<Tree>;
  colorScale: (depth: string) => any;
  handleClick: (node: MyHierarchyCircularNode<Tree>) => void;
  // handleMouseEnter: (node: HierarchyCircularNode<Tree>) => void;
  // setHoveredNode: (node: HierarchyCircularNode<Tree>) => void;
  setHoveredId: (id: string | null) => void;
  // handleMouseOut: (node: MyHierarchyCircularNode<Tree>) => void;
  matches: boolean;
  // setHoveredNode: React.Dispatch<React.SetStateAction<HierarchyCircularNode<Tree> | null>>;
}

const colors = ["#EF8181", "#8FE1F3", "#fed46e"];

// const HoveredNodeContext = createContext<HierarchyCircularNode<Tree> | null>(
//   null
// );

const RecursiveCircleGroup: React.FC<NodeProps> = ({
  node,
  colorScale,
  handleClick,
  // handleMouseEnter,
  // setHoveredNode,
  // handleMouseOut,
  matches,
  setHoveredId,
  // setHoveredNode,
}) => {
  if (!node) return;
  const { x, y, r, data, children } = node;
  const { name } = data;

  // Define the transform property for the foreignObject and additional groups
  const transform = `translate(${x - r}px, ${y - r}px)`;

  // useEffect(() => {
  //   hoveredNode && console.log(`hoveredNode.context: ${hoveredNode}`);
  // }, [hoveredNode]);

  // Create an arc for the text
  const createTextArc = (d: any, radiusOffset: any) => {
    const effectiveRadius = Math.max(d.r + radiusOffset, 1); // Ensure the effective radius doesn't go below 0
    const circumference = 2 * Math.PI * effectiveRadius;

    // Define the arc as an SVG path
    const arcPath = `
      M${d.x - effectiveRadius},${d.y}
      a${effectiveRadius},${effectiveRadius} 0 1,1 ${2 * effectiveRadius},0
      a${effectiveRadius},${effectiveRadius} 0 1,1 ${-2 * effectiveRadius},0
    `;

    // Define the id for the path (to link with textPath)
    const pathId = `arcPath-${d.data.name.replace(/\s+/g, "-")}-${d.depth}`;

    return { pathId, arcPath, circumference };
  };

  // useEffect(() => {
  //   if (!node) {
  //     console.error("Node is undefined");
  //     // return null; // Or handle appropriately
  //   }
  //   if (node) {
  //     console.log(`node.component: ${node.component}`);
  //     console.log(`node.name: ${node.name}`);
  //   }
  // }, [node]);

  const { pathId, arcPath } = createTextArc(node, -3);
  // const [hoveredNode, setHoveredNode] =
  // useState<HierarchyCircularNode<Tree> | null>(null);
  const handleMouseEnter = (id: string) => setHoveredId(id);
  // const handleMouseOut = () => setHoveredId(null);

  return (
    // <HoveredNodeContext.Provider value={hoveredNode}>
    <g
      key={name}
      className={`mygroup ${name}`}
      //   transform={`translate(${x},${y})`}
    >
      <circle
        className={`mycircle ${name}`}
        cx={x}
        cy={y}
        r={r}
        onClick={() => handleClick(node)}
        onMouseEnter={() => handleMouseEnter(node.name)} // Fix: Pass a function reference instead of invoking the function directly
        // onMouseOut={() => handleMouseOut(node)}
        fill={colorScale(String(node.depth % colors.length)) as string}
      />
      {/* Render the component if it exists */}
      <g
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
				// 	width: "100%",
				// 	height: "100%",
        // }}
      >
        {node.component && (
          <foreignObject
            transform={`translate(${node.x - node.r}px, ${node.y - node.r}px)`} // Update the transform property
            x={node.x - node.r}
            y={node.y - node.r}
            width={node.r * 2}
            height={node.r * 2}
            // You might need to adjust the style to center the content
            style={{
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {node.component}
          </foreignObject>
        )}
      </g>
      <g transform={`translate(${node.x - node.r}px, ${node.y - node.r}px)`}>
        {/* <g> */} {/* Update the transform property */}
        {/* Arc path for the text */}
        <path id={pathId} d={arcPath} fill="none" stroke="none" />
        {/* Text along the arc path */}
        <AnimatedText
          color="black"
          fontSize={matches ? 5 : 10}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          <textPath
            xlinkHref={`#${pathId}`}
            startOffset={matches ? "5%" : "10%"}
            style={{ textAnchor: "start" }}
          >
            {node.data.name}
          </textPath>
        </AnimatedText>
      </g>
      {children &&
        children.map((child) => (
          <RecursiveCircleGroup
            key={child.name}
            node={child as MyHierarchyCircularNode<Tree>}
            colorScale={colorScale}
            handleClick={handleClick}
            // handleMouseEnter={handleMouseEnter}
            // setHoveredNode={setHoveredNode}
            // handleMouseOut={handleMouseOut}
            matches={matches}
            setHoveredId={setHoveredId}
            // setHoveredNode={setHoveredNode}
          />
        ))}
      {/* Assuming component rendering and text rendering goes here */}
      {/* Remember to apply the appropriate transformations and rendering logic */}
    </g>
    // </HoveredNodeContext.Provider>
  );
};

const AnimatedText = ({
  x,
  y,
  ...props
}: React.SVGAttributes<SVGTextElement>) => {
  const animatedProps = useSpring({
    x,
    y,
  });
  return (
    <animated.text
      {...props}
      // dy='10'
      x={animatedProps.x as any}
      y={animatedProps.y as any}
      letterSpacing="0.25"
      style={{
        pointerEvents: "none",
        // transform: `translateY(-${20}%)`
      }}
    />
  );
};

export default RecursiveCircleGroup;
// HoveredNodeContext;
