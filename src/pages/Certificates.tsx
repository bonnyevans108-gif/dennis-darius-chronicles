import { useState, useEffect } from 'react';
import { ArrowLeft, Award, ExternalLink, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CustomCursor from '@/components/CustomCursor';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  image_url: string;
  description: string;
}


const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data } = await supabase
        .from('certificates')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });
      if (data) setCertificates(data as unknown as Certificate[]);
      setIsLoading(false);
    };
    fetchCertificates();
  }, []);

  const categories = ['All', ...new Set(certificates.map(c => c.category))];
  
  const filteredCerts = filter === 'All' 
    ? certificates 
    : certificates.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <div className="font-bold text-xl glow-text">
              Darius<span className="text-primary">Mukoya</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Achievements</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Certificates & <span className="text-primary">Credentials</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my professional certifications and achievements across technology, 
              health & safety, and creative fields.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert, index) => (
              <Card 
                key={cert.id}
                className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-muted flex items-center justify-center">
                  <img 
                    src={cert.image_url} 
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col">
                  <Badge variant="secondary" className="mb-2 w-fit">
                    {cert.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.description && (
                    <div className="text-xs text-muted-foreground max-h-24 overflow-y-auto pr-1 custom-scrollbar">
                      {cert.description}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCerts.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No certificates found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedCert.image_url} 
                alt={selectedCert.title}
                className="w-full object-contain bg-muted"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedCert(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-3">
                {selectedCert.category}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{selectedCert.title}</h2>
              <p className="text-muted-foreground mb-4">
                Issued by <span className="text-foreground font-medium">{selectedCert.issuer}</span> • {selectedCert.date}
              </p>
              <div className="text-muted-foreground whitespace-pre-wrap">
                {selectedCert.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
