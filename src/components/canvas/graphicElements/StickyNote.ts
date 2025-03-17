import * as fabric from "fabric";

export class StickyNote {
  canvas: fabric.Canvas;
  group: fabric.Group;
  text: fabric.Textbox;
  rect: fabric.Rect;

  constructor(
    canvas: fabric.Canvas,
    color: string,
    textContent: string = "Double click to edit"
  ) {
    this.canvas = canvas;

    // Crear rectángulo
    this.rect = new fabric.Rect({
      width: 150,
      height: 150,
      fill: color,
      stroke: "rgba(0,0,0,0.1)",
      strokeWidth: 1,
      rx: 5,
      ry: 5,
      shadow: new fabric.Shadow({
        color: "rgba(0,0,0,0.2)",
        blur: 5,
        offsetX: 2,
        offsetY: 2,
      }),
    });

    // Crear caja de texto
    this.text = new fabric.Textbox(textContent, {
      width: 130,
      fontSize: 14,
      fontFamily: "Arial",
      fill: "rgba(0,0,0,0.7)",
      editable: true,
      textAlign: "center",
      backgroundColor: "transparent",
      evented: true, // Permite que capture eventos
    });

    // Agrupar elementos
    this.group = new fabric.Group([this.rect, this.text], {
      left: canvas.width! / 2 - 75,
      top: canvas.height! / 2 - 75,
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: "#0075ff",
      borderColor: "#0075ff",
      subTargetCheck: true, // Permite detectar clics dentro del grupo
    });

    // Ajustar posición del texto dentro del rectángulo
    this.updateTextPosition();

    // Permitir doble clic para editar el texto directamente sin desagrupar
    this.text.on("mousedblclick", (event) => {
      if (event.e.detail) {
        this.text.enterEditing();
        //this.text.selectAll();
      }
    });

    // Agregar al canvas
    this.canvas.add(this.group);
    this.canvas.setActiveObject(this.group);
    this.canvas.renderAll();
  }

  private updateTextPosition() {
    this.text.set({
      left: this.rect.left! + 10,
      top: this.rect.top! + 10,
    });
  }

  setText(newText: string) {
    this.text.set("text", newText);
    this.canvas.renderAll();
  }
}
