import { Button } from "@/components/ui/button";
import { Heart, Music, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    plataforma: [
      { name: "Competencias", href: "/competitions" },
      { name: "Transmisiones en Vivo", href: "/live" },
      { name: "Comunidad", href: "/community" },
      { name: "Rankings", href: "/rankings" }
    ],
    recursos: [
      { name: "Guía para Artistas", href: "/guide" },
      { name: "Centro de Ayuda", href: "/help" },
      { name: "Blog Musical", href: "/blog" },
      { name: "API Developers", href: "/api" }
    ],
    legal: [
      { name: "Términos de Uso", href: "/terms" },
      { name: "Política de Privacidad", href: "/privacy" },
      { name: "Derechos de Autor", href: "/copyright" },
      { name: "Contacto", href: "/contact" }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="bg-gradient-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
                  MVP Miusic
                </h3>
                <p className="text-muted-foreground text-sm">Red Social Musical</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              La plataforma que conecta artistas musicales con sus fans. 
              Compite, transmite en vivo y monetiza tu talento en una comunidad global.
            </p>

            <div className="space-y-4">
              <p className="text-sm font-medium">Síguenos en redes sociales</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-music-primary/20 hover:text-music-primary transition-colors"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Plataforma</h4>
            <ul className="space-y-3">
              {footerLinks.plataforma.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-music-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-music-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-music-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-card/30 rounded-2xl p-8 mb-12 border border-music-primary/20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h4 className="font-heading font-bold text-2xl">
              Mantente al Día con la Música
            </h4>
            <p className="text-muted-foreground">
              Recibe las últimas noticias, competencias exclusivas y nuevas funciones directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-music-primary"
              />
              <Button variant="musical" className="hover-glow">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 MVP. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-music-action animate-glow-pulse" />
            <span>para la comunidad musical</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>v1.0.0</span>
            <span>•</span>
            <span>Beta</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;