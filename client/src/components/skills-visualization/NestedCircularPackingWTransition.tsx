import * as d3 from "d3";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { motion, useAnimation, useInView } from "framer-motion";
import { Tree, TreeLeaf, TreeNode } from "./skillsData";
import { useMediaQuery } from "@mui/material";
import { count } from "console";

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
  value?: number;
  depth: number;
  vx?: number;
  vy?: number;
  name?: string;
  // index: number;

  constructor(node: d3.HierarchyCircularNode<Tree>) {
    this.data = node.data;
    this.x = node.x;
    this.y = node.y;
    this.r = node.r; // Radius for circular layout
    this.value = node.value;
    this.depth = node.depth;
    // this.index = 0;
    if ("component" in node.data) {
      this.component = node.data.component; // Only set if component exists in data
    }
  }
}

const MARGIN = 3;
const nodePadding = 2.5;

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
  const [nodes, setNodes] = useState<HierarchyCircularNode<Tree | TreeLeaf>[]>(
    []
  );
  const [hoveredNode, setHoveredNode] =
    useState<HierarchyCircularNode<Tree> | null>(null);
  const [root, setRoot] = useState<d3.HierarchyCircularNode<Tree> | null>(null);
  // <d3.HierarchyCircularNode<Tree>>
  // const [simulation, setSimulation] = useState<any>();
  // const [svgRefLoaded, setSvgRefLoaded] = useState(false);
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);
  const svgRef = useCallback((node: SVGSVGElement) => {
    if (node !== null) {
      // setSvgRefLoaded(true);
      setSvgElement(node);
      console.log("useEffect: simulate");

      if (!nodes || !hoveredNode || !root || !svgElement || !simulation) return;
      const svg = d3.select(svgElement);

      // simulation
      //   .nodes(nodes)
      // Adjust collision strength based on hover
      // .force(
      //   "collide",
      //   d3
      //     .forceCollide()
      //     .radius((d: any) => d.r + MARGIN)
      //     .strength(hoveredNode ? 1 : 0.1)
      // )
      // .on("tick", () => {
      //   svg
      //     .selectAll("circle")
      //     .attr("r", (d: any) => {
      //       d.t = d === hoveredNode ? 1 - (1 - d.t) * 0.9 : d.t * 0.9;
      //       d.r = (1 - d.t) * d.radius + d.t * Math.max(d.radius * 1.2, 100);
      //       return d.r;
      //     })
      //     .attr("cx", (d: any) => d.x)
      //     .attr("cy", (d: any) => d.y);
      // });
    }
  }, []);
  const [simulation, setSimulation] = useState<any>();

  // const collide = d3
  //   .forceCollide()
  //   .strength(0.5)
  //   .radius((d : any) => d.radius + nodePadding)
  //   .iterations(1);

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

  const handleMouseEnter = (node: HierarchyCircularNode<Tree>) => {
    setHoveredNode(node);
    // controls.start("visible");
    simulation?.tick();
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    // controls.start("visible");
    simulation?.tick();
  };

  useEffect(() => {
    console.log("useEffect: set container height and width");
    // @ts-ignore
    setContainerHeight(skillsPackContainerRef.current?.offsetHeight);
    // @ts-ignore
    setContainerWidth(skillsPackContainerRef.current?.offsetWidth);
  }, []);

  // useEffect(() => {
  //   console.log(`Cheight: ${containerHeight}`)
  //   console.log(`Cwidth: ${containerWidth}`)
  // }, [containerHeight, containerWidth])

  useEffect(() => {
    console.log("useEffect: event listener for resize");
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (inView1) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView1]);

  useEffect(() => {
    console.log("useEffect: event listener for touchstart");
    let circle: Element | null;
    const addTouchClassName = (event: any) => {
      console.log(`touchstart`);
      circle = document.elementFromPoint(
        event.touches[0].clientX,
        event.touches[0].clientY
      );

      if (circle && circle.classList.contains("mycircle")) {
        circle.classList.add("touchstart");
        console.log(`circle.classList after add: ${circle.classList}`);
        setTimeout(function () {
          circle?.classList.remove("touchstart");
        }, 600);
      }
    };

    if (matches) {
      document.body.addEventListener("touchstart", addTouchClassName, false);
    }
  }, []);

  useEffect(() => {
    const tempSim = d3
      .forceSimulation<HierarchyCircularNode<Tree>>()
      .force(
        "forceX",
        d3
          .forceX()
          .strength(0.1)
          .x((width / 100) * containerWidth * 0.5)
      )
      .force(
        "forceY",
        d3
          .forceY()
          .strength(0.1)
          .y((height / 100) * containerHeight * 0.5)
      )
      .force(
        "center",
        d3
          .forceCenter()
          .x((width / 100) * containerWidth * 0.5)
          .y((height / 100) * containerHeight * 0.5)
      )
      .force("charge", d3.forceManyBody().strength(-15));

    setSimulation(tempSim);
  }, []);

  useEffect(() => {
    const hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value! - a.value!);

    const packGenerator = d3
      .pack<Tree>()
      .size([(containerWidth * width) / 100, (containerHeight * height) / 100])
      .padding(matches ? 5 : 12);
    // const root = packGenerator(hierarchy);
    const root = packGenerator(hierarchy);
    setRoot(root);
  }, [data, containerHeight, containerWidth, matches]);

  useEffect(() => {
    console.log(`root: ${root}`);
    let tempNodes: HierarchyCircularNode<Tree>[] = [];
    const stack = new Set();

    if (root) {
      // for (const descendant of root.descendants()) {
      //   // if(descendant.depth === root.height)
      // };
      root.each((descendant) => {
        const myDescendant = new HierarchyCircularNode<Tree>(descendant);
        console.log(myDescendant.data.name);
        if (stack.has(myDescendant.data.name)) {
          // do not process this again
          return;
        } else {
          stack.add(myDescendant.data.name);
          // Assuming you want to skip the root node itself which has depth of 0
          if (myDescendant.depth >= 1) {
            tempNodes.push(myDescendant);
          }
        }
      });

      if (tempNodes.length !== 0) {
        setNodes(tempNodes);
      }
    }
  }, [root]);

  // ******** code to simulate force using d3 ********
  useEffect(() => {
    console.log("useEffect: simulation");

    if (!nodes || !hoveredNode || !root || !svgElement) return;
    const svg = d3.select(svgElement);

    simulation
      .nodes(nodes)
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d: any) => d.r + nodePadding)
          .strength(hoveredNode ? 1 : 0.4)
      ) // Adjust collision strength based on hover
      .on("tick", () => {
        svg
          .selectAll("circle")
          .attr("r", (d: any) => {
            d.t = d === hoveredNode ? 1 - (1 - d.t) * 0.9 : d.t * 0.9;
            d.r = (1 - d.t) * d.radius + d.t * Math.max(d.radius * 1.2, 100);
            return d.r;
          })
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y);
      });
    // .alpha(1).restart();;
  }, [svgElement, nodes, hoveredNode]);

  // const simulate = () => {
  //   console.log("useEffect: simulate");

  //   if (!nodes || !hoveredNode || !root || !svgElement || !simulation) return;
  //   const svg = d3.select(svgElement);

  //   simulation
  //     .nodes(nodes)
  //     .force(
  //       "collide",
  //       d3
  //         .forceCollide()
  //         .radius((d: any) => d.r + MARGIN)
  //         .strength(hoveredNode ? 0.5 : 0.1)
  //     ) // Adjust collision strength based on hover
  //     .on("tick", () => {
  //       svg
  //         .selectAll("circle")
  //         .attr("cx", (d: any) => d.x)
  //         .attr("cy", (d: any) => d.y);
  //     });
  // };

  // useEffect(() => {
  //   console.log("useEffect: simulation");
  //   simulate();
  // }, [svgElement, nodes, hoveredNode, simulation]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(d3.range(0, colors.length).map(String)) // Convert numbers to strings
    .range(colors);

  const handleClick = (d: any) => {
    if (!svgElement) return;

    const svg = d3.select(svgElement);

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

  // const allCircles = root?.descendants().map((d: any) => {
  const allCircles = nodes.map((d: any) => {
    // Create an instance of HierarchyCircularNode
    if (!d) return null;
    const node = new HierarchyCircularNode<Tree>(d);
    // console.log(`node.r, d.data.name: ${node.r}, ${node.data.name}`);
    // Create an arc for the text
    // createtextarc number can be adjusted based on how far from the circle you want the text
    const { pathId, arcPath, circumference } = createTextArc(d, -3);
    return (
      <g
        key={d.data.name}
        // animate={controls}
        // variants={container}
        // viewport={{ once: true }}
        // transition={{ duration: 0.3 }}
      >
        <circle
          className="mycircle"
          // animate={controls}
          // variants={item}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={colorScale(String(d.depth % colors.length)) as string}
          onClick={() => handleClick(node)}
          onMouseEnter={() => handleMouseEnter(node)}
          onMouseLeave={() => handleMouseLeave()}
          // whileInView="visible"
          // viewport={{ once: true }}
          // transition={{ ease: "easeOut", duration: 1 }}
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
            fontSize={matches ? 5 : 10}
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
      </g>
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
      letterSpacing="0.25"
      style={{
        pointerEvents: "none",
        // transform: `translateY(-${20}%)`
      }}
    />
  );
};
