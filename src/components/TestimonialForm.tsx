import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TestimonialForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar_url: '',
    rating: 0,
  });

  const handleStarClick = (star: number) => {
    setFormData((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.content.trim() || formData.rating === 0) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in your name, testimonial, and rating.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('testimonials').insert([
      {
        name: formData.name.trim(),
        role: formData.role.trim() || null,
        company: formData.company.trim() || null,
        content: formData.content.trim(),
        avatar_url: formData.avatar_url.trim() || null,
        rating: formData.rating,
        published: false,
        featured: false,
        display_order: 0,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit testimonial. Please try again.',
        variant: 'destructive',
      });
    } else {
      setSubmitted(true);
      toast({
        title: 'Thank you! 🎉',
        description: 'Your testimonial has been submitted and is pending review.',
      });
    }
  };

  if (submitted) {
    return (
      <Card className="hero-card border-border/50 backdrop-blur-sm max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your testimonial has been submitted and will appear once reviewed.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', role: '', company: '', content: '', avatar_url: '', rating: 0 });
            }}
          >
            Submit Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hero-card border-border/50 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Share Your Experience</CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          Your feedback means a lot! Leave a testimonial below.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pub-name">Name *</Label>
              <Input
                id="pub-name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-role">Role</Label>
              <Input
                id="pub-role"
                placeholder="e.g. Developer, Manager"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                maxLength={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pub-company">Company / Organization</Label>
              <Input
                id="pub-company"
                placeholder="Where you work"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pub-avatar">Avatar URL</Label>
              <Input
                id="pub-avatar"
                placeholder="https://example.com/photo.jpg"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                maxLength={500}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pub-content">Your Testimonial *</Label>
            <Textarea
              id="pub-content"
              placeholder="Share your experience working with me..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              maxLength={1000}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      star <= (hoveredStar || formData.rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground self-center">
                  {formData.rating}/5
                </span>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Testimonials are reviewed before being published.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;
