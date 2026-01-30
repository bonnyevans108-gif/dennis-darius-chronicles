import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Loader2, Phone, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MpesaPaymentModal = ({ isOpen, onClose }: MpesaPaymentModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickAmounts = [50, 100, 200, 500, 1000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount) {
      toast({
        title: "Error",
        description: "Please enter both phone number and amount",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^(?:254|\+254|0)?([17]\d{8})$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Safaricom phone number (e.g., 0712345678)",
        variant: "destructive",
      });
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount (minimum KSh 1)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
        body: {
          phoneNumber: phoneNumber.replace(/\s+/g, ''),
          amount: numAmount,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.success) {
        toast({
          title: "Check Your Phone! 📱",
          description: "An M-Pesa prompt has been sent to your phone. Enter your PIN to complete the payment.",
        });
        onClose();
        setPhoneNumber('');
        setAmount('100');
      } else {
        throw new Error(data?.error || 'Payment initiation failed');
      }
    } catch (error: any) {
      console.error('M-Pesa error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to initiate M-Pesa payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-primary" />
            Buy Me a Coffee
          </DialogTitle>
          <DialogDescription>
            Support my work with M-Pesa. You'll receive an STK push to enter your PIN.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Amount Selection */}
          <div className="space-y-2">
            <Label>Quick Amounts (KSh)</Label>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant={amount === String(quickAmount) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(String(quickAmount))}
                  className="flex-1 min-w-[60px]"
                >
                  {quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              Amount (KSh)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount in KSh"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
              className="bg-background/50"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              M-Pesa Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Enter the Safaricom number to receive the M-Pesa prompt
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="hero" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending STK Push...
              </>
            ) : (
              <>
                <Coffee className="mr-2 h-4 w-4" />
                Pay KSh {amount || '0'} via M-Pesa
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MpesaPaymentModal;
