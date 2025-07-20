import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Radio, Users, Heart, DollarSign, MessageCircle, Eye, Music, Mic, Play, Pause, Square, Send, Volume2, VolumeX } from "lucide-react";
import { liveStreams, createLiveStream, endLiveStream, addLiveComment, addLiveReaction, incrementViewers, saveRecording } from "@/data/liveData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { simulateReactionDonation, createDonation, DONATION_AMOUNTS, donationStats } from "@/data/donationData";
import liveStreamImage from "@/assets/live-stream.jpg";

const Live = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [streamsData, setStreamsData] = useState(liveStreams);
  const [currentComment, setCurrentComment] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [donationAmount, setDonationAmount] = useState(5);
  const [totalDonations, setTotalDonations] = useState(donationStats.totalAmount);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const emojis = ['🎵', '👏', '🔥', '❤️', '💯', '🎤', '🎸', '🎧'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStreamsData([...liveStreams]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mockLiveStreams = [
    {
      id: 1,
      artist: {
        name: "DJ Luna",
        username: "@djluna",
        avatar: "DL",
        verified: true
      },
      title: "Electronic Night Sessions 🎧",
      description: "Live DJ set with electronic and house music",
      genre: "Electronic",
      viewers: 2847,
      duration: "2:34:12",
      thumbnail: liveStreamImage,
      donations: "$847",
      isLive: true
    },
    {
      id: 2,
      artist: {
        name: "Acoustic Sam",
        username: "@acousticsam",
        avatar: "AS",
        verified: false
      },
      title: "Acoustic Guitar & Voice ✨",
      description: "Original songs and covers with acoustic guitar",
      genre: "Acoustic",
      viewers: 1523,
      duration: "1:45:33",
      thumbnail: liveStreamImage,
      donations: "$324",
      isLive: true
    },
    {
      id: 3,
      artist: {
        name: "María Salsa",
        username: "@mariasalsa",
        avatar: "MS",
        verified: true
      },
      title: "Latin Rhythms Live 💃",
      description: "Salsa, bachata and reggaeton covers",
      genre: "Latin",
      viewers: 3241,
      duration: "3:12:45",
      thumbnail: liveStreamImage,
      donations: "$1,234",
      isLive: true
    }
  ];

  const upcomingStreams = [
    {
      id: 4,
      artist: {
        name: "Rock Band XYZ",
        username: "@rockxyz",
        avatar: "RB",
        verified: true
      },
      title: "Rock Concert Experience",
      description: "Live rock concert with original songs",
      genre: "Rock",
      scheduledTime: "Hoy 8:00 PM",
      expectedViewers: "5K+"
    },
    {
      id: 5,
      artist: {
        name: "Piano Master",
        username: "@pianomaster",
        avatar: "PM",
        verified: false
      },
      title: "Classical Piano Evening",
      description: "Beautiful classical piano compositions",
      genre: "Classical",
      scheduledTime: "Mañana 7:00 PM",
      expectedViewers: "2K+"
    }
  ];

  const handleStartRecording = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para grabar.",
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Save recording
        saveRecording({
          userId: user.id.toString(),
          title: `Grabación ${new Date().toLocaleString()}`,
          description: 'Grabación en vivo',
          audioBlob,
          audioUrl,
          duration: recordingTime,
          isPublic: true
        });

        toast({
          title: "Grabación guardada",
          description: "Tu grabación ha sido guardada exitosamente.",
        });

        // Create live stream
        const newStream = createLiveStream({
          title: `Live Session - ${user.username}`,
          description: 'Sesión de música en vivo',
          userId: user.id.toString(),
          username: user.username,
          genre: 'Live',
          audioUrl
        });

        setStreamsData([...liveStreams]);
        setAudioChunks([]);
        setRecordingTime(0);
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Grabación iniciada",
        description: "Tu sesión en vivo ha comenzado.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo acceder al micrófono.",
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      // Stop all tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSendComment = (streamId: string) => {
    if (!user || !currentComment.trim()) return;

    addLiveComment(streamId, {
      userId: user.id.toString(),
      username: user.username,
      message: currentComment,
      timestamp: Date.now()
    });

    setCurrentComment('');
    setStreamsData([...liveStreams]);
  };

  const handleAddReaction = (streamId: string, emoji: string) => {
    if (!user) return;

    const stream = liveStreams.find(s => s.id === streamId);
    if (!stream) return;

    addLiveReaction(streamId, user.id.toString(), user.username, emoji);
    setStreamsData([...liveStreams]);

    // Simulate donation for reaction
    simulateReactionDonation(
      user.id.toString(),
      user.username,
      stream.userId,
      stream.username,
      emoji
    );

    setTotalDonations(donationStats.totalAmount);

    toast({
      title: "Reacción enviada",
      description: `Has reaccionado con ${emoji} y donado $${DONATION_AMOUNTS.reaction}`,
    });
  };

  const handleJoinStream = (streamId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para unirte.",
      });
      return;
    }

    incrementViewers(streamId);
    setSelectedStream(streamId);
    setStreamsData([...liveStreams]);
  };

  const handleLikeStream = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para dar me gusta.",
      });
      return;
    }

    const stream = streamsData[0];
    if (!stream) return;

    // Simulate donation for like
    simulateReactionDonation(
      user.id.toString(),
      user.username,
      stream.userId,
      stream.username,
      '❤️'
    );

    setTotalDonations(donationStats.totalAmount);

    toast({
      title: "¡Me gusta enviado!",
      description: `Has apoyado al artista con $${DONATION_AMOUNTS.reaction}`,
    });
  };

  const handleDonateToStream = (amount: number) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para donar.",
      });
      return;
    }

    const stream = streamsData[0];
    if (!stream) return;

    // Create donation
    createDonation(
      user.id.toString(),
      user.username,
      stream.userId,
      stream.username,
      amount,
      `¡Excelente música! Sigue así 🎵`,
      'donation'
    );

    setTotalDonations(donationStats.totalAmount);

    toast({
      title: "¡Donación enviada!",
      description: `Has donado $${amount} al artista`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-heading font-bold text-4xl md:text-6xl">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Transmisiones en Vivo
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conecta con tus artistas favoritos en tiempo real y apoya su música
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-action mb-2">12</div>
            <div className="text-sm text-muted-foreground">Streams en Vivo</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-primary mb-2">8.5K</div>
            <div className="text-sm text-muted-foreground">Espectadores</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-2xl font-bold text-music-accent mb-2">45</div>
            <div className="text-sm text-muted-foreground">Artistas Activos</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border">
                    <div className="text-2xl font-bold text-music-action mb-2">${totalDonations.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Donaciones Totales</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Live Stream */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border">
              <div className="relative">
                <img 
                  src={liveStreamImage} 
                  alt="Live Stream" 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Live Badge */}
                <Badge className="absolute top-4 left-4 bg-music-action text-white animate-glow-pulse">
                  <Radio className="w-3 h-3 mr-1" />
                  EN VIVO
                </Badge>

                {/* Stream Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                        {streamsData[0]?.username.substring(0, 2).toUpperCase() || "LS"}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-white">
                          {streamsData[0]?.title || "Live Stream"}
                        </h3>
                        <p className="text-white/90 text-sm">{streamsData[0]?.username || "Artista"}</p>
                      </div>
                    </div>
                    <Button variant="musical" className="hover-glow">
                      Seguir
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stream Controls */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-music-action">
                      <Eye className="w-5 h-5" />
                      <span className="font-semibold">{streamsData[0]?.viewers.toLocaleString() || "0"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-music-accent">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-semibold">${donationStats.totalAmount.toFixed(2)}</span>
                    </div>
                    <Badge variant="secondary">{streamsData[0]?.genre || "Live"}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(Math.floor((Date.now() - (streamsData[0]?.startTime || Date.now())) / 1000))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{streamsData[0]?.description || "Transmisión en vivo"}</p>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="action" 
                    className="hover-glow"
                    onClick={() => handleLikeStream()}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Me Gusta
                  </Button>
                  <Button 
                    variant="accent" 
                    className="hover-glow"
                    onClick={() => handleDonateToStream(donationAmount)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donar ${donationAmount}
                  </Button>
                  <Button variant="ghost">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>
            </Card>

            {/* Live Recording Controls */}
            <Card className="p-6 bg-gradient-glow border-music-primary/20">
              <div className="space-y-4">
                <div className="text-center">
                  <Mic className="w-12 h-12 text-music-primary mx-auto mb-2" />
                  <h3 className="font-heading font-bold text-lg">Grabación en Vivo</h3>
                  {isRecording && (
                    <p className="text-music-action font-semibold">
                      Grabando: {formatTime(recordingTime)}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-center space-x-3">
                  {!isRecording ? (
                    <Button 
                      onClick={handleStartRecording}
                      variant="musical" 
                      size="lg"
                      className="hover-glow"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Iniciar Grabación
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleStopRecording}
                      variant="destructive" 
                      size="lg"
                      className="animate-pulse"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      Parar Grabación
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Other Live Streams */}
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-2xl">Streams en Vivo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {streamsData.filter(s => s.isLive).map((stream) => (
                  <Card key={stream.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-music-primary/40 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <img 
                        src={liveStreamImage} 
                        alt={stream.title} 
                        className="w-full h-32 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-music-action text-white text-xs">
                        <Radio className="w-2 h-2 mr-1" />
                        VIVO
                      </Badge>
                      <div className="absolute bottom-2 right-2 bg-background/90 rounded px-2 py-1 text-xs">
                        {stream.viewers.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-1">{stream.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{stream.username}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{stream.genre}</Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="musical"
                              onClick={() => handleJoinStream(stream.id)}
                            >
                              Ver Stream
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{stream.title}</DialogTitle>
                            </DialogHeader>
                            <LiveStreamViewer 
                              stream={stream}
                              currentComment={currentComment}
                              setCurrentComment={setCurrentComment}
                              onSendComment={handleSendComment}
                              onAddReaction={handleAddReaction}
                              emojis={emojis}
                              audioRef={audioRef}
                              isPlaying={isPlaying}
                              setIsPlaying={setIsPlaying}
                              volume={volume}
                              setVolume={setVolume}
                              isMuted={isMuted}
                              setIsMuted={setIsMuted}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Global Live Chat */}
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 text-music-accent mr-2" />
                Chat Global
              </h3>
              <div className="space-y-3 h-64 overflow-y-auto">
                {streamsData.map(stream => 
                  stream.comments.slice(-3).map((comment) => (
                    <div key={comment.id} className="text-sm">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">{stream.title}</Badge>
                        <span className="font-semibold text-music-primary text-xs">{comment.username}</span>
                        {comment.emoji && (
                          <span className="text-lg">{comment.emoji}</span>
                        )}
                      </div>
                      {comment.message && (
                        <p className="text-muted-foreground text-xs">{comment.message}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Recent Recordings */}
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
                <Music className="w-5 h-5 text-music-primary mr-2" />
                Grabaciones Recientes
              </h3>
              <div className="space-y-4">
                {streamsData.slice(0, 3).map((stream) => (
                  <div key={stream.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {stream.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{stream.title}</h4>
                        <p className="text-xs text-muted-foreground">{stream.username}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <Badge variant="secondary">{stream.genre}</Badge>
                      <span className="text-music-accent font-semibold">
                        {stream.isLive ? 'En vivo' : 'Terminado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Start Streaming CTA */}
            <Card className="p-6 bg-gradient-glow border-music-primary/20 text-center">
              <div className="space-y-4">
                <Mic className="w-12 h-12 text-music-primary mx-auto" />
                <h3 className="font-heading font-bold text-lg">¿Eres Artista?</h3>
                <p className="text-sm text-muted-foreground">
                  Comparte tu música en vivo y conecta con tu audiencia
                </p>
                <Button variant="musical" className="w-full hover-glow">
                  Iniciar Stream
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

// Live Stream Viewer Component
const LiveStreamViewer = ({ 
  stream, 
  currentComment, 
  setCurrentComment, 
  onSendComment, 
  onAddReaction, 
  emojis,
  audioRef,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  isMuted,
  setIsMuted
}: any) => {
  const { user } = useAuth();

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Audio Player */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold">{stream.title}</h3>
              <p className="text-muted-foreground">por {stream.username}</p>
              <Badge variant="secondary" className="mt-2">{stream.genre}</Badge>
            </div>

            {/* Audio Element */}
            {stream.audioUrl && (
              <audio 
                ref={audioRef}
                src={stream.audioUrl}
                onLoadedData={() => {
                  if (audioRef.current) {
                    audioRef.current.volume = volume;
                    audioRef.current.muted = isMuted;
                  }
                }}
              />
            )}

            {/* Audio Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={handlePlayPause}
                variant="musical"
                size="lg"
                className="rounded-full w-16 h-16"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <Button 
                onClick={toggleMute}
                variant="ghost"
                size="sm"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Stream Info */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-music-action">{stream.viewers}</div>
                <div className="text-xs text-muted-foreground">Oyentes</div>
              </div>
              <div>
                <div className="text-lg font-bold text-music-primary">
                  {stream.isLive ? 'EN VIVO' : 'GRABACIÓN'}
                </div>
                <div className="text-xs text-muted-foreground">Estado</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat and Reactions */}
      <div className="space-y-4">
        {/* Emoji Reactions */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Reacciones</h4>
          <div className="grid grid-cols-4 gap-2">
            {emojis.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                onClick={() => onAddReaction(stream.id, emoji)}
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
            Chat
          </h4>
          <div className="space-y-2 h-64 overflow-y-auto mb-4">
            {stream.comments.map((comment: any) => (
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
              onKeyPress={(e) => e.key === 'Enter' && onSendComment(stream.id)}
              className="flex-1"
            />
            <Button 
              size="sm"
              onClick={() => onSendComment(stream.id)}
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

export default Live;
