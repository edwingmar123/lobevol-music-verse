import Navigation from "@/components/Navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Calendar, Users, UserPlus, Image, Video, Link as LinkIcon, Plus } from "lucide-react";

const Profile = () => {
  const { user, getUserPosts } = useAuth();
  const userPosts = user ? getUserPosts(user.id) : [];

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center p-6">
              <h2 className="text-lg font-semibold mb-2">Acceso requerido</h2>
              <p className="text-muted-foreground mb-4">
                Debes iniciar sesión para ver tu perfil.
              </p>
              <Link to="/login">
                <Button>Iniciar Sesión</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">@{user.username}</p>
                    {user.bio && (
                      <p className="mt-2 text-sm">{user.bio}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold">{user.followers}</span>
                      <span className="text-muted-foreground">seguidores</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserPlus className="h-4 w-4" />
                      <span className="font-semibold">{user.following}</span>
                      <span className="text-muted-foreground">siguiendo</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Link to="/create">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Contenido
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Mis Publicaciones</h2>
              <Badge variant="secondary">{userPosts.length} posts</Badge>
            </div>
            
            {userPosts.length === 0 ? (
              <Card>
                <CardContent className="text-center p-8">
                  <div className="mb-4">
                    <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No has publicado nada aún</h3>
                  <p className="text-muted-foreground mb-4">
                    Comparte tu música con la comunidad de Musical Art
                  </p>
                  <Link to="/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear tu primer post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {userPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getPostIcon(post.type)}
                          {post.type}
                        </Badge>
                      </div>
                      {post.description && (
                        <CardDescription>{post.description}</CardDescription>
                      )}
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {post.type === 'image' && (
                        <div className="relative overflow-hidden rounded-lg">
                          <img 
                            src={post.content} 
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop';
                            }}
                          />
                        </div>
                      )}
                      
                      {post.type === 'video' && (
                        <div className="bg-muted rounded-lg p-6 text-center">
                          <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Video: {post.content}</p>
                        </div>
                      )}
                      
                      {post.type === 'link' && (
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <LinkIcon className="h-4 w-4" />
                            <span className="font-medium">Enlace</span>
                          </div>
                          <a 
                            href={post.content} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm break-all"
                          >
                            {post.content}
                          </a>
                        </div>
                      )}
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;