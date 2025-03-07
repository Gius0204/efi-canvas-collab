
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CanvasHeader from '@/components/canvas/CanvasHeader';
import Canvas from '@/components/canvas/Canvas';
import CollaborationToolbar from '@/components/canvas/CollaborationToolbar';
import VotingNotification from '@/components/canvas/VotingNotification';
import VotingProgressPanel from '@/components/canvas/VotingProgressPanel';
import { toast } from 'sonner';

const CanvasPage = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("TÍTULO DEL PROYECTO");
  const [isLoading, setIsLoading] = useState(true);
  const [showVotingNotification, setShowVotingNotification] = useState(false);
  const [showVotingProgress, setShowVotingProgress] = useState(false);
  const [isVotingOwner, setIsVotingOwner] = useState(false);
  
  // Mock data for voting progress
  const mockVoters = [
    { id: '1', name: 'Julio Maisini', avatar: '', hasVoted: true, votesUsed: 5, totalVotes: 5 },
    { id: '2', name: 'Morti Cesar', avatar: '', hasVoted: false, votesUsed: 3, totalVotes: 5 },
    { id: '3', name: 'Manuel Jim.', avatar: '', hasVoted: true, votesUsed: 5, totalVotes: 5 },
    { id: '4', name: 'Dante Aguilar', avatar: '', hasVoted: true, votesUsed: 5, totalVotes: 5 },
  ];
  
  const mockVoteItems = [
    { id: '1', content: 'Alta diversificación de líneas de productos.', color: 'bg-yellow-200', votes: 5 },
    { id: '2', content: 'Expansión a mercado internacional.', color: 'bg-blue-200', votes: 3 },
    { id: '3', content: 'Eficiencia en la gestión de costos operativos.', color: 'bg-green-200', votes: 2 },
    { id: '4', content: 'Incremento en costos de materias primas.', color: 'bg-red-200', votes: 2 },
  ];
  
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
    
    // Simulate a voting notification after 5 seconds for demo purposes
    const votingNotificationTimer = setTimeout(() => {
      setShowVotingNotification(true);
    }, 5000);
    
    return () => {
      clearTimeout(votingNotificationTimer);
    };
  }, [id]);
  
  const handleJoinVoting = () => {
    setShowVotingNotification(false);
    setShowVotingProgress(true);
    toast.success('Te has unido a la sesión de votación');
  };
  
  const handleDismissVoting = () => {
    setShowVotingNotification(false);
    toast('Has decidido no participar en esta votación');
  };
  
  const handleFinishVoting = () => {
    toast.success('Has finalizado tu votación');
    setShowVotingProgress(false);
  };
  
  const handleFinishForAll = () => {
    toast.success('La sesión de votación ha finalizado para todos');
    setShowVotingProgress(false);
  };
  
  const handleAddTime = () => {
    toast('Se ha añadido 1 minuto más a la votación');
  };
  
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
      <div className="flex-1 overflow-hidden relative">
        <Canvas />
        <CollaborationToolbar />
        
        {showVotingNotification && (
          <VotingNotification 
            onJoin={handleJoinVoting}
            onDismiss={handleDismissVoting}
            initiator="Líder Grupo 2"
            description="Voten por las mejores opciones del FODA realizado..."
          />
        )}
        
        {showVotingProgress && (
          <VotingProgressPanel 
            isOwner={isVotingOwner}
            voters={mockVoters}
            voteItems={mockVoteItems}
            timeRemaining="00:34"
            onFinish={handleFinishVoting}
            onFinishForAll={handleFinishForAll}
            onAddTime={handleAddTime}
          />
        )}
      </div>
    </div>
  );
};

export default CanvasPage;
