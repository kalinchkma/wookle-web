
    import React, { useState } from 'react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
    import { MessageSquare, Send, Loader2 } from 'lucide-react';

    const MessageSellerDialog = ({ sellerName, sellerId, productName }) => {
      const { user } = useAuth();
      const { toast } = useToast();
      const [message, setMessage] = useState('');
      const [isOpen, setIsOpen] = useState(false);
      const [isSending, setIsSending] = useState(false);

      const handleSendMessage = () => {
        if (!user) {
          toast({ title: "Login Required", description: "Please log in to send a message.", variant: "destructive" });
          setIsOpen(false);
          return;
        }
        if (!message.trim()) {
          toast({ title: "Message Empty", description: "Please write a message before sending.", variant: "destructive" });
          return;
        }

        setIsSending(true);
        // Simulate sending message
        console.log(`Message to ${sellerName} (ID: ${sellerId}) about ${productName}: ${message}`);
        
        setTimeout(() => {
          setIsSending(false);
          setIsOpen(false);
          setMessage('');
          toast({ title: "Message Sent!", description: `Your message to ${sellerName} has been sent.` });
        }, 1000);
      };

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full compact-button border-input hover:border-primary hover:text-primary">
              <MessageSquare className="mr-2 h-4 w-4" /> Message Seller
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg">Message {sellerName}</DialogTitle>
              <DialogDescription>
                Ask a question about "{productName}" or other inquiries.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div>
                <Label htmlFor="sellerMessage" className="sr-only">Your Message</Label>
                <Textarea
                  id="sellerMessage"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Type your message to ${sellerName}...`}
                  rows={5}
                  className="focus-visible:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your message will be sent directly to the seller. Please allow some time for a response.
              </p>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="compact-button">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="button" 
                onClick={handleSendMessage} 
                className="bg-primary hover:bg-primary/90 compact-button"
                disabled={isSending}
              >
                {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {isSending ? 'Sending...' : 'Send Message'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default MessageSellerDialog;
  