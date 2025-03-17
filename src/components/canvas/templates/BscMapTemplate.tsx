
import React from 'react';
import { Group, Rect, Textbox, Line, Triangle } from 'fabric';
import * as fabric from 'fabric';

// Function to create BSC Map template
export const createBscMapTemplate = (fabricCanvas: fabric.Canvas) => {
  if (!fabricCanvas) return;

  const canvasWidth = fabricCanvas.width || 1000;
  const canvasHeight = fabricCanvas.height || 800;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Create main section
  const mainSection = new Rect({
    left: centerX - 450,
    top: centerY - 450,
    width: 900,
    height: 900,
    fill: 'rgba(248, 249, 250, 0.5)',
    stroke: '#cccccc',
    strokeWidth: 1,
    rx: 10,
    ry: 10,
  });

  // Main title
  const mainTitle = new Textbox('MAPA ESTRATÉGICO BSC - ÁREA', {
    left: centerX - 440,
    top: centerY - 440,
    width: 350,
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#333',
    editable: true,
  });

  // Main header
  const mainHeader = new Rect({
    left: centerX - 400,
    top: centerY - 400,
    width: 800,
    height: 40,
    fill: '#4ecca3',
    rx: 2,
    ry: 2,
  });

  const mainHeaderText = new Textbox('ENFOCAR EL CRECIMIENTO A TRAVÉS DE INTIMIDAD CON LOS CLIENTES', {
    left: centerX - 390,
    top: centerY - 392,
    width: 780,
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#fff',
    textAlign: 'center',
    editable: true,
  });

  // Perspectives
  const perspectives = ['Financiero', 'Clientes', 'Procedimientos', 'Aprendizaje y Crecimiento'];
  const perspectiveLabels = [];
  
  for (let p = 0; p < 4; p++) {
    // Add perspective label on the side
    const perspectiveText = new Textbox(perspectives[p], {
      left: centerX - 440,
      top: centerY - 350 + p * 200,
      width: 100,
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#333',
      angle: 270,
      editable: true,
    });
    
    perspectiveLabels.push(perspectiveText);
  }

  // Create sticky notes for strategic objectives
  const stickyNotes = [];
  
  // Financial perspective
  const financialObjectives = [
    {
      text: "Optimizar gastos operativos",
      left: centerX - 260,
      top: centerY - 320,
      color: '#fef7cd'
    },
    {
      text: "Diversificación de fuentes de ingresos.",
      left: centerX - 400,
      top: centerY - 320,
      color: '#dcf9dd'
    },
    {
      text: "Generar valor económico financiero",
      left: centerX + 50,
      top: centerY - 320,
      color: '#fef7cd'
    },
    {
      text: "Lograr crecimiento sostenido de las colocaciones y captaciones",
      left: centerX + 300,
      top: centerY - 320,
      color: '#d3e4fd'
    }
  ];
  
  // Customer perspective
  const customerObjectives = [
    {
      text: "Facilitar el acceso a productos y servicios digitales",
      left: centerX - 300,
      top: centerY - 120,
      color: '#d3e4fd'
    },
    {
      text: "Proporcionar una experiencia WOW a los clientes",
      left: centerX + 100,
      top: centerY - 120,
      color: '#d3e4fd'
    },
    {
      text: "Fidelizar a nuestros clientes, a través de asesoría especializada",
      left: centerX + 300,
      top: centerY - 120,
      color: '#d3e4fd'
    }
  ];
  
  // Process perspective
  const processObjectives = [
    {
      text: "Garantizar la competitividad con procesos ágiles y simples",
      left: centerX - 300,
      top: centerY + 80,
      color: '#dcf9dd'
    },
    {
      text: "Enriquecer la experiencia del cliente a través de un modelo de inteligencia operativa",
      left: centerX + 100,
      top: centerY + 80,
      color: '#dcf9dd'
    },
    {
      text: "Brindar servicios personalizados",
      left: centerX + 300,
      top: centerY + 80,
      color: '#dcf9dd'
    }
  ];
  
  // Learning perspective
  const learningObjectives = [
    {
      text: "Gestionar un cambio en Liderazgo y Cultura, orientada a primar con el Cliente",
      left: centerX - 300,
      top: centerY + 280,
      color: '#fef7cd'
    },
    {
      text: "Contar con talento humano suficiente, competente y motivado",
      left: centerX - 50,
      top: centerY + 280,
      color: '#fef7cd'
    },
    {
      text: "Facilitar las ofertas personalizadas a clientes, automatizando e integrando marketing, ventas y servicios",
      left: centerX + 300,
      top: centerY + 280,
      color: '#fef7cd'
    }
  ];
  
  const allObjectives = [
    ...financialObjectives,
    ...customerObjectives,
    ...processObjectives,
    ...learningObjectives
  ];
  
  // Create sticky notes
  allObjectives.forEach(obj => {
    const note = new Rect({
      left: obj.left,
      top: obj.top,
      width: 150,
      height: 80,
      fill: obj.color,
      stroke: 'rgba(0,0,0,0.05)',
      strokeWidth: 1,
      rx: 4,
      ry: 4,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.1)',
        blur: 3,
        offsetX: 1,
        offsetY: 1
      })
    });

    const noteText = new Textbox(obj.text, {
      left: obj.left + 5,
      top: obj.top + 5,
      width: 140,
      fontSize: 12,
      fontFamily: 'Arial',
      fill: 'rgba(0,0,0,0.8)',
      editable: true,
    });
    
    const stickyGroup = new Group([note, noteText], {
      left: obj.left,
      top: obj.top,
      cornerSize: 6,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });
    
    stickyNotes.push(stickyGroup);
  });

  // Create arrows between objects
  const arrows = [
    { from: { left: centerX - 320, top: centerY - 280 }, to: { left: centerX - 260, top: centerY - 320 } },
    { from: { left: centerX - 260, top: centerY - 320 }, to: { left: centerX + 50, top: centerY - 320 } },
    { from: { left: centerX + 50, top: centerY - 320 }, to: { left: centerX + 300, top: centerY - 320 } },
    { from: { left: centerX - 300, top: centerY - 120 }, to: { left: centerX - 260, top: centerY - 260 } },
    { from: { left: centerX + 100, top: centerY - 120 }, to: { left: centerX + 300, top: centerY - 280 } },
    { from: { left: centerX - 300, top: centerY + 80 }, to: { left: centerX - 300, top: centerY - 70 } },
    { from: { left: centerX + 100, top: centerY + 80 }, to: { left: centerX + 100, top: centerY - 70 } },
    { from: { left: centerX - 300, top: centerY + 280 }, to: { left: centerX - 300, top: centerY + 130 } },
    { from: { left: centerX + 300, top: centerY + 280 }, to: { left: centerX + 300, top: centerY + 130 } }
  ];
  
  // Draw arrows
  arrows.forEach(arrow => {
    // Calculate angle
    const angle = Math.atan2(arrow.to.top - arrow.from.top, arrow.to.left - arrow.from.left) * 180 / Math.PI;
    const length = Math.sqrt(Math.pow(arrow.to.left - arrow.from.left, 2) + Math.pow(arrow.to.top - arrow.from.top, 2));
    
    // Create line
    const line = new Line([0, 0, length - 10, 0], {
      left: arrow.from.left,
      top: arrow.from.top,
      stroke: '#000',
      strokeWidth: 1,
      angle: angle,
      selectable: true,
      cornerSize: 6,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });
    
    // Create arrow head
    const arrowHead = new Triangle({
      width: 10,
      height: 10,
      fill: '#000',
      left: arrow.from.left + length * Math.cos(angle * Math.PI / 180),
      top: arrow.from.top + length * Math.sin(angle * Math.PI / 180),
      angle: angle + 90,
      selectable: true,
      cornerSize: 6,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });
    
    fabricCanvas.add(line);
    fabricCanvas.add(arrowHead);
  });

  // Process Headers
  const processHeaders = [
    { text: "CAPITAL HUMANO Y CULTURA ORGANIZACIONAL", left: centerX - 300, top: centerY + 350 },
    { text: "TRANSFORMACIÓN DIGITAL", left: centerX + 150, top: centerY + 350 },
    { text: "EXCELENCIA OPERACIONAL", left: centerX - 200, top: centerY + 150 }
  ];
  
  processHeaders.forEach(header => {
    const headerText = new Textbox(header.text, {
      left: header.left,
      top: header.top,
      width: 200,
      fontSize: 10,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#666',
      textAlign: 'center',
      editable: true,
    });
    
    fabricCanvas.add(headerText);
  });

  // Add all elements to canvas
  fabricCanvas.add(mainSection);
  fabricCanvas.add(mainTitle);
  fabricCanvas.add(mainHeader);
  fabricCanvas.add(mainHeaderText);
  perspectiveLabels.forEach(label => fabricCanvas.add(label));
  stickyNotes.forEach(note => fabricCanvas.add(note));

  // Make sure everything is rendered
  fabricCanvas.renderAll();
};
