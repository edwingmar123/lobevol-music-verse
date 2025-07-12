import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Clock, Music, Mic, Zap, Crown, Star } from "lucide-react";

const Competitions = () => {
  const liveCompetitions = [
    {
      id: 1,
      title: "Freestyle Friday Battle",
      description: "Batalla de freestyle en español con temática libre",
      genre: "Hip Hop",
      status: "live",
      participants: 8,
      maxParticipants: 8,
      timeLeft: "05:23",
      prize: "$500",
      currentRound: "Semifinal",
      viewers: 2847,
      participants_list: [
        { name: "MC Flow", votes: 340, avatar: "MF" },
        { name: "Rima Real", votes: 287, avatar: "RR" },
        { name: "Beat Master", votes: 156, avatar: "BM" },
        { name: "Verso Libre", votes: 98, avatar: "VL" }
      ]
    },
    {
      id: 2,
      title: "Acoustic Guitar Showcase",
      description: "Muestra tu técnica con guitarra acústica",
      genre: "Acoustic",
      status: "voting",
      participants: 12,
      maxParticipants: 15,
      timeLeft: "12:45",
      prize: "$300",
      currentRound: "Fase de Votación",
      viewers: 1523,
      participants_list: [
        { name: "Guitar Hero", votes: 523, avatar: "GH" },
        { name: "String Magic", votes: 445, avatar: "SM" },
        { name: "Chord Master", votes: 398, avatar: "CM" },
        { name: "Melody Maker", votes: 287, avatar: "MM" }
      ]
    }
  ];

  const upcomingCompetitions = [
    {
      id: 3,
      title: "Latin Pop Vocal Battle",
      description: "Competencia vocal de pop latino para artistas emergentes",
      genre: "Pop Latino",
      startTime: "Hoy 8:00 PM",
      maxParticipants: 10,
      registered: 7,
      prize: "$750",
      requirements: "Original o Cover"
    },
    {
      id: 4,
      title: "Electronic Mix Challenge",
      description: "Demuestra tus habilidades de DJ y producción electrónica",
      genre: "Electronic",
      startTime: "Mañana 6:00 PM",
      maxParticipants: 6,
      registered: 4,
      prize: "$400",
      requirements: "Set de 10 minutos"
    }
  ];

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
                      {comp.participants_list.slice(0, 3).map((participant, index) => (
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
                            <span className="font-medium">{participant.name}</span>
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
                      {comp.status === "voting" && (
                        <Button variant="accent" size="sm">
                          Votar
                        </Button>
                      )}
                      <Button variant="musical" size="sm">
                        {comp.status === "live" ? "Ver en Vivo" : "Unirse"}
                      </Button>
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
                      <span className="font-semibold">{comp.registered}/{comp.maxParticipants}</span>
                    </div>
                    <Progress 
                      value={(comp.registered / comp.maxParticipants) * 100} 
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

export default Competitions;