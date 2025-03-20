import { Canvas, Rect, Textbox, Group } from "fabric";

export const createCanvasElements = (fabricCanvas: Canvas) => {
  if (!fabricCanvas) return;

  // Sticky Note
  const stickyRect = new Rect({
    width: 150,
    height: 150,
    fill: "#f1c40f",
    rx: 5,
    ry: 5,
    cornerSize: 8,
    stroke: "rgba(0,0,0,0.1)",
    strokeWidth: 1,
  });

  const stickyText = new Textbox("Sticky Note", {
    width: 130,
    fontSize: 14,
    fontFamily: "Arial",
    fill: "#333",
    editable: true,
  });

  const stickyGroup = new Group([stickyRect, stickyText], {
    left: 100,
    top: 100,
    cornerSize: 8,
    transparentCorners: false,
    cornerColor: "#0075ff",
    borderColor: "#0075ff",
  });

  // Rectángulo con texto
  const sectionRect = new Rect({
    width: 300,
    height: 200,
    fill: "#ecf0f1",
    rx: 10,
    ry: 10,
    cornerSize: 8,
    stroke: "#cccccc",
    strokeWidth: 2,
  });

  const sectionText = new Textbox("Editable Section", {
    width: 280,
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "bold",
    fill: "#666",
    editable: true,
  });

  const sectionGroup = new Group([sectionRect, sectionText], {
    left: 300,
    top: 200,
    cornerSize: 8,
    transparentCorners: false,
    cornerColor: "#0075ff",
    borderColor: "#0075ff",
  });

  // Agregar elementos al canvas
  fabricCanvas.add(stickyGroup, sectionGroup);
  fabricCanvas.renderAll();
};
