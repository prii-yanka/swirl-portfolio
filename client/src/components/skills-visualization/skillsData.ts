export type TreeNode = {
    type: 'node';
    value: number;
    name: string;
    children: Tree[];
  };
  export type TreeLeaf = {
    type: 'leaf';
    name: string;
    value: number;
  };
  
  export type Tree = TreeNode | TreeLeaf;
  
  
  export const data: Tree = {
    type: "node",
    name: "boss",
    value: 0,
    children: [
      {
        type: "node",
        name: "Team Dataviz",
        value: 0,
        children: [
          { type: "leaf", name: "Mark", value: 90 },
          { type: "leaf", name: "Robert", value: 42 },
          { type: "leaf", name: "Emily", value: 34 },
          { type: "leaf", name: "Marion", value: 53 },
        ],
      },
      {
        type: "node",
        name: "Team DevOps",
        value: 0,
        children: [
          { type: "leaf", name: "Nicolas", value: 98 },
          { type: "leaf", name: "Malki", value: 22 },
          { type: "leaf", name: "Djé", value: 12 },
        ],
      },
      {
        type: "node",
        name: "Team Sales",
        value: 0,
        children: [
          { type: "leaf", name: "Mélanie", value: 45 },
          { type: "leaf", name: "Einstein", value: 76 },
        ],
      },
    ],
  };

  export const data2: Tree = {
    type: "node",
    name: "boss",
    value: 0,
    children: [
      {
        type: "node",
        name: "Team Dataviz",
        value: 0,
        children: [
          { type: "leaf", name: "Markeeee", value: 37 },
          { type: "leaf", name: "Roberteeee", value: 66 },
          { type: "leaf", name: "Emilyeeee", value: 5 },
          { type: "leaf", name: "Marioneeee", value: 98 },
        ],
      },
      {
        type: "node",
        name: "Team DevOps",
        value: 0,
        children: [
          { type: "leaf", name: "Nicolaseee", value: 88 },
          { type: "leaf", name: "Malkieee", value: 19 },
          { type: "leaf", name: "Djéeee", value: 11 },
        ],
      },
      {
        type: "node",
        name: "Team Sales",
        value: 0,
        children: [
          { type: "leaf", name: "Mélanieeee", value: 20 },
          { type: "leaf", name: "Einsteineee", value: 50 },
        ],
      },
      {
        type: "node",
        name: "Team Sales",
        value: 0,
        children: [
          { type: "leaf", name: "Mélanieeee", value: 20 },
          { type: "leaf", name: "Einsteineee", value: 50 },
        ],
      },
      {
        type: "node",
        name: "Team Sales",
        value: 0,
        children: [
          { type: "leaf", name: "Mélanieeee", value: 20 },
          { type: "leaf", name: "Einsteineee", value: 50 },
        ],
      },
    ],
  };
  