import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CanvasHeader from '@/components/canvas/CanvasHeader';
import Canvas from '@/components/canvas/Canvas';
import CollaborationToolbar from '@/components/canvas/CollaborationToolbar';
import VotingNotification from '@/components/canvas/VotingNotification';
import VotingProgressPanel from '@/components/canvas/VotingProgressPanel';
import VotingResultsPanel from '@/components/canvas/VotingResultsPanel';
import StatisticsPanel from '@/components/canvas/StatisticsPanel';
import AIGeneratorPanel from '@/components/canvas/AIGeneratorPanel';
import CommentsPanel from '@/components/canvas/CommentsPanel';
import SharePanel from '@/components/canvas/SharePanel';
import EficientisIntegrationPanel from '@/components/canvas/EficientisIntegrationPanel';
import TemplatePanel from '@/components/canvas/TemplatePanel';
import { toast } from 'sonner';
import { StatisticItem } from '@/components/canvas/StatisticsPanel';

const CanvasPage = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("TÍTULO DEL PROYECTO");
  const [isLoading, setIsLoading] = useState(true);
  const [showVotingNotification, setShowVotingNotification] = useState(false);
  const [showVotingProgress, setShowVotingProgress] = useState(false);
  const [showVotingResults, setShowVotingResults] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showSharing, setShowSharing] = useState(false);
  const [showEficientisIntegration, setShowEficientisIntegration] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isVotingOwner, setIsVotingOwner] = useState(false);
  
  const mockVoteItems = [
    { id: '1', content: 'Incremento en costos de materias primas', votes: 0 },
    { id: '2', content: 'Expansión a nuevos mercados internacionales', votes: 0 },
    { id: '3', content: 'Alta diversificación en líneas de productos', votes: 0 },
  ];

  const mockVoters = [
    { id: '1', name: 'Julio Maisini', avatar: '', hasVoted: true, votesUsed: 5, totalVotes: 5 },
    { id: '2', name: 'Morti Cesar', avatar: '', hasVoted: false, votesUsed: 3, totalVotes: 5 },
    { id: '3', name: 'Manuel Jim.', avatar: '', hasVoted: true, votesUsed: 5, totalVotes: 5 },
    { id: '4', name: 'Dante Aguilar', avatar: '', hasVoted: true, votesUsed: 5, totalVotes: 5 },
  ];
  
  const mockVoteItemsWithVoters = [
    { 
      id: '1', 
      content: 'Incremento en costos de materias primas.', 
      color: 'bg-red-200', 
      votes: 7,
      voters: [
        { name: 'Julio M', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png' },
        { name: 'Maria B', avatar: 'https://i.pravatar.cc/150?img=5' },
        { name: 'Carlos A', avatar: '' }
      ]
    },
    { 
      id: '2', 
      content: 'Expansión a nuevos mercados internacionales.', 
      color: 'bg-blue-200', 
      votes: 5,
      voters: [
        { name: 'Julio M', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png' },
        { name: 'Jorge C', avatar: 'https://i.pravatar.cc/150?img=33' }
      ]
    },
    { 
      id: '3', 
      content: 'Alta diversificación en líneas de productos.', 
      color: 'bg-yellow-200', 
      votes: 5,
      voters: [
        { name: 'Carlos A', avatar: '' },
        { name: 'Jorge C', avatar: 'https://i.pravatar.cc/150?img=33' }
      ]
    },
    { 
      id: '4', 
      content: 'Experiencia en nuevos mercados internacionales.', 
      color: 'bg-blue-200', 
      votes: 4,
      voters: [
        { name: 'Julio M', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png' },
        { name: 'Jorge C', avatar: 'https://i.pravatar.cc/150?img=33' }
      ]
    },
    { 
      id: '5', 
      content: 'Eficiencia en la gestión de costos operativos.', 
      color: 'bg-green-200', 
      votes: 3,
      voters: [
        { name: 'Julio M', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png' },
        { name: 'Jorge C', avatar: 'https://i.pravatar.cc/150?img=33' }
      ]
    },
  ];

  const mockStatisticsItems: StatisticItem[] = [
    { id: '1', content: 'Competencia con precios más bajos.', percentage: 67, category: "amenazas", color: 'bg-red-500' },
    { id: '2', content: 'Expansión a nuevos mercados internacionales.', percentage: 60, category: "oportunidades", color: 'bg-blue-500' },
    { id: '3', content: 'Acceso a financiamiento con tasas competitivas.', percentage: 49, category: "fortalezas", color: 'bg-green-500' },
    { id: '4', content: 'Falta de diversificación en líneas de productos.', percentage: 37, category: "debilidades", color: 'bg-orange-400' },
    { id: '5', content: 'Diversificación de fuentes de ingresos.', percentage: 31, category: "fortalezas", color: 'bg-green-500' },
    { id: '6', content: 'Cambios en las preferencias del consumidor.', percentage: 27, category: "amenazas", color: 'bg-red-500' },
    { id: '7', content: 'Tendencias hacia la digitalización que reducen costos.', percentage: 20, category: "oportunidades", color: 'bg-blue-500' },
    { id: '8', content: 'Falta de segmentación en campañas publicitarias.', percentage: 17, category: "debilidades", color: 'bg-orange-400' },
    { id: '9', content: 'Crecimiento del segmento de mercado juvenil.', percentage: 8, category: "oportunidades", color: 'bg-blue-500' },
    { id: '10', content: 'Riesgo de fluctuación en el tipo de cambio.', percentage: 4, category: "amenazas", color: 'bg-red-500' },
  ];

  const mockComments = [
    {
      id: '1',
      author: { name: 'Tomás Rodríguez', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png' },
      content: 'En la fortaleza de "acceso a financiamiento con tasas competitivas" deberíamos ser más específicos...',
      timestamp: 'Hace 10 minutos',
      objectName: 'Fortalezas Financieras'
    },
    {
      id: '2',
      author: { name: 'Daniela Méndez', avatar: 'https://i.pravatar.cc/150?img=5' },
      content: 'Discutir esto respecto a las debilidades en el área de marketing',
      timestamp: 'Hace 15 minutos',
      objectName: 'Debilidades Marketing'
    },
    {
      id: '3',
      author: { name: 'Jorge Sánchez', avatar: 'https://i.pravatar.cc/150?img=33' },
      content: 'Creo que deberíamos enfocarnos más en la entrada al mercado internacional como una clara opción de crecimiento',
      timestamp: 'Hace 25 minutos',
      objectName: 'Oportunidades Crecimiento'
    },
    {
      id: '4',
      author: { name: 'Tomás Rodríguez', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png' },
      content: '¿Cuándo vamos a terminar el análisis de las fortalezas?',
      timestamp: 'Hace 35 minutos'
    },
    {
      id: '5',
      author: { name: 'Daniela Méndez', avatar: 'https://i.pravatar.cc/150?img=5' },
      content: 'Deberíamos hacerlo antes del viernes para presentarlo en la reunión',
      timestamp: 'Hace 32 minutos'
    }
  ];

  const mockCollaborators = [
    { id: '1', name: 'GIUSEPPE PIMINCHUMO LEYVA', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png', permission: 'owner' as const },
    { id: '2', name: 'CARLOS ANTONIO LUJAN', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png', permission: 'edit' as const },
    { id: '3', name: 'MANUEL URIBEN', avatar: '/lovable-uploads/cd62cb53-a08a-4049-b537-c910fa5ed4ca.png', permission: 'edit' as const },
    { id: '4', name: 'JORGE CENTURION', avatar: 'https://i.pravatar.cc/150?img=33', permission: 'view' as const },
    { id: '5', name: 'MARIA BECERRA', avatar: 'https://i.pravatar.cc/150?img=5', permission: 'view' as const }
  ];
  
  useEffect(() => {
    const loadCanvas = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (id === 'new') {
          setTitle('Lienzo sin título');
          toast.success('Nuevo lienzo creado correctamente');
        } 
        else if (id?.startsWith('template/')) {
          const templateId = id.split('/')[1];
          let templateName = 'Plantilla';
          
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
        else if (id === 'ai-new') {
          setTitle('Lienzo IA sin título');
          toast.success('Lienzo creado con IA correctamente');
        }
        else {
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
    setShowVotingResults(true);
  };
  
  const handleFinishForAll = () => {
    toast.success('La sesión de votación ha finalizado para todos');
    setShowVotingProgress(false);
    setShowVotingResults(true);
  };
  
  const handleAddTime = () => {
    toast('Se ha añadido 1 minuto más a la votación');
  };

  const handleShowVotingResults = () => {
    setShowVotingResults(true);
  };

  const handleCloseVotingResults = () => {
    setShowVotingResults(false);
  };

  const handleShowStatistics = () => {
    setShowStatistics(true);
    setShowVotingResults(false);
  };

  const handleCloseStatistics = () => {
    setShowStatistics(false);
  };

  const handleShowAIGenerator = () => {
    setShowAIGenerator(true);
  };

  const handleCloseAIGenerator = () => {
    setShowAIGenerator(false);
  };

  const handleGenerateAI = (prompt: string, template: string) => {
    toast.success(`Generando ${template} con prompt: "${prompt.substring(0, 20)}..."`);
  };

  const handleShowComments = () => {
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleAddComment = (content: string, isChat: boolean) => {
    toast.success(isChat ? 'Mensaje enviado al chat' : 'Comentario añadido correctamente');
  };

  const handleResolveComment = (id: string) => {
    toast.success('Comentario marcado como resuelto');
  };

  const handleShowSharing = () => {
    setShowSharing(true);
  };

  const handleCloseSharing = () => {
    setShowSharing(false);
  };

  const handleInvite = (email: string, permission: string) => {
    toast.success(`Invitación enviada a ${email} con permisos de ${permission}`);
  };

  const handleUpdateCollaborator = (id: string, permission: string) => {
    toast.success(`Permisos actualizados para el colaborador #${id}`);
  };

  const handleRemoveCollaborator = (id: string) => {
    toast.success(`Colaborador #${id} eliminado correctamente`);
  };

  const handleShowEficientisIntegration = () => {
    setShowEficientisIntegration(true);
  };

  const handleCloseEficientisIntegration = () => {
    setShowEficientisIntegration(false);
  };

  const handleShowTemplates = () => {
    setShowTemplates(true);
  };

  const handleCloseTemplates = () => {
    setShowTemplates(false);
  };

  const handleImportFromEficientis = () => {
    toast.success('Buscando e importando datos de Eficientis...');
    handleCloseEficientisIntegration();
  };

  const handleCreateBoardForEficientis = () => {
    toast.success('Creando nuevo board para Eficientis...');
    handleCloseEficientisIntegration();
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
        <CollaborationToolbar 
          onShowVotingResults={handleShowVotingResults}
          onShowAIGenerator={handleShowAIGenerator}
          onShowComments={handleShowComments}
          onShowSharing={handleShowSharing}
          onShowEficientisIntegration={handleShowEficientisIntegration}
          onShowTemplates={handleShowTemplates}
        />
        
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

        {showVotingResults && (
          <VotingResultsPanel
            title="Voten por las mejores opciones del FODA realizado"
            date="Feb 15, 2025 12:23 PM"
            creator="mí"
            voteItems={mockVoteItemsWithVoters}
            onClose={handleCloseVotingResults}
            onShowStatistics={handleShowStatistics}
          />
        )}

        {showStatistics && (
          <StatisticsPanel
            title="FODA Analysis"
            items={mockStatisticsItems}
            onClose={handleCloseStatistics}
          />
        )}

        {showAIGenerator && (
          <AIGeneratorPanel
            onClose={handleCloseAIGenerator}
            onGenerate={handleGenerateAI}
          />
        )}

        {showComments && (
          <CommentsPanel
            comments={mockComments}
            onClose={handleCloseComments}
            onAddComment={handleAddComment}
            onResolveComment={handleResolveComment}
          />
        )}

        {showSharing && (
          <SharePanel
            title={title}
            collaborators={mockCollaborators}
            onClose={handleCloseSharing}
            onInvite={handleInvite}
            onUpdateCollaborator={handleUpdateCollaborator}
            onRemoveCollaborator={handleRemoveCollaborator}
          />
        )}

        {showEficientisIntegration && (
          <EficientisIntegrationPanel
            onClose={handleCloseEficientisIntegration}
            onImport={handleImportFromEficientis}
            onCreateBoard={handleCreateBoardForEficientis}
          />
        )}

        {showTemplates && (
          <TemplatePanel
            onClose={handleCloseTemplates}
          />
        )}
      </div>
    </div>
  );
};

export default CanvasPage;
