import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, Trophy, Radio, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Users, label: "Comunidad", path: "/community" },
    { icon: Trophy, label: "Competencias", path: "/competitions" },
    { icon: Radio, label: "En Vivo", path: "/live" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center font-heading font-bold text-white text-xl music-glow">
              L
            </div>
            <span className="font-heading font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              Lobevol
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "musical" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="artist" size="sm">
              Iniciar Sesión
            </Button>
            <Button variant="accent" size="sm">
              Registrarse
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center font-heading font-bold text-white text-lg">
              L
            </div>
            <span className="font-heading font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              Lobevol
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border animate-slide-up">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "musical" : "ghost"}
                    size="lg"
                    className="w-full justify-start"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              <div className="pt-4 space-y-2">
                <Button variant="artist" size="lg" className="w-full">
                  Iniciar Sesión
                </Button>
                <Button variant="accent" size="lg" className="w-full">
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-lg border-t border-border">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "musical" : "ghost"}
                size="icon"
                className="flex-col h-12 w-12"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label.split(" ")[0]}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navigation;