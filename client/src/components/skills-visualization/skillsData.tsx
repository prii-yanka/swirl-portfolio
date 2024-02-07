import React from "react";
import LeafImage from "./LeafImage";

export type TreeNode = {
  type: "node";
  value: number;
  name: string;
  children: Tree[];
};
export type TreeLeaf = {
  type: "leaf";
  name: string;
  value: number;
  component: React.ReactNode;
};

export type Tree = TreeNode | TreeLeaf;

export const data: Tree = {
  type: "node",
  name: "skills",
  value: 100,
  children: [
    {
      type: "node",
      name: "Frontend Engineering",
      value: 90,
      children: [
        {
          type: "node",
          name: "JavaScript FE",
          value: 95,
          children: [
            { type: "leaf", name: "React.js", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Reactjs.svg"/>},
            { type: "leaf", name: "Redux", value: 70, component: <LeafImage imagePath="images/skillsLeafIcons/Redux.svg"/>},
            { type: "leaf", name: "Material UI", value: 98, component: <LeafImage imagePath="images/skillsLeafIcons/Materialui.svg"/>},
            { type: "leaf", name: "Bootstrap", value: 63, component: <LeafImage imagePath="images/skillsLeafIcons/Bootstrap.svg"/>},
            { type: "leaf", name: "Three.js", value: 84, component: <LeafImage imagePath="images/skillsLeafIcons/Threejs.svg"/>},
            { type: "leaf", name: "D3", value: 84, component: <LeafImage imagePath="images/skillsLeafIcons/D3.svg"/>},
          ],
        },
        { type: "leaf", name: "HTML", value: 95, component: <LeafImage imagePath="images/skillsLeafIcons/Html.svg"/>},
        { type: "leaf", name: "CSS", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Css.svg"/>},
        { type: "leaf", name: "SASS", value: 84, component: <LeafImage imagePath="images/skillsLeafIcons/Sass.svg"/>},
      ],
    },
    {
      type: "node",
      name: "Backend Engineering",
      value: 90,
      children: [
        {
          type: "node",
          name: "JavaScript BE",
          value: 95,
          children: [
            { type: "leaf", name: "Node.js", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Nodejs.svg"/>},
            { type: "leaf", name: "Express.js", value: 70, component: <LeafImage imagePath="images/skillsLeafIcons/Expressjs.svg"/>},
          ],
        },
        { type: "leaf", name: "Python", value: 95, component: <LeafImage imagePath="images/skillsLeafIcons/Python.svg"/>},
        { type: "leaf", name: "Java", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Java.svg"/>},
        { type: "leaf", name: "AWS", value: 84, component: <LeafImage imagePath="images/skillsLeafIcons/Aws.svg"/>},
        { type: "leaf", name: "REST", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Restapi.svg"/>},
        { type: "leaf", name: "gRPC", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Grpcapi.svg"/>},
        { type: "leaf", name: "C/C++", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Cpp.svg"/>},
        {
          type: "node",
          name: "Databases",
          value: 95,
          children: [
            { type: "leaf", name: "MongoDB", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Mongodb.svg"/>},
            { type: "leaf", name: "MySQL", value: 70, component: <LeafImage imagePath="images/skillsLeafIcons/Mysql.svg"/>},
            { type: "leaf", name: "PostgreSQL", value: 70, component: <LeafImage imagePath="images/skillsLeafIcons/Postgresql.svg"/>},
          ],
        },
      ],
    },
    {
      type: "node",
      name: "Wireframing, Prototyping & Design",
      value: 90,
      children: [
        { type: "leaf", name: "Figma", value: 95, component: <LeafImage imagePath="images/skillsLeafIcons/Figma.svg"/>},
        { type: "leaf", name: "Adobe", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Adobecc.svg"/>},
        { type: "leaf", name: "Blender", value: 84, component: <LeafImage imagePath="images/skillsLeafIcons/Blender.svg"/>},
        { type: "leaf", name: "Unity", value: 90, component: <LeafImage imagePath="images/skillsLeafIcons/Unity.svg"/>},
      ],
    },
    {
      type: "node",
      name: "Version Control & Management",
      value: 90,
      children: [
        { type: "leaf", name: "Github", value: 95, component: <LeafImage imagePath="images/skillsLeafIcons/Github.svg"/>},
        { type: "leaf", name: "Jira", value: 60, component: <LeafImage imagePath="images/skillsLeafIcons/Jira.svg"/>},
        { type: "leaf", name: "BitBucket", value: 75, component: <LeafImage imagePath="images/skillsLeafIcons/Bitbucket.svg"/>},
        { type: "leaf", name: "Trello", value: 80, component: <LeafImage imagePath="images/skillsLeafIcons/Trello.svg"/>},
        { type: "leaf", name: "Scrum", value: 95, component: <LeafImage imagePath="images/skillsLeafIcons/Scrum.svg"/>},
      ],
    },
  ],
};

export const data2: Tree = {
  type: "node",
  name: "boss",
  value: 90,
  children: [
    {
      type: "node",
      name: "Team Dataviz",
      value: 90,
      children: [
        { type: "leaf", name: "Markeeee", value: 37, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
        { type: "leaf", name: "Roberteeee", value: 66, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
        { type: "leaf", name: "Emilyeeee", value: 5, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
        { type: "leaf", name: "Marioneeee", value: 98, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
      ],
    },
    {
      type: "node",
      name: "Team Sales",
      value: 90,
      children: [
        { type: "leaf", name: "Mélanieeee", value: 20, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
        { type: "leaf", name: "Einsteineee", value: 50, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
      ],
    },
    {
      type: "node",
      name: "Team Sales",
      value: 90,
      children: [
        { type: "leaf", name: "Mélanieeee", value: 20, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
        { type: "leaf", name: "Einsteineee", value: 50, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
      ],
    },
    {
      type: "node",
      name: "Team Sales",
      value: 90,
      children: [
        { type: "leaf", name: "Mélanieeee", value: 20, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
        { type: "leaf", name: "Einsteineee", value: 50, component: <LeafImage imagePath="images/skillsLeafIcons/imageIcon.svg"/>},
      ],
    },
  ],
};
