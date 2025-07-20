import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Play, Music, Trophy, Users, Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  communityPosts, 
  trendingTopics, 
  suggestedArtists, 
  likePost, 
  followUser, 
  createPost,
  sharePost,
  addComment 
} from "@/data/communityData";
import { simulateLikeDonation } from "@/data/donationData";

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState(communityPosts);
  const [artists, setArtists] = useState(suggestedArtists);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLikePost = (postId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para dar me gusta.",
      });
      return;
    }

    const post = likePost(postId);
    if (post) {
      setPosts([...communityPosts]);
      
      // Simulate donation for like
      if (post.stats.isLiked) {
        simulateLikeDonation(
          user.id.toString(),
          user.username,
          post.user.id,
          post.user.name
        );
        
        toast({
          title: "¡Me gusta enviado!",
          description: `Has apoyado a ${post.user.name} con $0.50`,
        });
      }
    }
  };

  const handleFollowUser = (userId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para seguir usuarios.",
      });
      return;
    }

    followUser(userId);
    setPosts([...communityPosts]);
    setArtists([...suggestedArtists]);
    
    const artist = suggestedArtists.find(a => a.id === userId);
    toast({
      title: artist?.isFollowing ? "Usuario seguido" : "Usuario no seguido",
      description: artist?.isFollowing 
        ? `Ahora sigues a ${artist.name}` 
        : `Has dejado de seguir a ${artist?.name}`,
    });
  };

  const handleCreatePost = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para crear posts.",
      });
      return;
    }

    if (!newPostContent.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Escribe algo antes de publicar.",
      });
      return;
    }

    createPost(user.id.toString(), user.username, newPostContent);
    setPosts([...communityPosts]);
    setNewPostContent('');
    
    toast({
      title: "Post publicado",
      description: "Tu contenido ha sido compartido con la comunidad.",
    });
  };

  const handleSharePost = (postId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para compartir.",
      });
      return;
    }

    sharePost(postId);
    setPosts([...communityPosts]);
    
    toast({
      title: "Post compartido",
      description: "Has compartido este contenido.",
    });
  };

  const handleCommentPost = (postId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para comentar.",
      });
      return;
    }

    addComment(postId);
    setPosts([...communityPosts]);
    
    toast({
      title: "Comentario agregado",
      description: "Tu comentario ha sido publicado.",
    });
  };

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
                {artists.map((artist) => (
                  <div key={artist.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {artist.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{artist.name}</p>
                        <p className="text-xs text-muted-foreground">{artist.followers}</p>
                      </div>
                    </div>
                    <Button 
                      variant={artist.isFollowing ? "outline" : "accent"} 
                      size="sm"
                      onClick={() => handleFollowUser(artist.id)}
                    >
                      {artist.isFollowing ? "Siguiendo" : "Seguir"}
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
                  <Input 
                    placeholder="¿Qué música estás creando hoy?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full"
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
                <Button 
                  variant="musical"
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                >
                  Publicar
                </Button>
              </div>
            </Card>

            {/* Feed Posts */}
            {posts.map((post) => (
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
                  <Button 
                    variant={post.user.isFollowing ? "outline" : "ghost"} 
                    size="sm"
                    onClick={() => handleFollowUser(post.user.id)}
                  >
                    {post.user.isFollowing ? "Siguiendo" : "Seguir"}
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center space-x-2 hover:text-music-action ${post.stats.isLiked ? 'text-music-action' : ''}`}
                      onClick={() => handleLikePost(post.id)}
                    >
                      <Heart className={`w-5 h-5 ${post.stats.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.stats.likes.toLocaleString()}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-2 hover:text-music-accent"
                      onClick={() => handleCommentPost(post.id)}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.stats.comments}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-2 hover:text-music-primary"
                      onClick={() => handleSharePost(post.id)}
                    >
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