import * as d3 from "d3";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
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
  value?: number;
  depth: number;
  vx: number;
  vy: number;
  name?: string;
  parent: TreeNode | TreeLeaf | null;
  type: string;
  id: string
  isLeaf: any;
  // index: number;

  constructor(node: d3.HierarchyCircularNode<Tree>) {
    this.data = node.data;
    this.x = node.x;
    this.y = node.y;
    this.r = node.r; // Radius for circular layout
    this.value = node.value;
    this.depth = node.depth;
    this.type = node.data.type;
    this.parent = node.parent ? node.parent.data : null;
    this.vx = 0;
    this.vy = 0;
    this.id = node.id? node.id : '';
    // this.index = 0;
    if ("component" in node.data) {
      this.component = node.data.component; // Only set if component exists in data
    }
  }
}

const MARGIN = 3;
const nodePadding = 1;

const colors = ["#EF8181", "#8FE1F3", "#fed46e"];

export const NestedCircularPackingWTransition = ({
  width,
  height,
  data,
}: CircularPackingProps) => {
  const skillsPackContainerRef = useRef(null);
  const matches = useMediaQuery("(max-aspect-ratio : 3/4)");
  const [containerHeight, setContainerHeight] = useState<any>(700);
  const [containerWidth, setContainerWidth] = useState<any>(500);
  const [nodes, setNodes] = useState<HierarchyCircularNode<Tree | TreeLeaf>[]>(
    []
  );
  const [hoveredNode, setHoveredNode] =
    useState<HierarchyCircularNode<Tree> | null>(null);
  const [root, setRoot] = useState<d3.HierarchyCircularNode<Tree> | null>(null);
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);
  const svgRef = useCallback((node: SVGSVGElement) => {
    if (node !== null) {
      setSvgElement(node);
    }
  }, []);
  const [simulation, setSimulation] = useState<any>();

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

  const handleMouseOver = () => {
    // if (!d3.active) simulation.alphaTarget(0.3).restart(); // Heat up the simulation
    simulation.alphaTarget(0.3).restart();
  }

  const handleMouseOut = () => {
    // if (!d3.active) simulation.alphaTarget(0); // Cool down the simulation
    simulation.stop();
  }

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
    function forceSeparateLeafNodes(alpha: number) {
      nodes.forEach(node => {
        if (node.isLeaf) {
          // Apply custom logic to push leaf nodes further apart
          nodes.forEach(otherNode => {
            if (otherNode.isLeaf && node !== otherNode) {
              const dx = node.x - otherNode.x;
              const dy = node.y - otherNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = node.r + otherNode.r + nodePadding; // Define leafNodePadding as needed
    
              if (distance < minDistance) {
                const force = ((distance - minDistance) / distance) * alpha;
                node.vx += (dx * force) / node.r;
                node.vy += (dy * force) / node.r;
                otherNode.vx -= (dx * force) / otherNode.r;
                otherNode.vy -= (dy * force) / otherNode.r;
              }
            }
          });
        }
      });
    }

    function forceContainChildren(alpha: number) {
      for (const node of nodes) {
        if (node.parent) {
          const dx = node.x - (node.parent?.x ?? 0);
          const dy = node.y - (node.parent?.y ?? 0);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = (node.parent?.r ?? 0) - node.r; // Ensure there's space for the node's radius
    
          if (distance > maxDistance) {
            // Calculate the ratio to scale dx and dy
            const ratio = maxDistance / distance;
            node.x = (node.parent?.x ?? 0) + dx * ratio;
            node.y = (node.parent?.y ?? 0) + dy * ratio;
          }
        }
      }
    }
  
    function forceCollide() {
      const alpha = 0.01;
      let maxRadius = d3.max(nodes, (d) => d.r);
  
      return () => {
        const quadtree = d3.quadtree(
          nodes,
          (d) => d.x,
          (d) => d.y
        );
        for (const d of nodes) {
          const r = d.r + (maxRadius ?? 0);
          const nx1 = d.x - r,
            ny1 = d.y - r;
          const nx2 = d.x + r,
            ny2 = d.y + r;
  
          quadtree.visit((q, x1, y1, x2, y2) => {
            if (!q.length)
              do {
                if (q.data !== d && q.data.depth === d.depth) {
                  const r = d.r + q.data.r + nodePadding;
                  let x = d.x - q.data.x,
                    y = d.y - q.data.y,
                    l = Math.hypot(x, y);
                  if (l < r) {
                    l = ((l - r) / l) * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    q.data.x += x;
                    q.data.y += y;
                  }
                }
              } while (q === q.next);
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
          });
        }
      };
    }
  
    function forceCluster() {
      return (alpha: number) => {
        for (const d of nodes) {
          const strength = 0.01;
          if (d.parent) {
            d.vx -= (d.x - (d.parent?.x ?? 0)) * (alpha * strength);
            d.vy -= (d.y - (d.parent?.y ?? 0)) * (alpha * strength);
          }
        }
      };
    }
    const tempSim = d3
      .forceSimulation<HierarchyCircularNode<Tree>>()
      // .force("charge", d3.forceManyBody().strength(-1.5)) // +/- attract/repel
      // .force("cluster", forceCluster())
      // .force("collide", forceCollide())
      .force("contain-children", forceContainChildren)
      // .force("separateLeafNodes", forceSeparateLeafNodes);
    setSimulation(tempSim);
  }, [nodes]);

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
          if (myDescendant.depth >= 0) {
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
      .on('tick', () => {
        svg.selectAll('.node')
          .data(nodes)
          .enter()
          .append('node')
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
          .attr('transform', (d: any) => {

            // if (d.isLeaf) {
            //   // Custom position adjustment for leaf nodes
            //   // Example: Pull leaf nodes slightly towards the outside
            //   const centerOffsetX = d.x - width / 2;
            //   const centerOffsetY = d.y - height / 2;
            //   d.x += centerOffsetX * 0.01; // Adjust as needed
            //   d.y += centerOffsetY * 0.01; // Adjust as needed
            // }
            if (hoveredNode && d.id !== hoveredNode.id) {
              // Apply some custom logic based on hoveredNode
              const repulsionStrength = 2; // Example value, adjust as needed
              const dx = d.x - hoveredNode.x;
              const dy = d.y - hoveredNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
      
              if (distance < repulsionStrength) {
                d.x += dx / distance * repulsionStrength;
                d.y += dy / distance * repulsionStrength;
              }
            }
            // bound nodes to parent
            if ( d.parent ) {
              // get dist from center of node d to center of parent node
              let dist = Math.sqrt( Math.pow(Math.abs(d.x - d.parent.x), 2) + Math.pow(Math.abs(d.y - d.parent.y), 2))
  
              // children can get 1/2 ( d.r ) out of parent
              if ( dist > d.parent.r ) {
                // get angle of d
                const theta = Math.atan2(d.y - d.parent.y, d.x - d.parent.x)
                const delta = d.parent.r
                // get new point of edge of parent
                const ndx = d.parent.x + delta * Math.cos(theta)
                const ndy = d.parent.y + delta * Math.sin(theta)
  
                d.x = ndx
                d.y = ndy
              }
            }
          
            // bound the nodes to the svg
            d.x = Math.max(d.r, Math.min(((width / 100) * containerWidth * 0.5) - d.r, d.x))
            d.y = Math.max(d.r, Math.min(((height / 100) * containerHeight * 0.5) - d.r, d.y))
  
            return 'translate(' + d.x + ',' + d.y + ')'
          })
      });
  }, [svgElement, nodes, hoveredNode]);

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
      >
        <circle
          className="mycircle"
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={colorScale(String(d.depth % colors.length)) as string}
          onClick={() => handleClick(node)}
          onMouseEnter={() => handleMouseEnter(node)}
          onMouseLeave={() => handleMouseLeave()}
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
