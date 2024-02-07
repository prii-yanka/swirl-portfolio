import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { motion, useAnimation, useInView } from "framer-motion";
import { Tree, TreeLeaf, TreeNode } from "./skillsData";
import { useMediaQuery } from "@mui/material";

type CircularPackingProps = {
  width: number;
  height: number;
  data: Tree;
};

class HierarchyCircularNode<Tree extends TreeNode | TreeLeaf> {
  data: Tree;
  x: number;
  y: number;
  r: number; // Assuming you have a radius for circular packing
  component?: React.ReactNode; // Optional, since not all nodes will have a component

  constructor(node: d3.HierarchyCircularNode<Tree>) {
    this.data = node.data;
    this.x = node.x;
    this.y = node.y;
    this.r = node.r; // Radius for circular layout
    if ("component" in node.data) {
      this.component = node.data.component; // Only set if component exists in data
    }
  }
}

const MARGIN = 3;

const colors = ["#EF8181", "#8FE1F3", "#fed46e"];

export const NestedCircularPackingWTransition = ({
  width,
  height,
  data,
}: CircularPackingProps) => {
  const controls = useAnimation();
  const skillsPackContainerRef = useRef(null);

  const inView1 = useInView(skillsPackContainerRef);
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const matches = useMediaQuery("(max-aspect-ratio : 3/4)");
  const [containerHeight, setContainerHeight] = useState<any>(700);
  const [containerWidth, setContainerWidth] = useState<any>(500);

  const handleResize = () => {
    let highestSlide = 0;
    let widestSlide = 0;

    if (
      skillsPackContainerRef.current &&
      // @ts-ignore
      highestSlide < skillsPackContainerRef.current.offsetHeight
    ) {
      // @ts-ignore
      highestSlide = skillsPackContainerRef.current.offsetHeight;
    }

    if (
      skillsPackContainerRef.current &&
      // @ts-ignore
      widestSlide < skillsPackContainerRef.current.offsetWidth
    ) {
      // @ts-ignore
      widestSlide = skillsPackContainerRef.current.offsetWidth;
    }
    setContainerHeight(highestSlide);
    setContainerWidth(widestSlide);
  };

  useEffect(
    // @ts-ignore
    () => setContainerHeight(skillsPackContainerRef.current?.offsetHeight),
    []
  );

  useEffect(
    // @ts-ignore
    () => setContainerWidth(skillsPackContainerRef.current?.offsetWidth),
    []
  );

  // useEffect(() => {
  //   console.log(`Cheight: ${containerHeight}`)
  //   console.log(`Cwidth: ${containerWidth}`)
  // }, [containerHeight, containerWidth])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (inView1) {
      controls.start("visible");
    }
  }, [controls, inView1]);

  useEffect(() => {
      const addTouchClassName = () => {
        console.log("touchstart")
        const circles = document.querySelectorAll('circle')
        circles.forEach((item) => {
          console.log(`item.classList: ${item.classList}`)
          item.classList.add('touchstart')
        })
      }
      if(matches) {
        document.body.addEventListener('touchstart', addTouchClassName, false);
      }
  }, [])

  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value! - a.value!);

  const packGenerator = d3
    .pack<Tree>()
    .size([(containerWidth * width) / 100, (containerHeight * height) / 100])
    .padding(matches? 5 : 15);
  const root = packGenerator(hierarchy);

  const colorScale = d3
    .scaleOrdinal()
    .domain(d3.range(0, colors.length).map(String)) // Convert numbers to strings
    .range(colors);

  const svgRef = useRef(null);

  const handleClick = (d: any) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg
      .transition()
      .duration(1000)
      .attr(
        "viewBox",
        [
          d.x - d.r - MARGIN * 2,
          d.y - d.r - MARGIN * 6,
          d.r * 2 + MARGIN * 6,
          d.r * 2 + MARGIN * 6,
        ].join(" ")
      );
  };

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

  const allCircles = root.descendants().map((d, i) => {
    // Create an instance of HierarchyCircularNode
    const node = new HierarchyCircularNode(d);
    // console.log(`node.r, d.data.name: ${node.r}, ${node.data.name}`);
    // Create an arc for the text
    // createtextarc number can be adjusted based on how far from the circle you want the text
    const { pathId, arcPath, circumference } = createTextArc(d, -2);
    return (
      <motion.g
        key={d.data.name}
        animate={controls}
        variants={container}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <motion.circle
          animate={controls}
          variants={item}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={colorScale(String(d.depth % colors.length)) as string}
          onClick={() => handleClick(node)}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ease: "easeOut", duration: 1 }}
        />
        {/* Render the component if it exists */}
        {node.component && (
          <foreignObject
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
        <g>
          {/* Arc path for the text */}
          <path id={pathId} d={arcPath} fill="none" stroke="none" />

          {/* Text along the arc path */}
          <AnimatedText
            color="black"
            fontSize={matches ? 5 : 12}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            <textPath
              xlinkHref={`#${pathId}`}
              startOffset={matches ? "5%" : "10%"}
              style={{ textAnchor: "start" }}
            >
              {d.data.name}
            </textPath>
          </AnimatedText>
        </g>
      </motion.g>
    );
  });

  return (
    <div ref={skillsPackContainerRef} style={{ width: "100%", height: "100%" }}>
      <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        ref={svgRef}
        width={`${width}%`}
        height={`${height}%`}
        className="skillsSvg"
        // viewBox is not managed by React state anymore
      >
        {allCircles}
      </svg>
    </div>
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
      letterSpacing="0.5"
      style={{
        pointerEvents: "none",
        // transform: `translateY(-${20}%)`
      }}
    />
  );
};

// const svgRef = React.createRef<SVGSVGElement>();

{
  /* {d.depth == 1 &&
          // Add text only for first level
            <AnimatedText
            x={d.x}
            y={d.y}
            fontSize={2}
            fontWeight={0.4}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {d.data.name}
          </AnimatedText>
        } */
}

// useEffect(() => {
//   // const simulationNodes = data.nodes.map()
//   const simulation = d3
//     .forceSimulation()
//     .force(
//       "center",
//       d3
//         .forceCenter()
//         .x(width / 2)
//         .y(height / 2)
//     ) // Attraction to the center of the svg area
//     .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
//     .force(
//       "collide",
//       d3
//         .forceCollide()
//         .strength(0.2)
//         .radius(function (d) {
//           return size(d.value) + 3;
//         })
//         .iterations(1)
//     ); // Force that avoids circle overlapping

//   // Apply these forces to the nodes and update their positions.
//   // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
//   simulation.nodes(root).on("tick", function (d) {
//     node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
//   });
// }, []);
