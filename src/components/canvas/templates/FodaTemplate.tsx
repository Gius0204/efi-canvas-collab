
import React from 'react';
import { Group, Rect, Textbox } from 'fabric';
import * as fabric from 'fabric';

// Function to create FODA (SWOT) template
export const createFodaTemplate = (fabricCanvas: fabric.Canvas) => {
  if (!fabricCanvas) return;

  const canvasWidth = fabricCanvas.width || 1000;
  const canvasHeight = fabricCanvas.height || 800;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Create main section
  const mainSection = new Rect({
    left: centerX - 450,
    top: centerY - 350,
    width: 900,
    height: 700,
    fill: 'rgba(248, 249, 250, 0.5)',
    stroke: '#cccccc',
    strokeWidth: 1,
    rx: 10,
    ry: 10,
  });

  // Main title
  const mainTitle = new Textbox('FODA AREA MARKETING', {
    left: centerX - 440,
    top: centerY - 340,
    width: 300,
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#333',
    editable: true,
  });

  // Header rectangles
  const colors = ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c'];
  const titles = ['Fortalezas', 'Oportunidades', 'Debilidades', 'Amenazas'];
  const headerRects = [];
  const headerTexts = [];

  for (let i = 0; i < 4; i++) {
    const rect = new Rect({
      left: centerX - 425 + i * 230,
      top: centerY - 300,
      width: 220,
      height: 40,
      fill: colors[i],
      rx: 2,
      ry: 2,
    });

    const text = new Textbox(titles[i], {
      left: centerX - 415 + i * 230,
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

  // Section headers for Financial perspective
  const perspectives = ['Financiero', 'Clientes', 'Procesos', 'Aprendizaje'];
  const sectionTitles = perspectives.map(p => ['Fortalezas ' + p, 'Oportunidades ' + p, 'Debilidades ' + p, 'Amenazas ' + p]);
  const sectionHeaders = [];
  
  // Add perspective label on the side
  const perspectiveText = new Textbox('Financiero', {
    left: centerX - 440,
    top: centerY - 230,
    width: 100,
    fontSize: 14,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: '#333',
    angle: 270,
    editable: true,
  });

  // Create section headers
  for (let i = 0; i < 4; i++) {
    const header = new Textbox(sectionTitles[0][i], {
      left: centerX - 415 + i * 230,
      top: centerY - 250,
      width: 200,
      fontSize: 12,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#333',
      backgroundColor: '#f5f5f5',
      padding: 5,
      editable: true,
    });
    sectionHeaders.push(header);
  }

  // Create sticky notes
  const stickyNotes = [];
  const stickyCopy = [
    ['Alta rentabilidad en los últimos 5 años.', 'Eficiencia en la gestión de costos operativos.', 'Diversificación de fuentes de ingresos.', 'Acceso a financiamiento con tasas competitivas.'],
    ['Expansión a nuevos mercados internacionales.', 'Aumento de la demanda en el sector objetivo.', 'Programas gubernamentales de subsidio o apoyo.', 'Tendencias hacia la digitalización que reducen costos.'],
    ['Alta dependencia de un cliente o segmento específico.', 'Estructura de costos fijos elevada.', 'Falta de diversificación en líneas de productos.', 'Liquidez limitada frente a emergencias.'],
    ['Incremento en costos de materias primas.', 'Cambios en las políticas fiscales que afectan impuestos.', 'Competencia con precios más bajos.', 'Riesgo de fluctuación en el tipo de cambio.']
  ];

  const stickyColors = ['#dcf9dd', '#d3e4fd', '#fef7cd', '#ffdee2'];

  for (let col = 0; col < 4; col++) {
    for (let i = 0; i < 4; i++) {
      const posY = i % 2 === 0 ? -200 + (i * 80) : -200 + (i * 80);
      const posX = col % 2 === 0 ? -400 + (col * 230) : -400 + (col * 230);
      
      const note = new Rect({
        left: centerX + posX,
        top: centerY + posY,
        width: 180,
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

      const noteText = new Textbox(stickyCopy[col][i], {
        left: centerX + posX + 5,
        top: centerY + posY + 5,
        width: 170,
        fontSize: 12,
        fontFamily: 'Arial',
        fill: 'rgba(0,0,0,0.8)',
        editable: true,
      });
      
      // Group the sticky note and its text
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

  // Add all elements to canvas
  fabricCanvas.add(mainSection);
  fabricCanvas.add(mainTitle);
  headerRects.forEach(rect => fabricCanvas.add(rect));
  headerTexts.forEach(text => fabricCanvas.add(text));
  fabricCanvas.add(perspectiveText);
  sectionHeaders.forEach(header => fabricCanvas.add(header));
  stickyNotes.forEach(note => fabricCanvas.add(note));

  // Make sure everything is rendered
  fabricCanvas.renderAll();
};
