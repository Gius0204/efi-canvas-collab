
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CanvasHeader from '@/components/canvas/CanvasHeader';
import Canvas from '@/components/canvas/Canvas';
import { toast } from 'sonner';

const CanvasPage = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("TÍTULO DEL PROYECTO");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading the canvas data
    const loadCanvas = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call to get canvas data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If it's a new canvas
        if (id === 'new') {
          setTitle('Lienzo sin título');
          toast.success('Nuevo lienzo creado correctamente');
        } 
        // If it's a template
        else if (id?.startsWith('template/')) {
          const templateId = id.split('/')[1];
          let templateName = 'Plantilla';
          
          // Map template IDs to names
          switch (templateId) {
            case 'foda':
              templateName = 'FODA';
              break;
            case 'okrs':
              templateName = 'OKRs';
              break;
            case 'pestel':
              templateName = 'PESTEL';
              break;
            case 'mapa':
              templateName = 'Mapa Estratégico';
              break;
          }
          
          setTitle(`${templateName} sin título`);
          toast.success(`Lienzo de ${templateName} creado correctamente`);
        }
        // For AI created canvas
        else if (id === 'ai-new') {
          setTitle('Lienzo IA sin título');
          toast.success('Lienzo creado con IA correctamente');
        }
        // For existing canvas
        else {
          // This would be replaced with actual data from API
          setTitle('Proyecto cargado');
          toast.success('Lienzo cargado correctamente');
        }
      } catch (error) {
        toast.error('Error al cargar el lienzo');
        console.error('Error loading canvas:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCanvas();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <CanvasHeader title="Cargando..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen">
      <CanvasHeader title={title} />
      <div className="flex-1 overflow-hidden">
        <Canvas />
      </div>
    </div>
  );
};

export default CanvasPage;
