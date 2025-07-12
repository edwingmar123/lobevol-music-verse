import { Button } from "@/components/ui/button";
import { Play, Mic, Trophy, Users } from "lucide-react";
import heroImage from "@/assets/hero-musicians.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
        <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-music-accent rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-music-primary rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-music-action rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-60 right-10 w-3 h-3 bg-music-accent rounded-full animate-float opacity-70" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Lobevol
              </span>
            </h1>
            <h2 className="font-heading font-semibold text-2xl md:text-4xl lg:text-5xl text-foreground/90">
              La Red Social Musical
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Conecta, compite y monetiza tu talento musical. 
              <br className="hidden md:block" />
              La plataforma donde artistas y fans se encuentran.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="musical" size="hero" className="hover-glow">
              <Mic className="w-6 h-6 mr-3" />
              Soy Artista
            </Button>
            <Button variant="accent" size="hero" className="hover-glow">
              <Users className="w-6 h-6 mr-3" />
              Soy Fan
            </Button>
          </div>

          {/* Demo Video Button */}
          <div className="pt-8">
            <Button variant="ghost" size="lg" className="group hover-glow">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-music-primary/20 rounded-full flex items-center justify-center group-hover:bg-music-primary/30 transition-colors">
                  <Play className="w-6 h-6 text-music-primary ml-1" />
                </div>
                <span className="text-lg font-medium">Ver Demo</span>
              </div>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-muted-foreground">Artistas Activos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
                100K+
              </div>
              <div className="text-muted-foreground">Fans Conectados</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-muted-foreground">Competencias Diarias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-music-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-music-accent rounded-full mt-2 animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;