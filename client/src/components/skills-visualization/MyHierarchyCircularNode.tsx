import React from "react";
import LeafImage from "./LeafImage";
import { Tree, TreeLeaf, TreeNode, data } from "./skillsData";
export class MyHierarchyCircularNode<Tree extends TreeNode | TreeLeaf> {
  data: Tree;
  height: number;
  x: number;
  y: number;
  r: number; // Assuming you have a radius for circular packing
  component?: React.ReactNode; // Optional, since not all nodes will have a component
  value: number;
  depth: number;
  vx: number;
  vy: number;
  name: string;
  parent: Tree | null;
  // type: string;
  children?: MyHierarchyCircularNode<Tree>[];
  descendants: () => MyHierarchyCircularNode<Tree>[]; // Declare as a function type
  ancestors: () => MyHierarchyCircularNode<Tree>[]; // Declare as a function type
  // setHoveredId: (id: string | null) => void;

  constructor(node: d3.HierarchyCircularNode<Tree>) {
    this.data = node.data;
    // this.type = node.data.type;
    this.x = node.x;
    this.y = node.y;
    this.r = node.r; // Radius for circular layout
    this.value = node.value ?? 0;
    this.depth = node.depth;
    this.parent = node.ancestors().length > 1 ? node.ancestors()[1].data : null;
    this.vx = 0; // Add the 'vx' property and initialize it to 0
    this.vy = 0; // Add the 'vy' property and initialize it to 0
    this.height = node.height;
    this.name = node.data.name;
    this.children =
      "children" in node.data ? (node.data.children as unknown as MyHierarchyCircularNode<Tree>[]) : undefined;
    this.descendants = () => {
      const descendantsArray: MyHierarchyCircularNode<Tree>[] = [];
      node.descendants().forEach((descendant) => {
        descendantsArray.push(new MyHierarchyCircularNode<Tree>(descendant));
      });
      return descendantsArray;
    }; // Assign the value of node.descendants() to this.descendants
    this.ancestors = () => {
      const descendantsArray: MyHierarchyCircularNode<Tree>[] = [];
      node.ancestors().forEach((ancestor) => {
        descendantsArray.push(new MyHierarchyCircularNode<Tree>(ancestor));
      });
      return descendantsArray;
    };
    // this.each = node.each;
    // this.index = 0;
    if ("component" in node.data && node.data.component) {
      console.log(`node.component constructor: ${node.data.component}`);
      this.component = node.data.component; // Only set if component exists in data
    } 
    else {
      this.component = undefined; // Explicitly set to undefined if not present
    }
    // this.setHoveredId = (id: string | null) => {
    //   console.log(`id: ${id}`);
    //   this.setHoveredId(node.data.name);
    // };
    // this.component = <LeafImage imagePath="images/skillsLeafIcons/Reactjs.svg" />; // This is a JSX element
  }
}
