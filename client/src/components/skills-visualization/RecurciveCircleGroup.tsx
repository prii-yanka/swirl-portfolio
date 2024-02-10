import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { HierarchyCircularNode } from "./HierarchyCircularNode";
import { Tree } from "./skillsData";

interface NodeProps {
  node: HierarchyCircularNode<Tree>;
  colorScale: (depth: string) => any;
  handleClick: (node: HierarchyCircularNode<Tree>) => void;
  handleMouseEnter: (node: HierarchyCircularNode<Tree>) => void;
  handleMouseLeave: (node: HierarchyCircularNode<Tree>) => void;
  matches: boolean;
}

const colors = ["#EF8181", "#8FE1F3", "#fed46e"];

const RecursiveCircleGroup: React.FC<NodeProps> = ({
  node,
  colorScale,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  matches,
}) => {
  if (!node) return;
  const { x, y, r, data, children } = node;
  const { name } = data;

  // Define the transform property for the foreignObject and additional groups
  const transform = `translate(${x - r}px, ${y - r}px)`;

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
  useEffect(() => {
    console.log(`node.component: ${node.component}`);
  }, [node]);
  const { pathId, arcPath } = createTextArc(node, -3);

  return (
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
        onMouseEnter={() => handleMouseEnter(node)}
        onMouseLeave={() => handleMouseLeave(node)}
        fill={colorScale(String(node.depth % colors.length)) as string}
      />
      {/* Render the component if it exists */}
      <g>
        {node.component && (
          <foreignObject
            transform={`translate(${node.x - node.r}px, ${node.y - node.r}px)`} // Update the transform property
            x={node.x - node.r}
            y={node.y - node.r}
            width={node.r * 1.5}
            height={node.r * 1.5}
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
            node={child as HierarchyCircularNode<Tree>}
            colorScale={colorScale}
            handleClick={handleClick}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            matches={matches}
          />
        ))}
      {/* Assuming component rendering and text rendering goes here */}
      {/* Remember to apply the appropriate transformations and rendering logic */}
    </g>
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
