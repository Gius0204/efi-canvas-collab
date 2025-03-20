import React, { useRef, useState, useEffect } from "react";
import {
  Canvas as FabricCanvas,
  Circle,
  Group,
  Line,
  Rect,
  Shadow,
  Textbox,
  Triangle,
} from "fabric";
import * as fabric from "fabric";
import CanvasToolbar from "./CanvasToolbar";
import { Minus, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TemplatePanel from "@/components/canvas/TemplatePanel";
import EficientisIntegrationPanel from "@/components/canvas/EficientisIntegrationPanel";
import { toast } from "sonner";
import { StickyNote } from "./graphicElements/StickyNote";

import { createCanvasElements } from "./templates/CanvasElements";
import { useLocation, useParams } from "react-router-dom";

import FodaWidgetComponent from "./widgets/FodaWidgetComponent";
import OkrsWidgetComponent from "./widgets/OkrsWidgetComponent";

import { createFodaTemplate } from "./templates/FodaTemplate";
import { createOkrsTemplate } from "./templates/OkrsTemplate";
import { createPestelTemplate } from "./templates/PestelTemplate";
import { createBscMapTemplate } from "./templates/BscMapTemplate";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState("");
  const [zoom, setZoom] = useState(1);
  const [showPenOptions, setShowPenOptions] = useState(false);
  const [showStickyOptions, setShowStickyOptions] = useState(false);
  const [showShapesOptions, setShowShapesOptions] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [showEficientisIntegration, setShowEficientisIntegration] =
    useState(false);

  const { id } = useParams(); // Captura el ID de la plantilla
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shouldLoadTemplate = searchParams.get("loadTemplate") === "true";

  const [showFodaWidget, setShowFodaWidget] = useState(false);
  const [showOkrWidget, setShowOkrWidget] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#f8f9fa",
      selection: true,
      preserveObjectStacking: true,
      fireRightClick: true,
      stopContextMenu: true,
    });

    const gridSize = 20;
    for (let i = 0; i < canvas.width! / gridSize; i++) {
      for (let j = 0; j < canvas.height! / gridSize; j++) {
        if ((i + j) % 2 === 0) {
          canvas.add(
            new Circle({
              left: i * gridSize,
              top: j * gridSize,
              radius: 1,
              fill: "#e0e0e0",
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
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };

    // Add mouse wheel zoom support
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY;
        let zoomLevel = canvas.getZoom();

        if (delta > 0) {
          zoomLevel = Math.max(0.3, zoomLevel - 0.05);
        } else {
          zoomLevel = Math.min(5, zoomLevel + 0.05);
        }

        setZoom(zoomLevel);
        canvas.setZoom(zoomLevel);
        canvas.renderAll();
      }
    };

    canvasRef.current.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // useEffect(() => {
  //   if (!fabricCanvas) return;
  //   createCanvasElements(fabricCanvas);
  // }, [fabricCanvas]);

  useEffect(() => {
    if (fabricCanvas && shouldLoadTemplate && id) {
      if (id == "foda") {
        //console.log(`Cargando plantilla con ID: ${id}`);
        toast.success(`Cargando plantilla ${id}`);
        createFodaTemplate(fabricCanvas);
      } else if (id == "okrs") {
        toast.success(`Cargando plantilla ${id}`);
        createOkrsTemplate(fabricCanvas);
      } else if (id == "pestel") {
        toast.success(`Cargando plantilla ${id}`);
        createPestelTemplate(fabricCanvas);
      } else if (id == "mapa") {
        toast.success(`Cargando plantilla ${id}`);
        createBscMapTemplate(fabricCanvas);
      }
    }
  }, [fabricCanvas, shouldLoadTemplate, id]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const handleDelete = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        const activeObject = fabricCanvas.getActiveObject();

        if (activeObject) {
          if ("getObjects" in activeObject) {
            const objects = (
              activeObject as fabric.ActiveSelection
            ).getObjects();
            objects.forEach((obj) => fabricCanvas.remove(obj));
          }

          // 🔥 Eliminar el propio objeto (ya sea individual o la selección completa)
          fabricCanvas.remove(activeObject);

          // 🔥 Limpiar la selección y actualizar el lienzo
          fabricCanvas.discardActiveObject();
          fabricCanvas.renderAll();
        }
      }
    };

    document.addEventListener("keydown", handleDelete);

    return () => {
      document.removeEventListener("keydown", handleDelete);
    };
  }, [fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const handleObjectModified = (event: fabric.ModifiedEvent) => {
      const obj = event.target;
      if (obj) {
        if (obj instanceof fabric.Textbox) {
          console.log("Texto movido:", obj.text);
          handleDropOnWidgetFoda(obj.text);
        } else if (obj instanceof fabric.Group) {
          const textElement = obj
            .getObjects()
            .find((o) => o instanceof fabric.Textbox) as fabric.Textbox;
          if (textElement) {
            console.log("Sticky Note movido:", textElement.text);
            handleDropOnWidgetFoda(textElement.text);
          }
        }
      }
    };

    fabricCanvas.on("object:modified", handleObjectModified);

    return () => {
      fabricCanvas.off("object:modified", handleObjectModified);
    };
  }, [fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = false;

    switch (activeTool) {
      case "sticky":
        // Do nothing - now handled by the sticky color selection
        break;
      case "circle":
        addCircle();
        break;
      case "square":
        addRectangle();
        break;
      case "triangle":
        addTriangle();
        break;
      case "arrow":
        addArrow();
        break;
      case "text":
        addText();
        break;
      case "section":
        addSection();
        break;
      case "template":
        handleShowTemplates();
        break;
      default:
        fabricCanvas.isDrawingMode = false;
    }
  }, [activeTool, fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = false;

    switch (activeTool) {
      case "pen":
      case "marker":
        fabricCanvas.isDrawingMode = true;

        if (!fabricCanvas.freeDrawingBrush) {
          fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
        }

        fabricCanvas.freeDrawingBrush.color = penColor; // 🔥 Aseguramos que el color cambia
        fabricCanvas.freeDrawingBrush.width = activeTool === "marker" ? 4 : 2;
        break;

      default:
        fabricCanvas.isDrawingMode = false;
    }
  }, [activeTool, fabricCanvas, penColor]); // 👈 Se ejecuta cuand

  const addStickyNote = (color: string) => {
    if (!fabricCanvas) return;

    new StickyNote(fabricCanvas, color);

    // const rect = new Rect({
    //   left: fabricCanvas.width! / 2 - 75,
    //   top: fabricCanvas.height! / 2 - 75,
    //   width: 150,
    //   height: 150,
    //   fill: color,
    //   stroke: 'rgba(0,0,0,0.1)',
    //   strokeWidth: 1,
    //   rx: 5,
    //   ry: 5,
    //   shadow: new Shadow({
    //     color: 'rgba(0,0,0,0.2)',
    //     blur: 5,
    //     offsetX: 2,
    //     offsetY: 2
    //   })
    // });

    // const text = new Textbox('Double click to edit', {
    //   left: fabricCanvas.width! / 2 - 65,
    //   top: fabricCanvas.height! / 2 - 65,
    //   width: 130,
    //   fontSize: 14,
    //   fontFamily: 'Arial',
    //   fill: 'rgba(0,0,0,0.7)',
    //   editable: true
    // });

    // const group = new Group([rect, text], {
    //   left: fabricCanvas.width! / 2 - 75,
    //   top: fabricCanvas.height! / 2 - 75,
    //   cornerSize: 8,
    //   transparentCorners: false,
    //   cornerColor: '#0075ff',
    //   borderColor: '#0075ff'
    // });

    // fabricCanvas.add(group);
    // fabricCanvas.setActiveObject(group);
    // fabricCanvas.renderAll();
  };

  const addCircle = () => {
    if (!fabricCanvas) return;

    const circle = new Circle({
      left: fabricCanvas.width! / 2 - 50,
      top: fabricCanvas.height! / 2 - 50,
      radius: 50,
      fill: "rgba(52, 152, 219, 0.5)",
      stroke: "#3498db",
      strokeWidth: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    fabricCanvas.add(circle);
    fabricCanvas.setActiveObject(circle);
    fabricCanvas.renderAll();

    setActiveTool("");
  };

  const addRectangle = () => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: fabricCanvas.width! / 2 - 50,
      top: fabricCanvas.height! / 2 - 50,
      width: 100,
      height: 100,
      fill: "rgba(46, 204, 113, 0.5)",
      stroke: "#2ecc71",
      strokeWidth: 2,
      rx: 2,
      ry: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    fabricCanvas.add(rect);
    fabricCanvas.setActiveObject(rect);
    fabricCanvas.renderAll();

    setActiveTool("");
  };

  const addTriangle = () => {
    if (!fabricCanvas) return;

    const triangle = new Triangle({
      left: fabricCanvas.width! / 2 - 50,
      top: fabricCanvas.height! / 2 - 50,
      width: 100,
      height: 100,
      fill: "rgba(230, 126, 34, 0.5)",
      stroke: "#e67e22",
      strokeWidth: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    fabricCanvas.add(triangle);
    fabricCanvas.setActiveObject(triangle);
    fabricCanvas.renderAll();

    setActiveTool("");
  };

  const addArrow = () => {
    if (!fabricCanvas) return;

    const line = new Line([50, 100, 200, 100], {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2,
      stroke: "#000",
      strokeWidth: 2,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    const triangle = new Triangle({
      left: fabricCanvas.width! / 2 + 90,
      top: fabricCanvas.height! / 2 - 5,
      width: 10,
      height: 10,
      fill: "#000",
      stroke: "#000",
      angle: 90,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    const group = new Group([line, triangle], {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2 - 5,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();

    setActiveTool("");
  };

  const addText = () => {
    if (!fabricCanvas) return;

    const text = new Textbox("Double click to edit text", {
      left: fabricCanvas.width! / 2 - 100,
      top: fabricCanvas.height! / 2 - 15,
      width: 200,
      fontSize: 20,
      fontFamily: "Arial",
      fill: "#000000",
      editable: true,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();

    setActiveTool("");
  };

  const addSection = () => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: fabricCanvas.width! / 2 - 150,
      top: fabricCanvas.height! / 2 - 100,
      width: 300,
      height: 200,
      fill: "rgba(240, 240, 240, 0.5)",
      stroke: "#cccccc",
      strokeWidth: 2,
      rx: 10,
      ry: 10,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    const text = new Textbox("Section Title", {
      left: fabricCanvas.width! / 2 - 140,
      top: fabricCanvas.height! / 2 - 90,
      width: 280,
      fontSize: 16,
      fontFamily: "Arial",
      fontWeight: "bold",
      fill: "#666666",
      editable: true,
    });

    const group = new Group([rect, text], {
      left: fabricCanvas.width! / 2 - 150,
      top: fabricCanvas.height! / 2 - 100,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();

    setActiveTool("");
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

  const handleStickyColorSelect = (color: string) => {
    addStickyNote(color);
    setShowStickyOptions(false);
    setActiveTool("");
  };

  const handleDropOnWidgetFoda = (text: string) => {
    console.log("Texto añadido al widget FODA:", text);
    window.dispatchEvent(new CustomEvent("fodaDrop", { detail: text }));
    // Aquí debes enviar el texto al widget FODA
  };

  const onShowEficientisIntegration = () => {
    // Pass this function up to the parent component
    // This will be handled by CanvasPage.tsx
    setShowEficientisIntegration(true);
  };

  const handleShowTemplates = () => {
    setShowTemplates(true);
  };

  const handleCloseTemplates = () => {
    setShowTemplates(false);
  };

  const handleCloseEficientisIntegration = () => {
    setShowEficientisIntegration(false);
  };

  const handleImportFromEficientis = () => {
    toast.success("Buscando e importando datos de Eficientis...");
    handleCloseEficientisIntegration();
  };

  const handleCreateBoardForEficientis = (type: string) => {
    // if (!fabricCanvas) return;

    // let widget;

    // if (type === "foda") {
    //   widget = new fabric.Textbox("FODA Widget", {
    //     left: 100,
    //     top: 100,
    //     width: 200,
    //     fontSize: 20,
    //     backgroundColor: "#f1c40f",
    //     editable: false,
    //   });
    // } else if (type === "okr") {
    //   widget = new fabric.Textbox("OKR Widget", {
    //     left: 300,
    //     top: 100,
    //     width: 200,
    //     fontSize: 20,
    //     backgroundColor: "#3498db",
    //     editable: false,
    //   });
    // }

    // if (widget) {
    //   fabricCanvas.add(widget);
    //   fabricCanvas.renderAll();
    // }
    toast.success("Creando nuevo board para Eficientis...");
    handleCloseEficientisIntegration();

    if (type === "foda") {
      setShowFodaWidget(true);
    } else if (type === "okr") {
      setShowOkrWidget(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="relative h-full w-full">
        <canvas ref={canvasRef} className="w-full h-full" />

        <CanvasToolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          showPenOptions={showPenOptions}
          setShowPenOptions={setShowPenOptions}
          showStickyOptions={showStickyOptions}
          setShowStickyOptions={setShowStickyOptions}
          showShapesOptions={showShapesOptions}
          setShowShapesOptions={setShowShapesOptions}
          onStickyColorSelect={handleStickyColorSelect}
          onShowEficientisIntegration={onShowEficientisIntegration}
          onShowTemplates={handleShowTemplates}
          penColor={penColor} // Pasamos el color actual del lápiz
          setPenColor={setPenColor} // Pasamos la función para cambiar el color
        />

        <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Zoom (Ctrl+Scroll to zoom)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="relative w-full h-full">
          {showFodaWidget && (
            <FodaWidgetComponent
              onClose={() => setShowFodaWidget(false)}
              onAddToCanvas={() => toast("Añadiendo FodaWidget")}
            />
          )}
          {showOkrWidget && (
            <OkrsWidgetComponent
              onClose={() => setShowOkrWidget(false)}
              onAddToCanvas={() => toast("Añadiendo OKRWidget")}
            />
          )}
        </div>

        {showTemplates && <TemplatePanel onClose={handleCloseTemplates} />}

        {showEficientisIntegration && (
          <EficientisIntegrationPanel
            onClose={handleCloseEficientisIntegration}
            onImport={handleImportFromEficientis}
            onCreateBoard={handleCreateBoardForEficientis}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default Canvas;
