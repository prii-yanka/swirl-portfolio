import * as d3 from "d3";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { animated, useSpring } from "@react-spring/web";
import { Tree, TreeLeaf, TreeNode, data } from "./skillsData";
import { useMediaQuery } from "@mui/material";
import RecursiveCircleGroup from "./RecurciveCircleGroup";
import { MyHierarchyCircularNode } from "./MyHierarchyCircularNode";
import { HoveredNodeContext } from "./MyHoveredNodeContext";

type CircularPackingProps = {
  width: number;
  height: number;
  data: Tree;
};

const MARGIN = 3;
const nodePadding = 2.5;

const colors = ["#EF8181", "#8FE1F3", "#fed46e"];

const simulationHashMap = new Map<string, any>();
const initialXYHashMap = new Map<string, { x: number; y: number }>();

const defaultNode: MyHierarchyCircularNode<TreeNode | TreeLeaf> = {
  data: {
    name: "Default Node",
    type: "node",
    value: 0, // Add the 'value' property with a default value
    component: <div>Default Component</div>,
  },
  x: 100,
  y: 100,
  r: 10, // Example radius
  depth: 0,
  height: 0,
  parent: null, // No parent for a root node
  vx: 0, // Add the 'vx' property and initialize it to 0
  vy: 0, // Add the 'vy' property and initialize it to 0
  // value: 1,
  name: "Default Node",
  // type: "node",
  value: 0, // Add the 'value' property with a default value
  descendants: function() {
    return []; // Assuming no descendants for a default node
  },
  ancestors: function() {
    return [this]; // Assuming only self as ancestor for simplicity
  },
  // Add other methods and properties as needed to match d3's HierarchyCircularNode
};

// Create a default node instance
// ts-ignore
// const defaultNode = new MyHierarchyCircularNode<TreeNode | TreeLeaf>(defaultNode);

