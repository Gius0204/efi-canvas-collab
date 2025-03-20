import React from "react";
import { Group, Rect, Textbox } from "fabric";
import * as fabric from "fabric";

// Function to create PESTEL template
export const createPestelTemplate = (fabricCanvas: fabric.Canvas) => {
  if (!fabricCanvas) return;

  const canvasWidth = fabricCanvas.width || 1530;
  const canvasHeight = fabricCanvas.height || 770;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Main container
  const mainContainer = new Rect({
    left: centerX - 770,
    top: centerY - 375,
    width: 1530,
    height: 770,
    fill: "rgba(255, 255, 255, 1)",
    stroke: "#ccc",
    strokeWidth: 2,
    rx: 10,
    ry: 10,
  });

  // Title on the left
  const mainTitle = new Textbox("PESTEL AREA MARKETING", {
    left: centerX - 730,
    top: centerY - 360,
    width: 250,
    fontSize: 14,
    fontFamily: "Arial",
    fontWeight: "bold",
    fill: "#333",
    backgroundColor: "#f8f9fa",
    textAlign: "left",
    editable: true,
    padding: 5,
  });

  const rectTitle = new Rect({
    left: centerX - 740,
    top: centerY - 360,
    width: 220,
    height: 25,
    fill: "rgba(128, 128, 128, 0.5)",
    stroke: "#ccc",
    strokeWidth: 2,
    rx: 5,
    ry: 5,
  });

  // Headers (Columns)
  const colors = [
    "#f1c40f",
    "#e74c3c",
    "#3498db",
    "#9b59b6",
    "#2ecc71",
    "#e67e22",
  ];
  const titles = [
    "Político",
    "Económico",
    "Social",
    "Tecnológico",
    "Ecológico",
    "Legal",
  ];
  const columnHeaders = [];

  for (let i = 0; i < 6; i++) {
    const rect = new Rect({
      left: centerX - 700 + i * 240,
      top: centerY - 330,
      width: 230,
      height: 40,
      fill: colors[i],
      rx: 5,
      ry: 5,
    });

    const text = new Textbox(titles[i], {
      left: centerX - 690 + i * 240,
      top: centerY - 320,
      width: 210,
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "bold",
      fill: "#fff",
      textAlign: "center",
      editable: false,
    });

    columnHeaders.push(rect, text);
  }

  // Rows (Perspectives)
  const perspectives = ["Financiero", "Clientes", "Procesos", "Aprendizaje"];
  const rowHeaders = [];
  const sectionContainers = [];

  for (let i = 0; i < perspectives.length; i++) {
    const rect = new Rect({
      left: centerX - 740,
      top: centerY - 280 + i * 170,
      width: 30,
      height: 150,
      fill: "#fff",
      stroke: "#ddd",
      strokeWidth: 1,
      rx: 5,
      ry: 5,
    });

    const text = new Textbox(perspectives[i], {
      left: centerX - 735,
      top: centerY - 160 + i * 170,
      width: 100,
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: "bold",
      fill: "#333",
      textAlign: "center",
      angle: 270,
      editable: true,
    });
    rowHeaders.push(rect, text);

    for (let j = 0; j < 6; j++) {
      const section = new Rect({
        left: centerX - 700 + j * 240,
        top: centerY - 280 + i * 170,
        width: 230,
        height: 150,
        fill: "#fff",
        stroke: "#ddd",
        strokeWidth: 1,
        rx: 5,
        ry: 5,
      });
      sectionContainers.push(section);
    }
  }

  // Sticky Notes Data
  const stickyColors = [
    "#fef7cd",
    "#ffdee2",
    "#d3e4fd",
    "#eab7f7",
    "#dcf9dd",
    "#f1cc9c",
  ];
  const stickyNotes = [];

  for (let row = 0; row < perspectives.length; row++) {
    for (let col = 0; col < 6; col++) {
      for (let i = 0; i < 4; i++) {
        const posX = centerX - 680 + col * 240 + (i % 2) * 100;
        const posY = centerY - 260 + row * 170 + Math.floor(i / 2) * 60;

        const note = new Rect({
          left: posX,
          top: posY,
          width: 90,
          height: 55,
          fill: stickyColors[col],
          rx: 2,
          ry: 2,
        });

        const noteText = new Textbox("Nota editable", {
          left: posX + 5,
          top: posY + 5,
          width: 80,
          fontSize: 10,
          textAlign: "center",
          editable: true,
        });

        const stickyGroup = new Group([note, noteText]);
        stickyNotes.push(stickyGroup);
      }
    }
  }

  // Add elements to canvas
  fabricCanvas.add(mainContainer);
  fabricCanvas.add(mainTitle);
  fabricCanvas.add(rectTitle);

  columnHeaders.forEach((el) => fabricCanvas.add(el));
  rowHeaders.forEach((el) => fabricCanvas.add(el));
  sectionContainers.forEach((el) => fabricCanvas.add(el));
  stickyNotes.forEach((el) => fabricCanvas.add(el));

  fabricCanvas.renderAll();
};
