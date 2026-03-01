import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, Pencil, Trash2, Eye, EyeOff, Award, Loader2 } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  description: string | null;
  issuer: string | null;
  date: string | null;
  category: string | null;
  image_url: string | null;
  published: boolean;
  display_order: number;
}

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    issuer: '',
    date: '',
    category: 'Technology',
    image_url: '',
    published: false,
    display_order: 0,
  });

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error && data) setCertificates(data as Certificate[]);
    setIsLoading(false);
  };

  useEffect(() => { fetchCertificates(); }, []);

  const resetForm = () => {
    setFormData({ title: '', description: '', issuer: '', date: '', category: 'Technology', image_url: '', published: false, display_order: 0 });
    setEditingCert(null);
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      description: cert.description || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      category: cert.category || 'Technology',
      image_url: cert.image_url || '',
      published: cert.published,
      display_order: cert.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCert) {
        const { error } = await supabase.from('certificates').update(formData).eq('id', editingCert.id);
        if (error) throw error;
        toast({ title: 'Certificate updated' });
      } else {
        const { error } = await supabase.from('certificates').insert(formData);
        if (error) throw error;
        toast({ title: 'Certificate added' });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchCertificates();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certificate?')) return;
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Certificate deleted' });
      fetchCertificates();
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    await supabase.from('certificates').update({ published: !published }).eq('id', id);
    fetchCertificates();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground mt-1">Manage your certifications and credentials</p>
        </div>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Certificate
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCert ? 'Edit Certificate' : 'Add Certificate'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of what this certificate is about" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issuer">Issuer</Label>
                <Input id="issuer" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} placeholder="e.g. Google, Coursera" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="e.g. 2024" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <ImageUpload value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} label="Certificate Image" />
            <div className="flex items-center gap-2">
              <Switch checked={formData.published} onCheckedChange={(checked) => setFormData({ ...formData, published: checked })} />
              <Label>Published</Label>
            </div>
            <Button type="submit" className="w-full">{editingCert ? 'Update' : 'Add'} Certificate</Button>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-12">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No certificates yet. Add your first one!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.title}</TableCell>
                <TableCell>{cert.issuer || '—'}</TableCell>
                <TableCell>{cert.category}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => togglePublished(cert.id, cert.published)} className="gap-1">
                    {cert.published ? <><Eye className="h-4 w-4 text-green-500" /> Published</> : <><EyeOff className="h-4 w-4 text-muted-foreground" /> Draft</>}
                  </Button>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(cert)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CertificatesManager;
