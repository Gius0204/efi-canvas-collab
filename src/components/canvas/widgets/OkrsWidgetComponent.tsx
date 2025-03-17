
import React, { useState } from 'react';
import { X, Plus, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';

interface OkrsWidgetComponentProps {
  onClose: () => void;
  onAddToCanvas: (widget: any) => void;
}

const OkrsWidgetComponent: React.FC<OkrsWidgetComponentProps> = ({ onClose, onAddToCanvas }) => {
  const [objective, setObjective] = useState('Optimizar la gestión financiera para mejorar la rentabilidad y sostenibilidad de la empresa.');
  const [keyResults, setKeyResults] = useState([
    'Reducir los costos operativos en un 15%',
    'Disminuir en un 30% los errores en reportes financieros',
    ''
  ]);
  const [initiatives, setInitiatives] = useState([
    'Implementar un software de gestión financiera.',
    ''
  ]);
  
  const [isObjectiveEditing, setIsObjectiveEditing] = useState(false);
  
  const handleAddKeyResult = () => {
    setKeyResults([...keyResults, '']);
  };
  
  const handleUpdateKeyResult = (index: number, value: string) => {
    const newKeyResults = [...keyResults];
    newKeyResults[index] = value;
    setKeyResults(newKeyResults);
  };
  
  const handleRemoveKeyResult = (index: number) => {
    setKeyResults(keyResults.filter((_, i) => i !== index));
  };
  
  const handleAddInitiative = () => {
    setInitiatives([...initiatives, '']);
  };
  
  const handleUpdateInitiative = (index: number, value: string) => {
    const newInitiatives = [...initiatives];
    newInitiatives[index] = value;
    setInitiatives(newInitiatives);
  };
  
  const handleRemoveInitiative = (index: number) => {
    setInitiatives(initiatives.filter((_, i) => i !== index));
  };
  
  const handleCreateWidget = () => {
    // Filter out empty items
    const filteredKeyResults = keyResults.filter(kr => kr.trim() !== '');
    const filteredInitiatives = initiatives.filter(init => init.trim() !== '');
    
    onAddToCanvas({
      objective,
      keyResults: filteredKeyResults,
      initiatives: filteredInitiatives
    });
  };

  return (
    <div className="p-6 max-h-[90vh] overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">OKRs Widget</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Objetivo</CardTitle>
          <CardDescription>Defina el objetivo principal</CardDescription>
        </CardHeader>
        <CardContent>
          {isObjectiveEditing ? (
            <div className="flex flex-col space-y-2">
              <textarea
                className="w-full p-3 border rounded-md bg-blue-50"
                rows={3}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => setIsObjectiveEditing(false)}
                >
                  <Check className="mr-1 h-4 w-4" /> Guardar
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center p-3 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer"
              onClick={() => setIsObjectiveEditing(true)}
            >
              <div className="flex-1">
                <p className="font-medium">{objective}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Key Results</h3>
        <div className="space-y-2">
          {keyResults.map((kr, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <Zap className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  rows={2}
                  placeholder="Añadir Key Result..."
                  value={kr}
                  onChange={(e) => handleUpdateKeyResult(index, e.target.value)}
                />
              </div>
              {kr.trim() !== '' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveKeyResult(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={handleAddKeyResult}
          >
            <Plus className="h-4 w-4 mr-1" /> Añadir Key Result
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Iniciativas</h3>
        <div className="space-y-2">
          {initiatives.map((initiative, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="rounded-full bg-yellow-100 p-2 mt-1">
                <Check className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  rows={2}
                  placeholder="Añadir Iniciativa..."
                  value={initiative}
                  onChange={(e) => handleUpdateInitiative(index, e.target.value)}
                />
              </div>
              {initiative.trim() !== '' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveInitiative(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={handleAddInitiative}
          >
            <Plus className="h-4 w-4 mr-1" /> Añadir Iniciativa
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button 
          variant="default" 
          className="bg-primary text-white" 
          onClick={handleCreateWidget}
        >
          Añadir al lienzo
        </Button>
      </div>
    </div>
  );
};

export default OkrsWidgetComponent;
