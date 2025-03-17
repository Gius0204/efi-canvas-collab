
import React from 'react';
import { Group, Rect, Textbox } from 'fabric';
import * as fabric from 'fabric';

// Function to create PESTEL template
export const createPestelTemplate = (fabricCanvas: fabric.Canvas) => {
  if (!fabricCanvas) return;

  const canvasWidth = fabricCanvas.width || 1000;
  const canvasHeight = fabricCanvas.height || 800;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Create main section
  const mainSection = new Rect({
    left: centerX - 500,
    top: centerY - 350,
    width: 1000,
    height: 700,
    fill: 'rgba(248, 249, 250, 0.5)',
    stroke: '#cccccc',
    strokeWidth: 1,
    rx: 10,
    ry: 10,
  });

  // Main title
  const mainTitle = new Textbox('PESTEL AREA MARKETING', {
    left: centerX - 490,
    top: centerY - 340,
    width: 300,
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#333',
    editable: true,
  });

  // Header rectangles
  const colors = ['#f1c40f', '#e74c3c', '#3498db', '#9b59b6', '#2ecc71', '#e67e22'];
  const titles = ['Político', 'Económico', 'Social', 'Tecnológico', 'Ecológico', 'Legal'];
  const headerRects = [];
  const headerTexts = [];

  for (let i = 0; i < 6; i++) {
    const rect = new Rect({
      left: centerX - 488 + i * 166,
      top: centerY - 300,
      width: 160,
      height: 30,
      fill: colors[i],
      rx: 2,
      ry: 2,
    });

    const text = new Textbox(titles[i], {
      left: centerX - 478 + i * 166,
      top: centerY - 295,
      width: 140,
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#fff',
      textAlign: 'center',
      editable: true,
    });

    headerRects.push(rect);
    headerTexts.push(text);
  }

  // Perspectives
  const perspectives = ['Financiero', 'Clientes'];
  const perspectiveLabels = [];
  
  for (let p = 0; p < 2; p++) {
    // Add perspective label on the side
    const perspectiveText = new Textbox(perspectives[p], {
      left: centerX - 490,
      top: centerY - 230 + p * 320,
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

  // Create sticky notes for each category and perspective
  const stickyNotes = [];
  
  // Sample content for sticky notes
  const politicalItems = [
    "Aprovechar incentivos fiscales para reducir costos.",
    "Ajustar precios según impuestos tecnológicos.",
    "Invertir en cumplimiento de normativas para evitar multas.",
    "Evaluar impacto de regulaciones en nuevos mercados."
  ];
  
  const economicItems = [
    "Expansión a nuevos mercados internacionales.",
    "Aumento de la demanda en el sector objetivo.",
    "Programas gubernamentales de subsidio o apoyo.",
    "Tendencias hacia la digitalización que reducen costos."
  ];
  
  const stickyColors = ['#fef7cd', '#fde1d3', '#d3e4fd', '#e5deff', '#dcf9dd', '#ffdee2'];
  
  const allItems = [
    politicalItems,
    economicItems,
    politicalItems, // Using same items for demonstration
    economicItems,
    politicalItems,
    economicItems
  ];

  // Create sticky notes for each column (PESTEL) and row (perspective)
  for (let p = 0; p < 2; p++) { // For each perspective
    for (let col = 0; col < 6; col++) { // For each PESTEL column
      for (let i = 0; i < 2; i++) { // 2 notes per perspective-column
        const posY = -250 + p * 320 + i * 80;
        const posX = -460 + col * 166;
        
        const note = new Rect({
          left: centerX + posX,
          top: centerY + posY,
          width: 150,
          height: 70,
          fill: stickyColors[col],
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

        const noteText = new Textbox(allItems[col][i], {
          left: centerX + posX + 5,
          top: centerY + posY + 5,
          width: 140,
          fontSize: 11,
          fontFamily: 'Arial',
          fill: 'rgba(0,0,0,0.8)',
          editable: true,
        });
        
        const stickyGroup = new Group([note, noteText], {
          left: centerX + posX,
          top: centerY + posY,
          cornerSize: 6,
          transparentCorners: false,
          cornerColor: '#0075ff',
          borderColor: '#0075ff'
        });
        
        stickyNotes.push(stickyGroup);
      }
    }
  }

  // Add all elements to canvas
  fabricCanvas.add(mainSection);
  fabricCanvas.add(mainTitle);
  headerRects.forEach(rect => fabricCanvas.add(rect));
  headerTexts.forEach(text => fabricCanvas.add(text));
  perspectiveLabels.forEach(label => fabricCanvas.add(label));
  stickyNotes.forEach(note => fabricCanvas.add(note));

  // Make sure everything is rendered
  fabricCanvas.renderAll();
};
