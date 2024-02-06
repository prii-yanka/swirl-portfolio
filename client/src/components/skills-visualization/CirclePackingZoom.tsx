import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import "./skillsStyles.css"
import * as d3 from "d3";
import { Tree } from './skillsData';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  type CircularPackingProps = {
    width: number;
    height: number;
    padding: number;
    data: Tree;
  };

const CirclePackingZoom = ({data, width, height, padding} : CircularPackingProps) => {

    useEffect(() => {
        const color = d3.scaleSequential([8, 0], d3.interpolateMagma);
        const pack = (data: any) =>
          d3
            .pack()
            .size([width, height])
            .padding(3)(
            d3
              .hierarchy(data)
              .sum(d => d.value)
              .sort((a, b) => (b.value || 0) - (a.value || 0))
          );
        
        const svg = d3
          .select("#skillsContainer")
          .append("svg")
          .attr("viewBox", [
            -padding,
            -padding,
            width + padding * 2,
            height + padding * 2
          ]);
        const root = pack(data);
        
        const node = svg
          .selectAll("g")
          .data(
            d3
              .group(root.descendants(), (d: any) => d.height)
          )
          .join("g")
          .selectAll("g")
          .data((d: any) => d.values)
          .join("g")
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        
        const circle = node
          .append("circle")
          .attr("r", (d: any) => d.r)
          .attr("stroke-width", (d: any) => 1 / (d.depth + 1))
          .attr("fill", (d: any) => color(d.height));
        
        circle.on("click", d => {
          svg
            .transition()
            .duration(1000)
            .attr("viewBox", `${d.x - d.r - padding}, ${d.y - d.r - padding}, ${d.r * 2 + padding * 2}, ${d.r * 2 + padding * 2}`);
        });
        
    }, [data])
  return (
    <div id="skillsContainer"></div>
  )
}

export default CirclePackingZoom