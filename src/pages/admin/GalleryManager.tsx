import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Eye, EyeOff, Camera, FolderOpen } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { GALLERY_CATEGORIES } from '@/lib/gallery-categories';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  featured: boolean | null;
  published: boolean | null;
  display_order: number | null;
  created_at: string;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>('All');
  const { toast } = useToast();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image_url: string;
    category: string;
    featured: boolean;
    published: boolean;
    display_order: number;
  }>({
    title: '',
    description: '',
    image_url: '',
    category: GALLERY_CATEGORIES[0],
    featured: false,
    published: false,
    display_order: 0,
  });

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setImages(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages = activeFolder === 'All'
    ? images
    : images.filter(img => img.category === activeFolder);

  const getCategoryCount = (cat: string) =>
    images.filter(img => img.category === cat).length;

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: activeFolder !== 'All' ? activeFolder : GALLERY_CATEGORIES[0],
      featured: false,
      published: false,
      display_order: 0,
    });
    setEditingImage(null);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || '',
      image_url: image.image_url,
      category: image.category || 'General',
      featured: image.featured || false,
      published: image.published || false,
      display_order: image.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageData = {
      title: formData.title,
      description: formData.description || null,
      image_url: formData.image_url,
      category: formData.category,
      featured: formData.featured,
      published: formData.published,
      display_order: formData.display_order,
    };

    let error;
    if (editingImage) {
      const result = await supabase
        .from('gallery_images')
        .update(imageData)
        .eq('id', editingImage.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('gallery_images')
        .insert([imageData]);
      error = result.error;
    }

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `Image ${editingImage ? 'updated' : 'created'} successfully` });
      setIsDialogOpen(false);
      resetForm();
      fetchImages();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Image deleted successfully' });
      fetchImages();
    }
  };

  const togglePublished = async (image: GalleryImage) => {
    const { error } = await supabase
      .from('gallery_images')
      .update({ published: !image.published })
      .eq('id', image.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage your image gallery by category</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> New Image</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                label="Image"
                id="gallery_image_url"
                required
              />

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {GALLERY_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <Button type="submit" className="w-full">
                {editingImage ? 'Update Image' : 'Add Image'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Folder Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFolder === 'All' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFolder('All')}
        >
          <FolderOpen className="h-4 w-4 mr-1.5" />
          All
          <Badge variant="secondary" className="ml-2 text-xs">{images.length}</Badge>
        </Button>
        {GALLERY_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeFolder === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFolder(cat)}
          >
            <Camera className="h-4 w-4 mr-1.5" />
            {cat}
            <Badge variant="secondary" className="ml-2 text-xs">{getCategoryCount(cat)}</Badge>
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredImages.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {activeFolder === 'All'
              ? 'No gallery images yet. Add your first one!'
              : `No images in "${activeFolder}" yet. Click "New Image" to add one.`}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="aspect-video relative">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => handleEdit(image)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">{image.category}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant={image.published ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => togglePublished(image)}
                  >
                    {image.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
