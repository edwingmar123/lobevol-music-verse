import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Users, Clock, Music, Mic, Zap, Crown, Star, Camera, Video, MessageCircle, Heart, Smile, Send, Play, Pause } from "lucide-react";
import { competitions, addComment, addReaction, joinCompetition, voteForParticipant, startStream, stopStream } from "@/data/competitionsData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Competitions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'spectator' | 'competitor' | null>(null);
  const [currentComment, setCurrentComment] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [competitionsData, setCompetitionsData] = useState(competitions);

  const emojis = ['🔥', '👏', '🎵', '🎤', '💯', '❤️', '🎸', '🎧'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCompetitionsData([...competitions]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const liveCompetitions = competitionsData.filter(c => c.status === 'live' || c.status === 'voting');
  const upcomingCompetitions = competitionsData.filter(c => c.status === 'upcoming');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-music-action text-white";
      case "voting": return "bg-music-accent text-background";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live": return <Zap className="w-4 h-4" />;
      case "voting": return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleJoinCompetition = (competitionId: string, role: 'spectator' | 'competitor') => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para participar.",
      });
      return;
    }

    setSelectedCompetition(competitionId);
    setUserRole(role);

    if (role === 'competitor') {
      const success = joinCompetition(competitionId, {
        id: user.id.toString(),
        username: user.username,
        avatar: user.username.substring(0, 2).toUpperCase()
      });

      if (success) {
        toast({
          title: "¡Unido a la competencia!",
          description: "Ahora puedes competir en vivo.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo unir a la competencia.",
        });
      }
    } else {
      toast({
        title: "Unido como espectador",
        description: "Puedes comentar y reaccionar.",
      });
    }
  };

  const handleSendComment = (competitionId: string) => {
    if (!user || !currentComment.trim()) return;

    addComment(competitionId, {
      userId: user.id.toString(),
      username: user.username,
      message: currentComment,
      timestamp: Date.now()
    });

    setCurrentComment('');
    setCompetitionsData([...competitions]);
  };

  const handleAddReaction = (competitionId: string, emoji: string) => {
    if (!user) return;

    addReaction(competitionId, user.id.toString(), user.username, emoji);
    setCompetitionsData([...competitions]);

    toast({
      title: "Reacción enviada",
      description: `Has reaccionado con ${emoji}`,
    });
  };

  const handleVote = (competitionId: string, participantId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para votar.",
      });
      return;
    }

    const success = voteForParticipant(competitionId, participantId);
    if (success) {
      setCompetitionsData([...competitions]);
      toast({
        title: "Voto registrado",
        description: "Tu voto ha sido contabilizado.",
      });
    }
  };

  const handleStartStream = async (competitionId: string) => {
    if (!user) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsStreaming(true);
      startStream(competitionId, user.id.toString(), `stream-${user.id}`);
      setCompetitionsData([...competitions]);

      toast({
        title: "Stream iniciado",
        description: "Tu transmisión en vivo ha comenzado.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo acceder a la cámara.",
      });
    }
  };

  const handleStopStream = (competitionId: string) => {
    if (!user) return;

    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    
    setIsStreaming(false);
    stopStream(competitionId, user.id.toString());
    setCompetitionsData([...competitions]);

    toast({
      title: "Stream finalizado",
      description: "Tu transmisión en vivo ha terminado.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-heading font-bold text-4xl md:text-6xl">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Competencias Musicales
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Demuestra tu talento, compite con otros artistas y gana premios increíbles
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-action mb-2">24</div>
            <div className="text-sm text-muted-foreground">Competencias Activas</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-primary mb-2">156</div>
            <div className="text-sm text-muted-foreground">Artistas Compitiendo</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-accent mb-2">8.5K</div>
            <div className="text-sm text-muted-foreground">Espectadores</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-action mb-2">$12K</div>
            <div className="text-sm text-muted-foreground">En Premios</div>
          </Card>
        </div>

        {/* Live Competitions */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 flex items-center">
            <Zap className="w-8 h-8 text-music-action mr-3 animate-glow-pulse" />
            Competencias en Vivo
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {liveCompetitions.map((comp) => (
              <Card key={comp.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-music-primary/40 transition-all duration-300 hover:shadow-card">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(comp.status)}>
                          {getStatusIcon(comp.status)}
                          <span className="ml-1 capitalize">{comp.status === "live" ? "EN VIVO" : "VOTACIÓN"}</span>
                        </Badge>
                        <Badge variant="secondary">{comp.genre}</Badge>
                      </div>
                      <h3 className="font-heading font-bold text-xl mb-2">{comp.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{comp.description}</p>
                    </div>
                  </div>

                  {/* Competition Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-music-action">{comp.timeLeft}</div>
                      <div className="text-xs text-muted-foreground">Tiempo restante</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-music-primary">{comp.viewers.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Espectadores</div>
                    </div>
                  </div>

                  {/* Current Participants/Leaders */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Crown className="w-4 h-4 text-music-action mr-2" />
                      {comp.status === "live" ? "Participantes Actuales" : "Ranking Actual"}
                    </h4>
                    <div className="space-y-2">
                      {comp.participants.slice(0, 3).map((participant, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold w-6 text-center">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                              </span>
                              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {participant.avatar}
                              </div>
                            </div>
                            <span className="font-medium">{participant.username}</span>
                          </div>
                          <div className="text-sm font-semibold text-music-accent">
                            {participant.votes} votos
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prize & Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-music-action" />
                      <span className="font-bold text-music-action">{comp.prize}</span>
                      <span className="text-sm text-muted-foreground">premio</span>
                    </div>
                   <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="musical" size="sm">
                            {comp.status === "live" ? "Ver en Vivo" : "Unirse"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{comp.title}</DialogTitle>
                          </DialogHeader>
                          <CompetitionViewer 
                            competition={comp} 
                            onJoin={handleJoinCompetition}
                            userRole={userRole}
                            currentComment={currentComment}
                            setCurrentComment={setCurrentComment}
                            onSendComment={handleSendComment}
                            onAddReaction={handleAddReaction}
                            onVote={handleVote}
                            onStartStream={handleStartStream}
                            onStopStream={handleStopStream}
                            isStreaming={isStreaming}
                            videoRef={videoRef}
                            emojis={emojis}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Competitions */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-3xl mb-6 flex items-center">
            <Clock className="w-8 h-8 text-music-primary mr-3" />
            Próximas Competencias
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingCompetitions.map((comp) => (
              <Card key={comp.id} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-music-accent/40 transition-all duration-300 hover:shadow-card">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="border-music-accent text-music-accent">
                      <Clock className="w-3 h-3 mr-1" />
                      Próximamente
                    </Badge>
                    <Badge variant="secondary">{comp.genre}</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">{comp.title}</h3>
                  <p className="text-muted-foreground text-sm">{comp.description}</p>
                </div>

                {/* Competition Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Inicio</span>
                    <span className="font-semibold text-music-accent">{comp.startTime}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Inscritos</span>
                      <span className="font-semibold">{comp.participants.length}/{comp.maxParticipants}</span>
                    </div>
                    <Progress 
                      value={(comp.participants.length / comp.maxParticipants) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Requisitos</span>
                    <span className="font-semibold">{comp.requirements}</span>
                  </div>
                </div>

                {/* Prize & Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-music-action" />
                    <span className="font-bold text-music-action">{comp.prize}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      Más Info
                    </Button>
                    <Button variant="accent" size="sm">
                      Inscribirse
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-glow border-music-primary/20">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-4xl">
                ¿Listo para Competir?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Únete a la próxima competencia y demuestra tu talento musical. 
                Gana premios, reconocimiento y construye tu audiencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="musical" size="hero" className="hover-glow">
                  <Mic className="w-6 h-6 mr-3" />
                  Crear Competencia
                </Button>
                <Button variant="accent" size="hero" className="hover-glow">
                  <Star className="w-6 h-6 mr-3" />
                  Ver Todas las Competencias
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

// Competition Viewer Component
const CompetitionViewer = ({ 
  competition, 
  onJoin, 
  userRole, 
  currentComment, 
  setCurrentComment, 
  onSendComment, 
  onAddReaction, 
  onVote, 
  onStartStream, 
  onStopStream, 
  isStreaming, 
  videoRef, 
  emojis 
}: any) => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'spectator' | 'competitor' | null>(null);

  const isUserParticipant = user && competition.participants.some((p: any) => p.id === user.id.toString());
  const currentUserParticipant = competition.participants.find((p: any) => p.id === user?.id.toString());

  if (!selectedRole && !userRole) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">¿Cómo quieres participar?</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => { setSelectedRole('spectator'); onJoin(competition.id, 'spectator'); }}
              variant="outline"
              className="h-24 flex flex-col space-y-2"
            >
              <Users className="w-8 h-8" />
              <span>Espectador</span>
              <span className="text-xs text-muted-foreground">Ver y comentar</span>
            </Button>
            <Button 
              onClick={() => { setSelectedRole('competitor'); onJoin(competition.id, 'competitor'); }}
              variant="musical"
              className="h-24 flex flex-col space-y-2"
              disabled={competition.participants.length >= competition.maxParticipants}
            >
              <Mic className="w-8 h-8" />
              <span>Competidor</span>
              <span className="text-xs">Competir en vivo</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Stream View */}
      <div className="lg:col-span-2 space-y-4">
        {/* Live Stream Area */}
        <Card className="p-4">
          <div className="relative bg-background rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
            {isUserParticipant && currentUserParticipant?.isLive ? (
              <div className="relative w-full h-full">
                <video 
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-music-action text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  EN VIVO
                </Badge>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {competition.status === 'live' ? 'Competencia en vivo' : 'Esperando competidores'}
                </p>
              </div>
            )}
          </div>

          {/* Stream Controls for Competitors */}
          {isUserParticipant && (
            <div className="flex space-x-2 mt-4">
              {!isStreaming ? (
                <Button onClick={() => onStartStream(competition.id)} variant="musical">
                  <Camera className="w-4 h-4 mr-2" />
                  Iniciar Stream
                </Button>
              ) : (
                <Button onClick={() => onStopStream(competition.id)} variant="destructive">
                  <Video className="w-4 h-4 mr-2" />
                  Parar Stream
                </Button>
              )}
            </div>
          )}
        </Card>

        {/* Participants List */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <Crown className="w-4 h-4 text-music-action mr-2" />
            Participantes ({competition.participants.length}/{competition.maxParticipants})
          </h4>
          <div className="space-y-2">
            {competition.participants.map((participant: any, index: number) => (
              <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold w-6 text-center">
                    {index + 1}
                  </span>
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {participant.avatar}
                  </div>
                  <span className="font-medium">{participant.username}</span>
                  {participant.isLive && (
                    <Badge variant="destructive" className="text-xs">
                      <Zap className="w-2 h-2 mr-1" />
                      VIVO
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-music-accent">
                    {participant.votes} votos
                  </span>
                  {competition.status === 'voting' && user && (
                    <Button 
                      size="sm" 
                      variant="accent"
                      onClick={() => onVote(competition.id, participant.id)}
                    >
                      Votar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chat and Reactions */}
      <div className="space-y-4">
        {/* Emoji Reactions */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Reacciones Rápidas</h4>
          <div className="grid grid-cols-4 gap-2">
            {emojis.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                onClick={() => onAddReaction(competition.id, emoji)}
                className="text-2xl p-2 h-auto"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </Card>

        {/* Live Chat */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat en Vivo
          </h4>
          <div className="space-y-2 h-64 overflow-y-auto mb-4">
            {competition.comments.map((comment: any) => (
              <div key={comment.id} className="text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-music-primary text-xs">
                    {comment.username}
                  </span>
                  {comment.emoji && (
                    <span className="text-lg">{comment.emoji}</span>
                  )}
                </div>
                {comment.message && (
                  <p className="text-muted-foreground text-xs">{comment.message}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Escribe un comentario..."
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendComment(competition.id)}
              className="flex-1"
            />
            <Button 
              size="sm"
              onClick={() => onSendComment(competition.id)}
              disabled={!currentComment.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Competitions;