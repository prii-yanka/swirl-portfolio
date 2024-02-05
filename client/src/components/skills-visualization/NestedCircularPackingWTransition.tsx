import * as d3 from "d3";
import { Tree } from "./skillsData";
import React from "react";
import { animated, useSpring } from "react-spring";
import { motion } from "framer-motion";

type CircularPackingProps = {
  width: number;
  height: number;
  data: Tree;
};

const MARGIN = 3;

const colors = ["#EF8181", "#8FE1F3", "#fed46e"];

export const NestedCircularPackingWTransition = ({
  width,
  height,
  data,
}: CircularPackingProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value)
    // .sort((a, b) => b.value! - a.value!);

  const packGenerator = d3.pack<Tree>().size([width, height]).padding(4);
  const root = packGenerator(hierarchy);

  // List of item of level 1 (just under root) & related color scale
  const firstLevelGroups = hierarchy?.children?.map((child) => child.data.name);
  var colorScaleParent = d3
    .scaleOrdinal<string>()
    .domain(firstLevelGroups || [])
    .range(colors);

  // Circles for level 1 of the hierarchy
  const allLevel1Circles = root
    .descendants()
    .filter((node) => node.depth === 1)
    .map((node) => {
      const parentName = node.data.name;

      return (
        <g key={node.data.name}>
          <motion.circle
            variants={container}
            initial="hidden"
            animate="show"
            cx={node.x}
            cy={node.y}
            r={node.r}
            stroke={colorScaleParent(parentName)}
            strokeWidth={1}
            strokeOpacity={0.3}
            fill={colorScaleParent(parentName)}
            fillOpacity={1}
            transition={{ ease: "easeOut", duration: 2 }}
          />
        </g>
      );
    });

  // Circles for level 2 = leaves
  const allLeafCircles = root.leaves().map((leaf) => {
    const parentName = leaf.parent?.data.name;

    if (!parentName) {
      return null;
    }

    return (
      <g key={leaf.data.name}>
        {/* <AnimatedCircle
          cx={leaf.x}
          cy={leaf.y}
          r={leaf.r}
          stroke="#553C9A"
          strokeWidth={2}
          fill="#B794F4"
          fillOpacity={0.2}
        /> */}
        <motion.circle
          cx={leaf.x}
          cy={leaf.y}
          variants={item}
          fill='white'
          fillOpacity={0.5}
          transition={{ ease: "easeOut", duration: 2 }}
          animate={{ cx: leaf.x, cy: leaf.y }}
          r={leaf.r}
        />

        <AnimatedText
          x={leaf.x}
          y={leaf.y}
          fontSize={13}
          fontWeight={0.4}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {leaf.data.name}
        </AnimatedText>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      {allLevel1Circles}
      {allLeafCircles}
    </svg>
  );
};

// const AnimatedCircle = ({
//   cx,
//   cy,
//   r,
//   ...props
// }: React.SVGAttributes<SVGCircleElement>) => {
//   const animatedProps = useSpring({
//     cx,
//     cy,
//     r,
//   });
//   return (
//     <animated.circle
//       {...props}
//       r={animatedProps.r as any}
//       cx={animatedProps.cx as any}
//       cy={animatedProps.cy as any}
//     />
//   );
// };

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
      x={animatedProps.x as any}
      y={animatedProps.y as any}
    />
  );
};