export const NestedCircularPackingWForce = ({
  width,
  height,
  data,
}: CircularPackingProps) => {
  const skillsPackContainerRef = useRef(null);
  const matches = useMediaQuery("(max-aspect-ratio : 3/4)");
  const [containerHeight, setContainerHeight] = useState<any>(700);
  const [containerWidth, setContainerWidth] = useState<any>(500);
  const [nodes, setNodes] = useState<MyHierarchyCircularNode<Tree | TreeLeaf>[]>(
    []
  );
  const [hoveredNodes, setHoveredNodes] = useState<
    MyHierarchyCircularNode<Tree | TreeLeaf>[]
  >([]);
  const [hoveredNode, setHoveredNode] =
    useState<MyHierarchyCircularNode<Tree> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [root, setRoot] = useState<MyHierarchyCircularNode<Tree>>(defaultNode);
  // let root: HierarchyCircularNode<Tree>;
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);
  const svgRef = useCallback((node: SVGSVGElement) => {
    if (node !== null) {
      // setSvgRefLoaded(true);
      setSvgElement(node);
    }
  }, []);
  const [svg, setSvg] = useState<any>();
  const [simulation, setSimulation] = useState<any>();
  const [hoveredNodesNames, setHoveredNodesNames] = useState<string[]>([]);
  // const hoveredNodeFromContext = useContext<HierarchyCircularNode<Tree> | null>(
  //   HoveredNodeContext as unknown as React.Context<HierarchyCircularNode<Tree> | null>
  // );

  function transformToMyHierarchyCircularNode(d3Node: d3.HierarchyCircularNode<Tree>): MyHierarchyCircularNode<Tree> {
    const myNode = new MyHierarchyCircularNode<Tree>(d3Node as any); // You might need to adjust the constructor or cast appropriately
  
    if (d3Node.children) {
      myNode.children = d3Node.children.map(transformToMyHierarchyCircularNode);
    }
  
    return myNode;
  }

  // const forceContainChildren = () => {
  //   return (alpha: number) => {
  //     for (const node of hoveredNodes) {
  //       if (node.parent) {
  //         // Calculate distance from child to parent center
  //         const dx = node.x - (node.parent?.x ?? 0);
  //         const dy = node.y - (node.parent?.y ?? 0);
  //         const distance = Math.sqrt(dx * dx + dy * dy);
  //         // Correctly compute maxDistance by subtracting node radius from parent radius
  //         const maxDistance = (node.parent?.r ?? 0) - node.r; // Maximum allowed distance from parent center

  //         // If outside the parent boundary, adjust position
  //         if (distance > maxDistance) {
  //           const angle = Math.atan2(dy, dx);

  //           // Correctly move child inside parent boundary
  //           node.x = (node.parent?.x ?? 0) + Math.cos(angle) * maxDistance;
  //           node.y = (node.parent?.y ?? 0) + Math.sin(angle) * maxDistance;
  //         }
  //       }
  //     }
  //   };
  // };
  const forceContainChildren = () => {
    return (alpha: number) => {
      for (let node of hoveredNodes) {
        if (node.parent) {
          const parent = node.parent;
          const dx = node.x - (parent.x ?? 0);
          const dy = node.y - (parent.y ?? 0);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = (parent.r ?? 0) - node.r - nodePadding; // margin is the minimal distance from the edge of the parent

          if (distance > maxDistance) {
            // Calculate the angle and position the node inside the parent's boundary
            const angle = Math.atan2(dy, dx);
            node.x = (parent.x ?? 0) + Math.cos(angle) * maxDistance;
            node.y = (parent.y ?? 0) + Math.sin(angle) * maxDistance;
          }
        }
      }
    };
  };

  const forceCollide = () => {
    // const alpha = 0.8;
    let maxRadius = d3.max(hoveredNodes, (d) => d.r);
    let mimRadius = d3.min(hoveredNodes, (d) => d.r);

    return (alpha: number) => {
      const quadtree = d3.quadtree(
        hoveredNodes,
        (d) => d.x,
        (d) => d.y
      );
      for (const d of hoveredNodes) {
        const r =
          d.r +
          Math.max(maxRadius ?? 0, mimRadius ?? 0) +
          Math.max(nodePadding, 2);
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
  };

  const forceCluster = () => {
    return (alpha: number) => {
      for (const d of hoveredNodes) {
        const strength = 10;
        if (d.parent) {
          d.vx -= (d.x - (d.parent?.x ?? 0)) * (alpha * strength);
          d.vy -= (d.y - (d.parent?.y ?? 0)) * (alpha * strength);
        }
      }
    };
  };

  const boundNodesToParent = (d: any) => {
    if (d.parent) {
      const dist = Math.sqrt(
        Math.pow(Math.abs(d.x - d.parent.x), 2) +
          Math.pow(Math.abs(d.y - d.parent.y), 2)
      );

      if (dist > d.parent.r) {
        const theta = Math.atan2(d.y - d.parent.y, d.x - d.parent.x);
        const delta = d.parent.r;
        const ndx = d.parent.x + delta * Math.cos(theta);
        const ndy = d.parent.y + delta * Math.sin(theta);

        d.x = ndx;
        d.y = ndy;
      }
    }

    d.x = Math.max(
      d.r,
      Math.min((width / 100) * containerWidth * 0.5 - d.r, d.x)
    );
    d.y = Math.max(
      d.r,
      Math.min((height / 100) * containerHeight * 0.5 - d.r, d.y)
    );
  };
  // function initializeSimulation() {
  // const initializeSimulation = (hoveredNodes: HierarchyCircularNode<Tree>[]) =>
  const initializeSimulation = (name: string) => {
    const simulation = d3
      .forceSimulation<MyHierarchyCircularNode<Tree>>()
      // .force("center", d3.forceCenter(width / 2, height / 2)) // Center the nodes in the SVG
      // .force(
      //   "collide",
      //   d3.forceCollide().radius((d: any) => d.r * 10)
      // ) // Prevent node overlap
      .force("charge", d3.forceManyBody().strength(-5)) // Repel nodes from each other
      .force("my-cluster", forceCluster)
      .force("my-collide", forceCollide)
      // .force(
      //   "collide",
      //   d3.forceCollide().radius((d: any) => d.r + 1)
      // )
      // .force(
      //   "charge",
      //   d3.forceManyBody().strength((d: any) => -d.r / 2)
      // )
      .force("my-contain-children", forceContainChildren)
      // .force("charge", d3.forceManyBody().strength(1.5)) // +/- attract/repel
      .alphaDecay(0.01)
      .alpha(0.9);
    setSimulation(simulation);
    simulationHashMap.set(name, simulation);
  };

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

  // const handleMouseEnter = (node: HierarchyCircularNode<Tree>) => {
  //   // if (node.name !== hoveredNode?.name) {
  //     setHoveredNode(node);
  //   // }
  //   // controls.start("visible");
  // };

  function sanitizeName(name: string) {
    return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  }

  const handleMouseOut = (node: MyHierarchyCircularNode<Tree>) => {
    setHoveredNode(null);
    const initialPos = initialXYHashMap.get(node.name);

    // Check if we have initial positions
    if (initialPos) {
      // Select the group by its class and reset its position
      svg
        .select(`.mygroup .${sanitizeName(node.name)}`)
        .transition() // Optional: animate the transition
        .duration(500) // Duration in ms, adjust as needed
        .attr("transform", `translate(${initialPos.x},${initialPos.y})`);

      // If you need to reset positions of circle or text inside the group,
      // you can do so here, but it might not be necessary since they are
      // positioned relative to the group.
    }
    simulationHashMap.get(node.name)?.restart().stop();
    // controls.start("visible");
    // simulation?.tick();
  };

  // function onMouseOver(d: any) {
  //   console.log(`************* in onMouseOver *************`);
  //   // simulation.restart();
  //   // simulation?.tick();
  //   // Additional mouseover actions
  // }

  // function onMouseLeave(d: any, svg: any) {
  //   console.log(`************* in onMouseLeave *************`);
  //   // simulation.restart().stop();
  //   // Additional mouseout actions
  //   // Retrieve the initial position from the hashmap
  // }

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
    // console.log("useEffect: event listener for touchstart");
    let circle: Element | null;
    const addTouchClassName = (event: any) => {
      // console.log(`touchstart`);
      circle = document.elementFromPoint(
        event.touches[0].clientX,
        event.touches[0].clientY
      );

      if (circle && circle.classList.contains("mycircle")) {
        circle.classList.add("touchstart");
        // console.log(`circle.classList after add: ${circle.classList}`);
        setTimeout(function () {
          circle?.classList.remove("touchstart");
        }, 600);
      }
    };

    if (matches) {
      document.body.addEventListener("touchstart", addTouchClassName, false);
    }
  }, []);

  // useEffect(() => {
  //   setHoveredNode(hoveredNodeFromContext);
  // }, [hoveredNodeFromContext]);

  useEffect(() => {
    const hierarchy = d3
      .hierarchy<Tree>(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value! - a.value!);

    const packGenerator = d3
      .pack<Tree>()
      .size([(containerWidth * width) / 100, (containerHeight * height) / 100])
      .padding(matches ? 5 : 12);

    const root = packGenerator(hierarchy);
    if (root) {
      const myRoot = transformToMyHierarchyCircularNode(root as unknown as d3.HierarchyCircularNode<Tree>);
      setRoot(myRoot);
    }
  }, [data, containerHeight, containerWidth, matches]);

  useEffect(() => {
    console.log(`root: ${root?.name}`);
    let tempNodes: MyHierarchyCircularNode<Tree>[] = [];
    const stack = new Set();

    if (root) {
      root.descendants().forEach((descendant : MyHierarchyCircularNode<Tree>) => {
        const myDescendant = descendant;
        // console.log(myDescendant.data.name);
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

  useEffect(() => {
    if (nodes.length === 0) return;
    for (const node of nodes) {
      initializeSimulation(node.name);
    }
  }, [nodes]);

  useEffect(() => {
    const mysvg = d3.select(svgElement);
    setSvg(mysvg);
  }, [svgElement]);

  useEffect(() => {
    console.log(`hoveredId: ${hoveredId}`);
    const hoveredNode = nodes.find((node) => node.name === hoveredId);
    if(hoveredNode) 
      setHoveredNode(hoveredNode);
  }, [hoveredId]);

  useEffect(() => {
    console.log(`hoveredNode: ${hoveredNode?.name}`);
    let tempNodes: MyHierarchyCircularNode<Tree>[] = [];
    let hoveredNodesNames: string[] = [];
    const stack = new Set();

    if (hoveredNode) {
      const hoveredHierarchy = d3
        .hierarchy(hoveredNode)
        .sum((d) => d.value)
        .sort((a, b) => b.value! - a.value!);

      // const root = packGenerator(hierarchy);

      // console.log(`hoveredNode.descendants(): ${hoveredNode.descendants()}`);
      hoveredHierarchy.descendants().forEach((descendant: any) => {
        const myDescendant = new MyHierarchyCircularNode<Tree>(descendant);
        // console.log(
        //   `hoveredNode: ${hoveredNode?.name}: hoveredNodes myDescendant.data.name: ${myDescendant.name}`
        // );
        if (
          stack.has(myDescendant.data.name) ||
          myDescendant.data.name === hoveredNode.name
        ) {
          // do not process this again
          return;
        } else {
          stack.add(myDescendant.data.name);
          console.log(`node.parent?.name: ${myDescendant.parent?.name}`);
          // Assuming you want to skip the root node itself which has depth of 0
          if (
            // (myDescendant.depth == hoveredNode.depth ||
            // myDescendant.depth == hoveredNode.depth + 1) &&
            // myDescendant.depth <= root?.height! &&
            // myDescendant.name !== hoveredNode.name
            // &&
            myDescendant.parent?.name === hoveredNode.name
          ) {
            tempNodes.push(myDescendant);
            hoveredNodesNames.push(myDescendant.name);
          }
        }
      });

      if (tempNodes.length !== 0) {
        setHoveredNodes(tempNodes);
        setHoveredNodesNames(hoveredNodesNames);
      }
    }
  }, [hoveredNode]);

  // ******** code to simulate force using d3 ********
  useEffect(() => {
    console.log("useEffect: simulation");
    let initialX = 0;
    let initialY = 0;
    // if (!hoveredNodes && !hoveredNode && !root && !svgElement) return;

    if (
      hoveredNodes &&
      hoveredNode &&
      root &&
      svgElement &&
      hoveredNodesNames
    ) {
      console.log(hoveredNodesNames); // Log hoveredNodesNames
      // initializeSimulation(hoveredNodes);

      // .nodes(hoveredNodes)
      // console.log(`simulation.nodes(hoveredNodes): ${simulation?.nodes()}`);
      simulationHashMap
        .get(hoveredNode.name)
        ?.nodes(hoveredNodes)
        .on("tick", () => {
          // const svgSelection = svg
          console.log(`in simulation?.on("tick")`);
          svg
            // .selectAll("node")
            .selectAll(".mygroup")
            .filter((d: any, i: number, groups: ArrayLike<d3.BaseType>) => {
              // console.log(`groups: ${groups}`);
              const circle = groups[i] as SVGSVGElement;
              const className = circle.getAttribute("class")?.split(" ")[1];
              // console.log(className ? className : ""); // Log className
              const bbox = circle.getBBox();
              initialX = bbox.x - bbox.width / 2;
              initialY = bbox.y - bbox.height / 2;
              initialXYHashMap.set(className ? className : "", {
                x: initialX,
                y: initialY,
              });
              return hoveredNodesNames.includes(className ? className : "");
            })
            .data(hoveredNodes)
            .join("mygroup")
            // .on("mouseover", onMouseOver)
            // .on("mouseleave", onMouseLeave)
            .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
          // .attr("cx", (d) => d.x)
          // .attr("cy", (d) => d.y);
          // .attr("cx", (d: any) => {
          //   boundNodesToParent(d);
          //   return d.x;
          // })
          // .attr("cy", (d: any) => {
          //   boundNodesToParent(d);
          //   return d.y;
          // });
        });
    }

    // return () => {
    //   // Clean up the on("tick") event handler
    //   simulationHashMap.get(hoveredNode?.name || "")?.on("tick", null);
    //   simulationHashMap
    //     .get(hoveredNode?.name || "")
    //     ?.restart()
    //     .stop();
    // };
  }, [hoveredNodes, hoveredNode, hoveredNodesNames, root, svgElement]);

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

  if (root) {
    return (
      <div
        ref={skillsPackContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          ref={svgRef}
          width={`${width}%`}
          height={`${height}%`}
          className="skillsSvg"
          // viewBox is not managed by React state anymore
        >
          {/* {allCircles} */}
          {/* <HoveredNodeContext.Provider value={{ hoveredNode, setHoveredNode }}> */}
          <RecursiveCircleGroup
            node={root}
            colorScale={colorScale}
            handleClick={handleClick}
            // handleMouseEnter={handleMouseEnter}
            // setHoveredNode={setHoveredNode}
            // handleMouseOut={() => handleMouseOut(root)}
            matches={matches}
            setHoveredId={setHoveredId}
            // setHoveredNode={setHoveredNode}
          />
          {/* </HoveredNodeContext.Provider> */}
        </svg>
      </div>
    );
  }
};

// const AnimatedText = ({
//   x,
//   y,
//   ...props
// }: React.SVGAttributes<SVGTextElement>) => {
//   const animatedProps = useSpring({
//     x,
//     y,
//   });
//   return (
//     <animated.text
//       {...props}
//       // dy='10'
//       x={animatedProps.x as any}
//       y={animatedProps.y as any}
//       letterSpacing="0.25"
//       style={{
//         pointerEvents: "none",
//         // transform: `translateY(-${20}%)`
//       }}
//     />
//   );
// };
