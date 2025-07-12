import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Trophy, Radio, Heart, DollarSign, Users } from "lucide-react";
import competitionImage from "@/assets/competition-stage.jpg";
import liveStreamImage from "@/assets/live-stream.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Mic,
      title: "Publica tu Música",
      description: "Sube tus pistas, videos y contenido musical. Comparte tu arte con una comunidad apasionada.",
      color: "music-primary"
    },
    {
      icon: Trophy,
      title: "Competencias Musicales",
      description: "Participa en batallas épicas, freestyle sessions y competencias por género musical.",
      color: "music-action"
    },
    {
      icon: Radio,
      title: "Transmisiones en Vivo",
      description: "Conecta en tiempo real con tu audiencia. Recibe donaciones y construye tu comunidad.",
      color: "music-accent"
    },
    {
      icon: Heart,
      title: "Interacción Social",
      description: "Chat, reacciones y efectos visuales. Conecta con artistas y fans de todo el mundo.",
      color: "music-primary"
    },
    {
      icon: DollarSign,
      title: "Monetiza tu Talento",
      description: "Recibe donaciones, gana en competencias y monetiza tu contenido musical.",
      color: "music-action"
    },
    {
      icon: Users,
      title: "Comunidad Global",
      description: "Únete a una red mundial de artistas emergentes y fanáticos de la música.",
      color: "music-accent"
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading font-bold text-4xl md:text-6xl">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Todo lo que Necesitas
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una plataforma completa para artistas musicales que quieren conectar, 
            competir y crecer junto a su audiencia.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-music-primary/40 transition-all duration-300 hover:shadow-card group hover-glow"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-xl">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competitions Showcase */}
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-music-action/20 hover:border-music-action/40 transition-all duration-300 hover:shadow-card group">
            <div className="relative">
              <img 
                src={competitionImage} 
                alt="Competencias Musicales" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  Competencias Épicas
                </h3>
                <p className="text-white/90 mb-4">
                  Demuestra tu talento en batallas musicales con votación en tiempo real
                </p>
                <Button variant="action" size="sm" className="hover-glow">
                  <Trophy className="w-4 h-4 mr-2" />
                  Competir Ahora
                </Button>
              </div>
            </div>
          </Card>

          {/* Live Streaming Showcase */}
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-music-accent/20 hover:border-music-accent/40 transition-all duration-300 hover:shadow-card group">
            <div className="relative">
              <img 
                src={liveStreamImage} 
                alt="Transmisiones en Vivo" 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  Transmite en Vivo
                </h3>
                <p className="text-white/90 mb-4">
                  Conecta con tu audiencia en tiempo real y recibe donaciones
                </p>
                <Button variant="accent" size="sm" className="hover-glow">
                  <Radio className="w-4 h-4 mr-2" />
                  Ir en Vivo
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="font-heading font-bold text-3xl md:text-4xl">
            ¿Listo para Comenzar tu Viaje Musical?
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Únete a miles de artistas que ya están construyendo su carrera en Lobevol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="musical" size="hero" className="hover-glow">
              <Mic className="w-6 h-6 mr-3" />
              Comenzar como Artista
            </Button>
            <Button variant="artist" size="hero" className="hover-glow">
              <Users className="w-6 h-6 mr-3" />
              Explorar Comunidad
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;