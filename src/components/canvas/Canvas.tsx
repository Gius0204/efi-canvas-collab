
import React, { useRef, useState, useEffect } from 'react';
import { Canvas as FabricCanvas, Circle, Group, Line, Rect, Shadow, TextBox, Triangle } from 'fabric';
import CanvasToolbar from './CanvasToolbar';
import { Minus, Plus } from 'lucide-react';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState('');
  const [zoom, setZoom] = useState(1);
  const [showPenOptions, setShowPenOptions] = useState(false);
  const [showStickyOptions, setShowStickyOptions] = useState(false);
  const [showShapesOptions, setShowShapesOptions] = useState(false);

  // Initialize fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight - 60, // Adjust for header
      backgroundColor: '#f8f9fa',
      selection: true,
      preserveObjectStacking: true,
      fireRightClick: true,
      stopContextMenu: true,
    });

    // Add grid pattern
    const gridSize = 20;
    for (let i = 0; i < canvas.width! / gridSize; i++) {
      for (let j = 0; j < canvas.height! / gridSize; j++) {
        if ((i + j) % 2 === 0) {
          canvas.add(
            new Circle({
              left: i * gridSize,
              top: j * gridSize,
              radius: 1,
              fill: '#e0e0e0',
              selectable: false,
              evented: false,
            })
          );
        }
      }
    }

    setFabricCanvas(canvas);

    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight - 60);
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle tool changes
  useEffect(() => {
    if (!fabricCanvas) return;

    // Reset canvas drawing mode
    fabricCanvas.isDrawingMode = false;

    switch (activeTool) {
      case 'pen':
      case 'marker':
        fabricCanvas.isDrawingMode = true;
        fabricCanvas.freeDrawingBrush.width = 2;
        fabricCanvas.freeDrawingBrush.color = '#000000';
        break;
      case 'eraser':
        fabricCanvas.isDrawingMode = true;
        fabricCanvas.freeDrawingBrush.width = 10;
        fabricCanvas.freeDrawingBrush.color = fabricCanvas.backgroundColor as string;
        break;
      case 'sticky':
        addStickyNote('#f1c40f');
        break;
      case 'circle':
        addCircle();
        break;
      case 'square':
        addRectangle();
        break;
      case 'triangle':
        addTriangle();
        break;
      case 'arrow':
        addArrow();
        break;
      case 'text':
        addText();
        break;
      case 'section':
        addSection();
        break;
    }
  }, [activeTool, fabricCanvas]);

  const addStickyNote = (color: string) => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: fabricCanvas.width! / 2 - 75,
      top: fabricCanvas.height! / 2 - 75,
      width: 150,
      height: 150,
      fill: color,
      stroke: 'rgba(0,0,0,0.1)',
      strokeWidth: 1,
      rx: 5,
      ry: 5,
      shadow: new Shadow({
        color: 'rgba(0,0,0,0.2)',
        blur: 5,
        offsetX: 2,
        offsetY: 2
      })
    });

    const text = new TextBox('Double click to edit', {
      left: fabricCanvas.width! / 2 - 65,
      top: fabricCanvas.height! / 2 - 65,
      width: 130,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: 'rgba(0,0,0,0.7)',
      editable: true
    });

    const group = new Group([rect, text], {
      left: fabricCanvas.width! / 2 - 75,
      top: fabricCanvas.height! / 2 - 75,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const addCircle = () => {
    if (!fabricCanvas) return;

    const circle = new Circle({
      left: fabricCanvas.width! / 2 - 50,
      top: fabricCanvas.height! / 2 - 50,
      radius: 50,
      fill: 'rgba(52, 152, 219, 0.5)',
      stroke: '#3498db',
      strokeWidth: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(circle);
    fabricCanvas.setActiveObject(circle);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const addRectangle = () => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: fabricCanvas.width! / 2 - 50,
      top: fabricCanvas.height! / 2 - 50,
      width: 100,
      height: 100,
      fill: 'rgba(46, 204, 113, 0.5)',
      stroke: '#2ecc71',
      strokeWidth: 2,
      rx: 2,
      ry: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(rect);
    fabricCanvas.setActiveObject(rect);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const addTriangle = () => {
    if (!fabricCanvas) return;

    const triangle = new Triangle({
      left: fabricCanvas.width! / 2 - 50,
      top: fabricCanvas.height! / 2 - 50,
      width: 100,
      height: 100,
      fill: 'rgba(230, 126, 34, 0.5)',
      stroke: '#e67e22',
      strokeWidth: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(triangle);
    fabricCanvas.setActiveObject(triangle);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const addArrow = () => {
    if (!fabricCanvas) return;

    const line = new Line([50, 100, 200, 100], {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2,
      stroke: '#000',
      strokeWidth: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    const triangle = new Triangle({
      left: fabricCanvas.width! / 2 + 90,
      top: fabricCanvas.height! / 2 - 5,
      width: 10,
      height: 10,
      fill: '#000',
      stroke: '#000',
      angle: 90,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    const group = new Group([line, triangle], {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2 - 5,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const addText = () => {
    if (!fabricCanvas) return;

    const text = new TextBox('Double click to edit text', {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2 - 15,
      width: 200,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#000000',
      editable: true,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const addSection = () => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: fabricCanvas.width! / 2 - 150,
      top: fabricCanvas.height! / 2 - 100,
      width: 300,
      height: 200,
      fill: 'rgba(240, 240, 240, 0.5)',
      stroke: '#cccccc',
      strokeWidth: 2,
      rx: 10,
      ry: 10,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    const text = new TextBox('Section Title', {
      left: fabricCanvas.width! / 2 - 140,
      top: fabricCanvas.height! / 2 - 90,
      width: 280,
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#666666',
      editable: true
    });

    const group = new Group([rect, text], {
      left: fabricCanvas.width! / 2 - 150,
      top: fabricCanvas.height! / 2 - 100,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0075ff',
      borderColor: '#0075ff'
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
    
    // Reset active tool after adding
    setActiveTool('');
  };

  const handleZoomIn = () => {
    if (zoom < 5) {
      const newZoom = zoom + 0.1;
      setZoom(newZoom);
      if (fabricCanvas) {
        fabricCanvas.setZoom(newZoom);
        fabricCanvas.renderAll();
      }
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.3) {
      const newZoom = zoom - 0.1;
      setZoom(newZoom);
      if (fabricCanvas) {
        fabricCanvas.setZoom(newZoom);
        fabricCanvas.renderAll();
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
      
      <CanvasToolbar 
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        showPenOptions={showPenOptions}
        setShowPenOptions={setShowPenOptions}
        showStickyOptions={showStickyOptions}
        setShowStickyOptions={setShowStickyOptions}
        showShapesOptions={showShapesOptions}
        setShowShapesOptions={setShowShapesOptions}
      />
      
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
        <div className="bg-white rounded-md shadow-md p-2 flex flex-col items-center">
          <button 
            onClick={handleZoomIn}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <Plus className="h-5 w-5" />
          </button>
          <div className="my-1 text-sm font-medium">
            {Math.round(zoom * 100)}%
          </div>
          <button 
            onClick={handleZoomOut}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
