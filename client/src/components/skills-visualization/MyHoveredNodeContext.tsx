// HoveredNodeContext.tsx
import React from "react";
import { MyHierarchyCircularNode } from "./MyHierarchyCircularNode"; // Adjust import as necessary
import { Tree } from "./skillsData"; // Adjust import as necessary

// Define the context type
type MyHoveredNodeContextType = {
  hoveredNode: MyHierarchyCircularNode<Tree> | null;
  setHoveredNode: (node: MyHierarchyCircularNode<Tree> | null) => void;
};

// Define a default value for the context
const defaultContextValue: MyHoveredNodeContextType = {
  hoveredNode: null,
  setHoveredNode: () => {}, // Empty function as placeholder
};

// Create the context with an undefined default value, but it will be overridden by Provider value
export const HoveredNodeContext = React.createContext<
  MyHoveredNodeContextType
>(defaultContextValue);
