import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Users, Heart, DollarSign, MessageCircle, Eye, Music, Mic } from "lucide-react";
import liveStreamImage from "@/assets/live-stream.jpg";

const Live = () => {
  const liveStreams = [
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

  const chatMessages = [
    { user: "MusicFan23", message: "¡Increíble música! 🎵", donation: null },
    { user: "BeatLover", message: "Donando $10", donation: "$10" },
    { user: "ElectroNight", message: "Esta canción es perfecta 🔥", donation: null },
    { user: "DanceQueen", message: "No puedo parar de bailar!", donation: null },
    { user: "SupportMusic", message: "¡Sigue así! Donando $25", donation: "$25" },
    { user: "NewFan", message: "Primera vez aquí, me encanta!", donation: null }
  ];

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
            <div className="text-2xl font-bold text-music-action mb-2">$3.2K</div>
            <div className="text-sm text-muted-foreground">Donaciones Hoy</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Live Stream */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border">
              <div className="relative">
                <img 
                  src={liveStreams[0].thumbnail} 
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
                        {liveStreams[0].artist.avatar}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-white">
                          {liveStreams[0].title}
                        </h3>
                        <p className="text-white/90 text-sm">{liveStreams[0].artist.name}</p>
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
                      <span className="font-semibold">{liveStreams[0].viewers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-music-accent">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-semibold">{liveStreams[0].donations}</span>
                    </div>
                    <Badge variant="secondary">{liveStreams[0].genre}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {liveStreams[0].duration}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{liveStreams[0].description}</p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="action" className="hover-glow">
                    <Heart className="w-4 h-4 mr-2" />
                    Me Gusta
                  </Button>
                  <Button variant="accent" className="hover-glow">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donar $5
                  </Button>
                  <Button variant="ghost">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>
            </Card>

            {/* Other Live Streams */}
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-2xl">Otros Streams en Vivo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveStreams.slice(1).map((stream) => (
                  <Card key={stream.id} className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-music-primary/40 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <img 
                        src={stream.thumbnail} 
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
                      <p className="text-xs text-muted-foreground mb-2">{stream.artist.name}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{stream.genre}</Badge>
                        <span className="text-xs text-music-accent font-semibold">{stream.donations}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Chat */}
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 text-music-accent mr-2" />
                Chat en Vivo
              </h3>
              <div className="space-y-3 h-64 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-music-primary text-xs">{msg.user}</span>
                      {msg.donation && (
                        <Badge variant="destructive" className="text-xs bg-music-action">
                          {msg.donation}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-music-primary"
                />
                <Button variant="musical" size="sm">
                  Enviar
                </Button>
              </div>
            </Card>

            {/* Upcoming Streams */}
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
                <Music className="w-5 h-5 text-music-primary mr-2" />
                Próximos Streams
              </h3>
              <div className="space-y-4">
                {upcomingStreams.map((stream) => (
                  <div key={stream.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {stream.artist.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{stream.title}</h4>
                        <p className="text-xs text-muted-foreground">{stream.artist.name}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <Badge variant="secondary">{stream.genre}</Badge>
                      <span className="text-music-accent font-semibold">{stream.scheduledTime}</span>
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

export default Live;
