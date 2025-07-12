import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Music, Trophy, Users, Heart, Play, Crown, Star, Instagram, Twitter, Youtube } from "lucide-react";

const Profile = () => {
  const profileData = {
    name: "Alex Rivera",
    artistName: "AlexBeats",
    username: "@alexbeats",
    bio: "Productor musical especializado en Electronic y Hip Hop. Creando beats únicos desde 2020. Ganador de 3 competencias en Lobevol.",
    location: "Ciudad de México, México",
    joinedDate: "Marzo 2023",
    verified: true,
    stats: {
      followers: 15420,
      following: 342,
      likes: 89750,
      streams: 234567
    },
    achievements: [
      { icon: Crown, title: "Rey del Beat", description: "Ganador de 5 competencias", color: "music-action" },
      { icon: Star, title: "Rising Star", description: "10K+ seguidores", color: "music-primary" },
      { icon: Heart, title: "Fan Favorite", description: "50K+ likes totales", color: "music-accent" },
      { icon: Trophy, title: "Champion", description: "Top 3 en ranking", color: "music-action" }
    ]
  };

  const musicTracks = [
    {
      id: 1,
      title: "Urban Nights",
      genre: "Hip Hop",
      duration: "3:42",
      plays: 12540,
      likes: 890,
      releaseDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Electronic Dreams",
      genre: "Electronic",
      duration: "4:18",
      plays: 8720,
      likes: 643,
      releaseDate: "2024-01-10"
    },
    {
      id: 3,
      title: "Midnight Vibes",
      genre: "Chill",
      duration: "5:23",
      plays: 15680,
      likes: 1240,
      releaseDate: "2023-12-28"
    }
  ];

  const competitionHistory = [
    {
      id: 1,
      name: "Hip Hop Battle #125",
      position: 1,
      prize: "$500",
      date: "2024-01-20",
      participants: 12
    },
    {
      id: 2,
      name: "Electronic Showcase",
      position: 2,
      prize: "$300",
      date: "2024-01-15",
      participants: 8
    },
    {
      id: 3,
      name: "Beat Making Challenge",
      position: 1,
      prize: "$750",
      date: "2024-01-10",
      participants: 15
    }
  ];

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 1: return { text: "🥇 1er Lugar", color: "bg-music-action text-white" };
      case 2: return { text: "🥈 2do Lugar", color: "bg-music-accent text-background" };
      case 3: return { text: "🥉 3er Lugar", color: "bg-music-primary text-white" };
      default: return { text: `#${position}`, color: "bg-muted text-muted-foreground" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-border relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center text-white text-4xl font-bold music-glow">
                  AR
                </div>
                {profileData.verified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-music-accent rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-background" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="font-heading font-bold text-3xl">{profileData.artistName}</h1>
                    {profileData.verified && (
                      <Badge className="bg-music-accent text-background">
                        Verificado ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-muted-foreground">{profileData.name}</p>
                  <p className="text-music-primary">{profileData.username}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed max-w-2xl">{profileData.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>📍 {profileData.location}</span>
                  <span>📅 Miembro desde {profileData.joinedDate}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-music-primary">{profileData.stats.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Seguidores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-music-accent">{profileData.stats.following.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Siguiendo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-music-action">{profileData.stats.likes.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-music-primary">{profileData.stats.streams.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Reproducciones</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <Button variant="musical" className="hover-glow">
                  <Users className="w-4 h-4 mr-2" />
                  Seguir
                </Button>
                <Button variant="accent" className="hover-glow">
                  <Heart className="w-4 h-4 mr-2" />
                  Apoyar
                </Button>
                <Button variant="ghost">
                  <Settings className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <Card className="p-4 mb-8 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="sm" className="hover:text-music-primary">
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-music-accent">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-music-action">
              <Youtube className="w-4 h-4 mr-2" />
              YouTube
            </Button>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border">
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center">
            <Trophy className="w-6 h-6 text-music-action mr-3" />
            Logros y Reconocimientos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg bg-${achievement.color}/10 border border-${achievement.color}/20 text-center space-y-3 hover:scale-105 transition-transform duration-300`}>
                <achievement.icon className={`w-8 h-8 text-${achievement.color} mx-auto`} />
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="music" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="music" className="data-[state=active]:bg-music-primary data-[state=active]:text-white">
              <Music className="w-4 h-4 mr-2" />
              Mi Música
            </TabsTrigger>
            <TabsTrigger value="competitions" className="data-[state=active]:bg-music-accent data-[state=active]:text-background">
              <Trophy className="w-4 h-4 mr-2" />
              Competencias
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-music-action data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Actividad
            </TabsTrigger>
          </TabsList>

          {/* Music Tab */}
          <TabsContent value="music" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-xl">Mis Pistas</h3>
              <Button variant="musical">
                <Music className="w-4 h-4 mr-2" />
                Subir Nueva Pista
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {musicTracks.map((track) => (
                <Card key={track.id} className="p-4 bg-card/50 backdrop-blur-sm border-border hover:border-music-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-music-primary/20 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-music-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{track.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{track.genre}</Badge>
                          <span>•</span>
                          <span>{track.duration}</span>
                          <span>•</span>
                          <span>{track.releaseDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-music-accent">{track.plays.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Reproducciones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-music-action">{track.likes}</div>
                        <div className="text-xs text-muted-foreground">Likes</div>
                      </div>
                      <Button variant="musical" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Reproducir
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Competitions Tab */}
          <TabsContent value="competitions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-xl">Historial de Competencias</h3>
              <Button variant="accent">
                <Trophy className="w-4 h-4 mr-2" />
                Ver Competencias Activas
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {competitionHistory.map((competition) => {
                const badge = getPositionBadge(competition.position);
                return (
                  <Card key={competition.id} className="p-4 bg-card/50 backdrop-blur-sm border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-music-accent/20 rounded-lg flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-music-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{competition.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{competition.participants} participantes</span>
                            <span>•</span>
                            <span>{competition.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-music-action">{competition.prize}</div>
                          <div className="text-xs text-muted-foreground">Premio</div>
                        </div>
                        <Badge className={badge.color}>
                          {badge.text}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <h3 className="font-heading font-bold text-xl">Actividad Reciente</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
                <p className="text-sm">
                  <span className="font-semibold">AlexBeats</span> ganó la competencia 
                  <span className="text-music-action font-semibold"> Hip Hop Battle #125</span>
                  <span className="text-muted-foreground"> • hace 2 días</span>
                </p>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
                <p className="text-sm">
                  <span className="font-semibold">AlexBeats</span> subió una nueva pista:
                  <span className="text-music-primary font-semibold"> "Urban Nights"</span>
                  <span className="text-muted-foreground"> • hace 1 semana</span>
                </p>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
                <p className="text-sm">
                  <span className="font-semibold">AlexBeats</span> alcanzó
                  <span className="text-music-accent font-semibold"> 15K seguidores</span>
                  <span className="text-muted-foreground"> • hace 2 semanas</span>
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default Profile;