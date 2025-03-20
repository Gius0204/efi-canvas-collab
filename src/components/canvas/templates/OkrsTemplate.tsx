
import React from 'react';
import { Group, Rect, Textbox } from 'fabric';
import * as fabric from 'fabric';

// Function to create OKRs template
export const createOkrsTemplate = (fabricCanvas: fabric.Canvas) => {
  if (!fabricCanvas) return;

  const canvasWidth = fabricCanvas.width || 1000;
  const canvasHeight = fabricCanvas.height || 800;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Create main section
  const mainSection = new Rect({
    left: centerX - 350,
    top: centerY - 350,
    width: 700,
    height: 700,
    fill: 'rgba(248, 249, 250, 0.5)',
    stroke: '#cccccc',
    strokeWidth: 1,
    rx: 10,
    ry: 10,
  });

  // Main title
  const mainTitle = new Textbox('OKRS FINANZAS', {
    left: centerX - 340,
    top: centerY - 340,
    width: 300,
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#333',
    editable: true,
  });

  // Header rectangles
  const colors = ['#2ecc71', '#3498db', '#f1c40f'];
  const titles = ['Objetivo', 'Key Result', 'Iniciativa'];
  const headerRects = [];
  const headerTexts = [];

  for (let i = 0; i < 3; i++) {
    const rect = new Rect({
      left: centerX - 325 + i * 230,
      top: centerY - 300,
      width: 220,
      height: 40,
      fill: colors[i],
      rx: 2,
      ry: 2,
    });

    const text = new Textbox(titles[i], {
      left: centerX - 315 + i * 230,
      top: centerY - 290,
      width: 200,
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#fff',
      textAlign: 'center',
      editable: true,
    });

    headerRects.push(rect);
    headerTexts.push(text);
  }

  // Create containers for each column
  const containers = [];
  for (let i = 0; i < 3; i++) {
    const container = new Rect({
      left: centerX - 325 + i * 230,
      top: centerY - 250,
      width: 220,
      height: 260,
      fill: 'rgba(255, 255, 255, 0.5)',
      stroke: '#ddd',
      strokeWidth: 1,
      rx: 5,
      ry: 5,
      selectable: false,
    });
    containers.push(container);
  }

  // Create sticky notes
  const stickyNotes = [];
  
  // Sample content for sticky notes
  const objText = "Optimizar la gestión financiera para mejorar la rentabilidad y sostenibilidad de la empresa.";
  
  const keyResults = [
    "Reducir los costos operativos en un 15%",
    "Aumentar la liquidez en un 20%",
    "Programas gubernamentales de subsidio o apoyo.",
    "Disminuir en un 30% los errores en reportes financieros"
  ];
  
  const initiatives = [
    "Implementar un software de gestión financiera.",
    "Estructura de costos fijos elevada.",
    "Falta de diversificación en líneas de productos.",
    "Optimizar el uso de recursos mediante la automatización de procesos administrativos."
  ];

  const stickyColors = ['#dcf9dd', '#d3e4fd', '#fef7cd'];
  
  // Objective sticky (large one in first column)
  const objRect = new Rect({
    left: centerX - 315,
    top: centerY - 170,
    width: 200,
    height: 160,
    fill: stickyColors[0],
    stroke: 'rgba(0,0,0,0.05)',
    strokeWidth: 1,
    rx: 2,
    ry: 2,
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.1)',
      blur: 3,
      offsetX: 1,
      offsetY: 1
    })
  });

  const objTextbox = new Textbox(objText, {
    left: centerX - 310,
    top: centerY - 165,
    width: 190,
    fontSize: 12,
    fontFamily: 'Arial',
    fill: 'rgba(0,0,0,0.8)',
    editable: true,
  });
  
  const objGroup = new Group([objRect, objTextbox], {
    left: centerX - 315,
    top: centerY - 170,
    cornerSize: 6,
    transparentCorners: false,
    cornerColor: '#0075ff',
    borderColor: '#0075ff'
  });
  
  stickyNotes.push(objGroup);
  
  // Key Results
  for (let i = 0; i < keyResults.length; i++) {
    const posY = -220 + (i * 80);
    
    const note = new Rect({
      left: centerX - 85,
      top: centerY + posY,
      width: 180,
      height: 70,
      fill: stickyColors[1],
      stroke: 'rgba(0,0,0,0.05)',
      strokeWidth: 1,
      rx: 2,
      ry: 2,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.1)',
        blur: 3,
        offsetX: 1,
        offsetY: 1
      })
    });

    const noteText = new Textbox(keyResults[i], {
      left: centerX - 80,
      top: centerY + posY + 5,
      width: 170,
      fontSize: 12,
      fontFamily: 'Arial',
      fill: 'rgba(0,0,0,0.8)',
      editable: true,
    });
    
    const stickyGroup = new Group([note, noteText], {
      left: centerX - 85,
      top: centerY + posY,
      cornerSize: 6,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });
    
    stickyNotes.push(stickyGroup);
  }
  
  // Initiatives
  for (let i = 0; i < initiatives.length; i++) {
    const posY = -220 + (i * 80);
    
    const note = new Rect({
      left: centerX + 145,
      top: centerY + posY,
      width: 180,
      height: 70,
      fill: stickyColors[2],
      stroke: 'rgba(0,0,0,0.05)',
      strokeWidth: 1,
      rx: 2,
      ry: 2,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.1)',
        blur: 3,
        offsetX: 1,
        offsetY: 1
      })
    });

    const noteText = new Textbox(initiatives[i], {
      left: centerX + 150,
      top: centerY + posY + 5,
      width: 170,
      fontSize: 12,
      fontFamily: 'Arial',
      fill: 'rgba(0,0,0,0.8)',
      editable: true,
    });
    
    const stickyGroup = new Group([note, noteText], {
      left: centerX + 145,
      top: centerY + posY,
      cornerSize: 6,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });
    
    stickyNotes.push(stickyGroup);
  }

  // Add all elements to canvas
  fabricCanvas.add(mainSection);
  fabricCanvas.add(mainTitle);
  headerRects.forEach(rect => fabricCanvas.add(rect));
  headerTexts.forEach(text => fabricCanvas.add(text));
  containers.forEach(container => fabricCanvas.add(container));
  stickyNotes.forEach(note => fabricCanvas.add(note));

  // Make sure everything is rendered
  fabricCanvas.renderAll();
};
