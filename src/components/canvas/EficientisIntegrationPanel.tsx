
import React from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EficientisIntegrationPanelProps {
  onClose: () => void;
  onImport: () => void;
  onCreateBoard: () => void;
}

const EficientisIntegrationPanel: React.FC<EficientisIntegrationPanelProps> = ({
  onClose,
  onImport,
  onCreateBoard
}) => {
  return (
    <div className="absolute bottom-20 right-20 z-40 bg-white rounded-lg shadow-lg w-72">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Boards para Eficientis</h2>
          <Button variant="ghost" size="icon" className="w-6 h-6" onClick={onClose}>
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
              <div className="font-medium text-sm">Importar de Eficientis</div>
              <div className="text-xs text-gray-500">Encontrar e importar de Eficientis</div>
            </div>
          </button>
          
          <button 
            onClick={onCreateBoard}
            className="w-full flex items-center p-3 text-left border rounded-md hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            <div>
              <div className="font-medium text-sm">Nuevo Board para Eficientis</div>
              <div className="text-xs text-gray-500">Crear y añadir a Eficientis</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EficientisIntegrationPanel;
