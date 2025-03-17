
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Rect, Textbox, Group, TEvent, Shadow } from 'fabric';
import { createFodaTemplate } from './templates/FodaTemplate';
import { createOkrsTemplate } from './templates/OkrsTemplate';
import { createPestelTemplate } from './templates/PestelTemplate';
import { createBscMapTemplate } from './templates/BscMapTemplate';
import { useParams } from 'react-router-dom';
import FodaWidget from './widgets/FodaWidget';
import OkrWidget from './widgets/OkrWidget';
import { toast } from 'sonner';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [showFodaWidget, setShowFodaWidget] = useState(false);
  const [showOkrWidget, setShowOkrWidget] = useState(false);
  const { id } = useParams<{ id: string }>();

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight - 64, // Subtract header height
      backgroundColor: '#f5f5f5',
      selection: true,
      preserveObjectStacking: true,
    });
    
    setFabricCanvas(canvas);
    
    // Canvas resize handler
    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 64,
      });
      canvas.renderAll();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set up text editing on double click
    canvas.on('mouse:dblclick', (options: TEvent) => {
      if (!options.target) return;
      
      if (options.target.type === 'textbox') {
        // It's already a textbox, just enable editing
        const textbox = options.target as Textbox;
        textbox.enterEditing();
        textbox.selectAll();
      } else if (options.target.type === 'group') {
        // Find any textbox within the group and enable editing
        const group = options.target as Group;
        const textbox = group.getObjects().find(obj => obj.type === 'textbox') as Textbox | undefined;
        
        if (textbox) {
          textbox.enterEditing();
          textbox.selectAll();
        }
      }
    });
    
    // Load template if specified in URL
    if (id && id.startsWith('template/')) {
      const templateId = id.split('/')[1];
      loadTemplate(templateId, canvas);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [id]);
  
  // Function to load template based on ID
  const loadTemplate = (templateId: string, canvas: FabricCanvas) => {
    switch (templateId) {
      case 'foda':
        createFodaTemplate(canvas);
        break;
      case 'okrs':
        createOkrsTemplate(canvas);
        break;
      case 'pestel':
        createPestelTemplate(canvas);
        break;
      case 'mapa':
        createBscMapTemplate(canvas);
        break;
      default:
        console.warn(`Unknown template ID: ${templateId}`);
    }
  };

  // Function to add a widget to canvas
  const handleAddWidget = (widgetType: string) => {
    switch (widgetType) {
      case 'foda-widget':
        setShowFodaWidget(true);
        break;
      case 'okrs-widget':
        setShowOkrWidget(true);
        break;
      default:
        console.warn(`Unknown widget type: ${widgetType}`);
    }
  };

  // Function to create widget on canvas from FodaWidgetComponent
  const handleCreateFodaWidget = (data: any) => {
    if (!fabricCanvas) return;
    
    setShowFodaWidget(false);
    
    const centerX = fabricCanvas.width! / 2;
    const centerY = fabricCanvas.height! / 2;
    
    // Create main container
    const mainContainer = new Rect({
      left: centerX - 400,
      top: centerY - 250,
      width: 800,
      height: 500,
      fill: '#ffffff',
      stroke: '#dddddd',
      strokeWidth: 1,
      rx: 5,
      ry: 5,
      shadow: new Shadow({
        color: 'rgba(0,0,0,0.1)',
        blur: 5,
        offsetX: 0,
        offsetY: 2
      })
    });
    
    fabricCanvas.add(mainContainer);
    
    // Create headers for FODA
    const colors = ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c'];
    const titles = ['Fortalezas', 'Oportunidades', 'Debilidades', 'Amenazas'];
    
    for (let i = 0; i < 4; i++) {
      const header = new Rect({
        left: centerX - 375 + i * 190,
        top: centerY - 230,
        width: 180,
        height: 40,
        fill: colors[i],
        rx: 3,
        ry: 3,
      });
      
      const text = new Textbox(titles[i], {
        left: centerX - 365 + i * 190,
        top: centerY - 220,
        width: 160,
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        editable: true,
      });
      
      fabricCanvas.add(header);
      fabricCanvas.add(text);
    }
    
    // Add perspective column
    const perspectiveText = new Textbox('Financiero', {
      left: centerX - 390,
      top: centerY - 160,
      width: 100,
      fontSize: 14,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#333',
      angle: 270,
      editable: true,
    });
    
    fabricCanvas.add(perspectiveText);
    
    // Add items from data
    data.items.forEach((item: any) => {
      if (item.perspective !== data.perspectives[0]) return;
      
      let colIndex = 0;
      switch (item.type) {
        case 'fortaleza': colIndex = 0; break;
        case 'oportunidad': colIndex = 1; break;
        case 'debilidad': colIndex = 2; break;
        case 'amenaza': colIndex = 3; break;
      }
      
      const stickyColors = ['#dcf9dd', '#d3e4fd', '#fef7cd', '#ffdee2'];
      
      const note = new Rect({
        left: centerX - 375 + colIndex * 190,
        top: centerY - 160,
        width: 180,
        height: 70,
        fill: stickyColors[colIndex],
        stroke: 'rgba(0,0,0,0.05)',
        strokeWidth: 1,
        rx: 2,
        ry: 2,
        shadow: new Shadow({
          color: 'rgba(0,0,0,0.1)',
          blur: 3,
          offsetX: 1,
          offsetY: 1
        })
      });
      
      const noteText = new Textbox(item.text, {
        left: centerX - 370 + colIndex * 190,
        top: centerY - 155,
        width: 170,
        fontSize: 12,
        fontFamily: 'Arial',
        fill: 'rgba(0,0,0,0.8)',
        editable: true,
      });
      
      const stickyGroup = new Group([note, noteText], {
        left: centerX - 375 + colIndex * 190,
        top: centerY - 160,
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: '#0075ff',
        borderColor: '#0075ff'
      });
      
      fabricCanvas.add(stickyGroup);
    });
    
    fabricCanvas.renderAll();
    toast.success('Widget FODA añadido al lienzo');
  };
  
  // Function to create widget on canvas from OkrWidgetComponent
  const handleCreateOkrWidget = (data: any) => {
    if (!fabricCanvas) return;
    
    setShowOkrWidget(false);
    
    const centerX = fabricCanvas.width! / 2;
    const centerY = fabricCanvas.height! / 2;
    
    // Create main container
    const mainContainer = new Rect({
      left: centerX - 350,
      top: centerY - 200,
      width: 700,
      height: 400,
      fill: '#ffffff',
      stroke: '#dddddd',
      strokeWidth: 1,
      rx: 5,
      ry: 5,
      shadow: new Shadow({
        color: 'rgba(0,0,0,0.1)',
        blur: 5,
        offsetX: 0,
        offsetY: 2
      })
    });
    
    fabricCanvas.add(mainContainer);
    
    // Add objective
    if (data.objective) {
      const objectiveCircle = new Rect({
        left: centerX - 330,
        top: centerY - 180,
        width: 660,
        height: 60,
        fill: '#dcf9dd',
        rx: 30,
        ry: 30,
        shadow: new Shadow({
          color: 'rgba(0,0,0,0.1)',
          blur: 3,
          offsetX: 0,
          offsetY: 1
        })
      });
      
      const objectiveText = new Textbox(data.objective, {
        left: centerX - 320,
        top: centerY - 170,
        width: 640,
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#333333',
        editable: true,
      });
      
      const objectiveGroup = new Group([objectiveCircle, objectiveText], {
        left: centerX - 330,
        top: centerY - 180,
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: '#0075ff',
        borderColor: '#0075ff'
      });
      
      fabricCanvas.add(objectiveGroup);
    }
    
    // Add key results
    data.keyResults.forEach((kr: string, index: number) => {
      if (!kr) return;
      
      const krRect = new Rect({
        left: centerX - 330,
        top: centerY - 100 + index * 70,
        width: 330,
        height: 60,
        fill: '#d3e4fd',
        rx: 5,
        ry: 5,
        shadow: new Shadow({
          color: 'rgba(0,0,0,0.1)',
          blur: 3,
          offsetX: 0,
          offsetY: 1
        })
      });
      
      const krText = new Textbox(kr, {
        left: centerX - 320,
        top: centerY - 90 + index * 70,
        width: 310,
        fontSize: 12,
        fontFamily: 'Arial',
        fill: '#333333',
        editable: true,
      });
      
      const krGroup = new Group([krRect, krText], {
        left: centerX - 330,
        top: centerY - 100 + index * 70,
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: '#0075ff',
        borderColor: '#0075ff'
      });
      
      fabricCanvas.add(krGroup);
    });
    
    // Add initiatives
    data.initiatives.forEach((initiative: string, index: number) => {
      if (!initiative) return;
      
      const initiativeRect = new Rect({
        left: centerX + 20,
        top: centerY - 100 + index * 70,
        width: 310,
        height: 60,
        fill: '#fef7cd',
        rx: 5,
        ry: 5,
        shadow: new Shadow({
          color: 'rgba(0,0,0,0.1)',
          blur: 3,
          offsetX: 0,
          offsetY: 1
        })
      });
      
      const initiativeText = new Textbox(initiative, {
        left: centerX + 30,
        top: centerY - 90 + index * 70,
        width: 290,
        fontSize: 12,
        fontFamily: 'Arial',
        fill: '#333333',
        editable: true,
      });
      
      const initiativeGroup = new Group([initiativeRect, initiativeText], {
        left: centerX + 20,
        top: centerY - 100 + index * 70,
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: '#0075ff',
        borderColor: '#0075ff'
      });
      
      fabricCanvas.add(initiativeGroup);
    });
    
    fabricCanvas.renderAll();
    toast.success('Widget OKRs añadido al lienzo');
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {showFodaWidget && (
        <FodaWidget 
          onClose={() => setShowFodaWidget(false)}
          onAddToCanvas={handleCreateFodaWidget}
        />
      )}
      
      {showOkrWidget && (
        <OkrWidget
          onClose={() => setShowOkrWidget(false)} 
          onAddToCanvas={handleCreateOkrWidget}
        />
      )}
    </div>
  );
};

export default Canvas;
