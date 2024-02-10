import React from "react";
import LeafImage from "./LeafImage";
import { Tree, TreeLeaf, TreeNode, data } from "./skillsData";
export class HierarchyCircularNode<Tree extends TreeNode | TreeLeaf> {
  data: Tree;
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
  type: string;
  children?: Tree[];
  descendants: () => HierarchyCircularNode<Tree>[]; // Declare as a function type
  ancestors: () => HierarchyCircularNode<Tree>[]; // Declare as a function type

  constructor(node: d3.HierarchyCircularNode<Tree>) {
    this.data = node.data;
    this.x = node.x;
    this.y = node.y;
    this.r = node.r; // Radius for circular layout
    this.value = node.value ?? 0;
    this.depth = node.depth;
    this.type = node.data.type;
    this.parent = node.ancestors().length > 1 ? node.ancestors()[1].data : null;
    this.vx = 5;
    this.vy = 5;
    this.name = node.data.name;
    this.children =
      "children" in node.data ? (node.data.children as Tree[]) : undefined;
    this.descendants = () => {
      const descendantsArray: HierarchyCircularNode<Tree>[] = [];
      node.descendants().forEach((descendant) => {
        descendantsArray.push(new HierarchyCircularNode<Tree>(descendant));
      });
      return descendantsArray;
    }; // Assign the value of node.descendants() to this.descendants
    this.ancestors = () => {
      const descendantsArray: HierarchyCircularNode<Tree>[] = [];
      node.ancestors().forEach((ancestor) => {
        descendantsArray.push(new HierarchyCircularNode<Tree>(ancestor));
      });
      return descendantsArray;
    };
    // this.each = node.each;
    // this.index = 0;
    if ("component" in node.data && node.data.component) {
      console.log(`node.component constructor: ${node.data.component}`);
      this.component = node.data.component; // Only set if component exists in data
    }
    // this.component = <LeafImage imagePath="images/skillsLeafIcons/Reactjs.svg" />; // This is a JSX element
  }
}
