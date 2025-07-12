import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Image, Video, Link as LinkIcon, Plus } from 'lucide-react';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: ''
  });
  const [postType, setPostType] = useState<'image' | 'video' | 'link'>('image');
  const [isLoading, setIsLoading] = useState(false);
  const { createPost, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para crear un post.",
      });
      return;
    }

    if (!formData.title || !formData.content) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El título y el contenido son obligatorios.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      createPost({
        type: postType,
        title: formData.title,
        description: formData.description,
        content: formData.content,
        tags
      });

      toast({
        title: "¡Post creado!",
        description: "Tu contenido ha sido publicado exitosamente.",
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al crear el post.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getContentPlaceholder = () => {
    switch (postType) {
      case 'image':
        return 'URL de la imagen (ej: https://ejemplo.com/imagen.jpg)';
      case 'video':
        return 'URL del video (ej: https://ejemplo.com/video.mp4)';
      case 'link':
        return 'URL del enlace (ej: https://soundcloud.com/tu-cancion)';
      default:
        return '';
    }
  };

  const getContentLabel = () => {
    switch (postType) {
      case 'image':
        return 'URL de la imagen';
      case 'video':
        return 'URL del video';
      case 'link':
        return 'URL del enlace';
      default:
        return 'Contenido';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center p-6">
              <h2 className="text-lg font-semibold mb-2">Acceso requerido</h2>
              <p className="text-muted-foreground mb-4">
                Debes iniciar sesión para crear contenido.
              </p>
              <Button onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Crear Contenido</h1>
            <p className="text-muted-foreground">Comparte tu música con la comunidad</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Nuevo Post
              </CardTitle>
              <CardDescription>
                Selecciona el tipo de contenido que quieres compartir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs value={postType} onValueChange={(value) => setPostType(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Imagen
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="link" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Enlace
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="image" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Título de tu imagen"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Título de tu video"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="link" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Título de tu enlace"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="content">{getContentLabel()}</Label>
                  <Input
                    id="content"
                    name="content"
                    type="url"
                    placeholder={getContentPlaceholder()}
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe tu contenido..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (opcional)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="rock, guitarra, original (separados por comas)"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Separa los tags con comas para mejor organización
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Publicando..." : "Publicar Contenido"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;