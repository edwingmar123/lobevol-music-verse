import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Play, Music, Trophy, Users, Flame } from "lucide-react";

const Community = () => {
  // Mock data for the feed
  const feedPosts = [
    {
      id: 1,
      user: {
        name: "María González",
        username: "@mariasings",
        avatar: "MG",
        verified: true,
        followers: "12.5K"
      },
      content: {
        type: "music",
        text: "Nueva canción que escribí anoche 🎵 ¿Qué opinan?",
        audioTitle: "Corazón de Fuego",
        duration: "3:42",
        genre: "Pop Latino"
      },
      stats: {
        likes: 1847,
        comments: 234,
        shares: 89
      },
      timestamp: "hace 2 horas"
    },
    {
      id: 2,
      user: {
        name: "DJ Carlos Beat",
        username: "@carlosbeat",
        avatar: "CB",
        verified: true,
        followers: "25.8K"
      },
      content: {
        type: "video",
        text: "Live remix session desde mi estudio 🔥",
        videoTitle: "Electronic Fusion Live",
        duration: "15:32",
        genre: "Electronic"
      },
      stats: {
        likes: 3241,
        comments: 567,
        shares: 156
      },
      timestamp: "hace 4 horas"
    },
    {
      id: 3,
      user: {
        name: "Ana Vocalist",
        username: "@anavocals",
        avatar: "AV",
        verified: false,
        followers: "8.2K"
      },
      content: {
        type: "competition",
        text: "¡Acabo de ganar la batalla de R&B! 🏆 Gracias por votar",
        battleTitle: "R&B Vocal Battle #145",
        rank: "1er Lugar",
        genre: "R&B"
      },
      stats: {
        likes: 892,
        comments: 134,
        shares: 45
      },
      timestamp: "hace 6 horas"
    }
  ];

  const trendingTopics = [
    { name: "#FreestyleFriday", posts: "2.3K" },
    { name: "#AcousticChallenge", posts: "1.8K" },
    { name: "#LatinVibes", posts: "1.5K" },
    { name: "#ElectronicNights", posts: "1.2K" },
    { name: "#VocalPower", posts: "890" }
  ];

  const suggestedArtists = [
    { name: "Luis Rapper", username: "@luisrap", followers: "18.5K", genre: "Hip Hop" },
    { name: "Sofia Jazz", username: "@sofiajazz", followers: "15.2K", genre: "Jazz" },
    { name: "Rock Band XYZ", username: "@rockxyz", followers: "22.1K", genre: "Rock" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Trending */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center">
                <Flame className="w-5 h-5 text-music-action mr-2" />
                Tendencias
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div>
                      <p className="font-medium text-music-accent">{topic.name}</p>
                      <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center">
                <Users className="w-5 h-5 text-music-primary mr-2" />
                Artistas Sugeridos
              </h3>
              <div className="space-y-4">
                {suggestedArtists.map((artist, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {artist.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{artist.name}</p>
                        <p className="text-xs text-muted-foreground">{artist.followers}</p>
                      </div>
                    </div>
                    <Button variant="accent" size="sm">
                      Seguir
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  TU
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="¿Qué música estás creando hoy?"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-music-primary"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Music className="w-4 h-4 mr-2" />
                    Audio
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                </div>
                <Button variant="musical">
                  Publicar
                </Button>
              </div>
            </Card>

            {/* Feed Posts */}
            {feedPosts.map((post) => (
              <Card key={post.id} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-music-primary/20 transition-all duration-300">
                {/* User Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{post.user.name}</span>
                        {post.user.verified && (
                          <Badge variant="default" className="bg-music-accent/20 text-music-accent text-xs">
                            ✓ Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{post.user.username}</span>
                        <span>•</span>
                        <span>{post.user.followers} seguidores</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Seguir
                  </Button>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-foreground mb-4">{post.content.text}</p>
                  
                  {post.content.type === "music" && (
                    <div className="bg-muted/30 rounded-lg p-4 border border-music-primary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-music-primary/20 rounded-lg flex items-center justify-center">
                            <Music className="w-6 h-6 text-music-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{post.content.audioTitle}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{post.content.duration}</span>
                              <span>•</span>
                              <Badge variant="secondary">{post.content.genre}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="musical" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Escuchar
                        </Button>
                      </div>
                    </div>
                  )}

                  {post.content.type === "video" && (
                    <div className="bg-muted/30 rounded-lg p-4 border border-music-accent/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-music-accent/20 rounded-lg flex items-center justify-center">
                            <Play className="w-6 h-6 text-music-accent" />
                          </div>
                          <div>
                            <p className="font-semibold">{post.content.videoTitle}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{post.content.duration}</span>
                              <span>•</span>
                              <Badge variant="secondary">{post.content.genre}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="accent" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  )}

                  {post.content.type === "competition" && (
                    <div className="bg-muted/30 rounded-lg p-4 border border-music-action/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-music-action/20 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-music-action" />
                          </div>
                          <div>
                            <p className="font-semibold">{post.content.battleTitle}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Badge variant="destructive" className="bg-music-action text-white">
                                {post.content.rank}
                              </Badge>
                              <span>•</span>
                              <Badge variant="secondary">{post.content.genre}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="action" size="sm">
                          Ver Batalla
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-6">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-music-action">
                      <Heart className="w-5 h-5" />
                      <span>{post.stats.likes.toLocaleString()}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-music-accent">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.stats.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:text-music-primary">
                      <Share2 className="w-5 h-5" />
                      <span>{post.stats.shares}</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default Community;