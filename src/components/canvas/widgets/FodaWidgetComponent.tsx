import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Draggable from "react-draggable";

interface FodaItem {
  id: string;
  text: string;
  type: "fortaleza" | "oportunidad" | "debilidad" | "amenaza";
  perspective: string;
}

interface FodaWidgetComponentProps {
  onClose: () => void;
  onAddToCanvas: (widget: any) => void;
}

const FodaWidgetComponent: React.FC<FodaWidgetComponentProps> = ({
  onClose,
  onAddToCanvas,
}) => {
  const [perspectives, setPerspectives] = useState(["Financiero", "Clientes"]);
  const [items, setItems] = useState<FodaItem[]>([
    {
      id: "1",
      text: "Alta rentabilidad en los últimos 5 años.",
      type: "fortaleza",
      perspective: "Financiero",
    },
    {
      id: "2",
      text: "Expansión a nuevos mercados internacionales.",
      type: "oportunidad",
      perspective: "Financiero",
    },
    {
      id: "3",
      text: "Alta dependencia de un cliente o segmento específico.",
      type: "debilidad",
      perspective: "Financiero",
    },
    {
      id: "4",
      text: "Competencia con precios más bajos.",
      type: "amenaza",
      perspective: "Financiero",
    },
    {
      id: "5",
      text: "Alta dependencia de un cliente o segmento específico.",
      type: "debilidad",
      perspective: "Clientes",
    },
  ]);

  const [newItem, setNewItem] = useState("");
  const [newPerspective, setNewPerspective] = useState("");
  const [activeType, setActiveType] = useState<
    "fortaleza" | "oportunidad" | "debilidad" | "amenaza" | null
  >(null);
  const [activePerspective, setActivePerspective] =
    useState<string>("Financiero");

  const handleAddItem = () => {
    if (newItem && activeType) {
      setItems([
        ...items,
        {
          id: (items.length + 1).toString(),
          text: newItem,
          type: activeType,
          perspective: activePerspective,
        },
      ]);
      setNewItem("");
      setActiveType(null);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddPerspective = () => {
    if (newPerspective && !perspectives.includes(newPerspective)) {
      setPerspectives([...perspectives, newPerspective]);
      setNewPerspective("");
    }
  };

  const handleAddToCanvas = () => {
    onAddToCanvas({
      type: "foda-widget",
      perspectives,
      items,
    });
    onClose();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Obtener el texto arrastrado desde dataTransfer
    const droppedText = event.dataTransfer.getData("text/plain");

    if (droppedText && activeType) {
      setItems([
        ...items,
        {
          id: (items.length + 1).toString(),
          text: droppedText,
          type: activeType,
          perspective: activePerspective, // Se almacena en la perspectiva activa
        },
      ]);
    }
  };

  return (
    <Draggable>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()} // Permitir soltar elementos dentro del widget
      >
        <div className="bg-white rounded-lg shadow-lg w-auto max-w-5xl max-h-[90vh] overflow-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">FODA Widget</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-4">
              <div className="mb-4 flex items-center">
                <h3 className="text-md font-semibold mr-4">Perspectivas:</h3>
                <div className="flex flex-wrap gap-2">
                  {perspectives.map((p) => (
                    <div
                      key={p}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-md"
                    >
                      <span
                        className="text-sm cursor-pointer"
                        onClick={() => setActivePerspective(p)}
                      >
                        {p}
                      </span>
                      <button
                        onClick={() =>
                          setPerspectives(
                            perspectives.filter((persp) => persp !== p)
                          )
                        }
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Nueva perspectiva..."
                      className="border p-1 text-sm rounded-l-md w-40"
                      value={newPerspective}
                      onChange={(e) => setNewPerspective(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddPerspective()
                      }
                    />
                    <button
                      onClick={handleAddPerspective}
                      className="bg-primary text-white p-1 rounded-r-md"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <div className="bg-green-500 text-white p-2 font-bold text-center rounded-t-md">
                    Fortalezas
                  </div>
                  {items
                    .filter(
                      (item) =>
                        item.type === "fortaleza" &&
                        item.perspective === activePerspective
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-green-100 p-2 mb-2 rounded-md relative group"
                      >
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div
                          className="w-full min-h-[40px]"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            setItems(
                              items.map((i) =>
                                i.id === item.id
                                  ? {
                                      ...i,
                                      text: e.currentTarget.textContent || "",
                                    }
                                  : i
                              )
                            );
                          }}
                        >
                          {item.text}
                        </div>
                      </div>
                    ))}

                  <div className="mt-2">
                    <button
                      className="flex items-center justify-center w-full p-2 bg-green-100 hover:bg-green-200 rounded-md text-sm"
                      onClick={() => setActiveType("fortaleza")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Añadir Fortaleza
                    </button>
                  </div>
                </div>

                <div>
                  <div className="bg-blue-500 text-white p-2 font-bold text-center rounded-t-md">
                    Oportunidades
                  </div>
                  {items
                    .filter(
                      (item) =>
                        item.type === "oportunidad" &&
                        item.perspective === activePerspective
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-blue-100 p-2 mb-2 rounded-md relative group"
                      >
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div
                          className="w-full min-h-[40px]"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            setItems(
                              items.map((i) =>
                                i.id === item.id
                                  ? {
                                      ...i,
                                      text: e.currentTarget.textContent || "",
                                    }
                                  : i
                              )
                            );
                          }}
                        >
                          {item.text}
                        </div>
                      </div>
                    ))}

                  <div className="mt-2">
                    <button
                      className="flex items-center justify-center w-full p-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm"
                      onClick={() => setActiveType("oportunidad")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Añadir Oportunidad
                    </button>
                  </div>
                </div>

                <div>
                  <div className="bg-yellow-500 text-white p-2 font-bold text-center rounded-t-md">
                    Debilidades
                  </div>
                  {items
                    .filter(
                      (item) =>
                        item.type === "debilidad" &&
                        item.perspective === activePerspective
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-yellow-100 p-2 mb-2 rounded-md relative group"
                      >
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div
                          className="w-full min-h-[40px]"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            setItems(
                              items.map((i) =>
                                i.id === item.id
                                  ? {
                                      ...i,
                                      text: e.currentTarget.textContent || "",
                                    }
                                  : i
                              )
                            );
                          }}
                        >
                          {item.text}
                        </div>
                      </div>
                    ))}

                  <div className="mt-2">
                    <button
                      className="flex items-center justify-center w-full p-2 bg-yellow-100 hover:bg-yellow-200 rounded-md text-sm"
                      onClick={() => setActiveType("debilidad")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Añadir Debilidad
                    </button>
                  </div>
                </div>

                <div>
                  <div className="bg-red-500 text-white p-2 font-bold text-center rounded-t-md">
                    Amenazas
                  </div>
                  {items
                    .filter(
                      (item) =>
                        item.type === "amenaza" &&
                        item.perspective === activePerspective
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-red-100 p-2 mb-2 rounded-md relative group"
                      >
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div
                          className="w-full min-h-[40px]"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            setItems(
                              items.map((i) =>
                                i.id === item.id
                                  ? {
                                      ...i,
                                      text: e.currentTarget.textContent || "",
                                    }
                                  : i
                              )
                            );
                          }}
                        >
                          {item.text}
                        </div>
                      </div>
                    ))}

                  <div className="mt-2">
                    <button
                      className="flex items-center justify-center w-full p-2 bg-red-100 hover:bg-red-200 rounded-md text-sm"
                      onClick={() => setActiveType("amenaza")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Añadir Amenaza
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {activeType && (
              <div className="mb-4 p-3 border rounded-md bg-gray-50">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-md font-medium">
                    Añadir{" "}
                    {activeType === "fortaleza"
                      ? "Fortaleza"
                      : activeType === "oportunidad"
                      ? "Oportunidad"
                      : activeType === "debilidad"
                      ? "Debilidad"
                      : "Amenaza"}{" "}
                    en {activePerspective}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveType(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <textarea
                  className="w-full border rounded-md p-2 resize-none"
                  rows={3}
                  placeholder="Escriba el texto aquí..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleAddItem()
                  }
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={handleAddItem}>Añadir</Button>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleAddToCanvas}>Añadir al lienzo</Button>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FodaWidgetComponent;
