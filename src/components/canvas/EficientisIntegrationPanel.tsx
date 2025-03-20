import React, { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EficientisIntegrationPanelProps {
  onClose: () => void;
  onImport: () => void;
  onCreateBoard: (type: string) => void;
}

const EficientisIntegrationPanel: React.FC<EficientisIntegrationPanelProps> = ({
  onClose,
  onImport,
  onCreateBoard,
}) => {
  const [showWidgetMenu, setShowWidgetMenu] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);

  return (
    <div className="absolute bottom-20 right-20 z-40 bg-white rounded-lg shadow-lg w-72">
      <div className="p-4">
        {showMainMenu ? (
          // 🔹 MENU PRINCIPAL (Vista por defecto)
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Boards para Eficientis</h2>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <button
                onClick={onImport}
                className="w-full flex items-center p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
              >
                <Upload className="h-5 w-5 mr-2" />
                <div>
                  <div className="font-medium text-sm">
                    Importar de Eficientis
                  </div>
                  <div className="text-xs text-gray-500">
                    Encontrar e importar de Eficientis
                  </div>
                </div>
              </button>

              <button
                onClick={() => setShowMainMenu(false)} //oncreateboard
                className="w-full flex items-center p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                <div>
                  <div className="font-medium text-sm">
                    Nuevo Board para Eficientis
                  </div>
                  <div className="text-xs text-gray-500">
                    Crear y añadir a Eficientis
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          // 🔹 MENU SECUNDARIO (Selección de widgets)
          <>
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => setShowMainMenu(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <h2 className="text-sm font-semibold">Seleccionar Widget</h2>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onCreateBoard("foda");
                  setShowMainMenu(false);
                }}
                className="w-full flex items-center p-3 text-left rounded-md hover:bg-gray-50 transition-colors"
              >
                <Upload className="h-5 w-5 mr-2" />
                <div>
                  <div className="font-medium text-sm">FODA</div>
                  <div className="text-xs text-gray-500">
                    Agregar widget FODA al canvas
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  onCreateBoard("okr");
                  setShowMainMenu(false);
                }}
                className="w-full flex items-center p-3 text-left rounded-md hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                <div>
                  <div className="font-medium text-sm">OKR</div>
                  <div className="text-xs text-gray-500">
                    Agregar widget OKR al canvas
                  </div>
                </div>
              </button>
            </div>
          </>
        )}

        {/* {showWidgetMenu && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md border p-2">
          <button
            onClick={() => {
              onCreateBoard("foda");
              setShowWidgetMenu(false);
            }}
            className="w-full flex items-center p-3 text-left rounded-md hover:bg-gray-50 transition-colors"
          >
            <Upload className="h-5 w-5 mr-2" />
            <div>
              <div className="font-medium text-sm">Importar FODA</div>
              <div className="text-xs text-gray-500">
                Agregar widget FODA al canvas
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              onCreateBoard("okr");
              setShowWidgetMenu(false);
            }}
            className="w-full flex items-center p-3 text-left rounded-md hover:bg-gray-50 transition-colors"
          >
            <Upload className="h-5 w-5 mr-2" />
            <div>
              <div className="font-medium text-sm">Importar OKR</div>
              <div className="text-xs text-gray-500">
                Agregar widget OKR al canvas
              </div>
            </div>
          </button>
        </div>
      )} */}
      </div>
    </div>
  );
};

export default EficientisIntegrationPanel;
