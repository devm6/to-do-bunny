
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Copy } from 'lucide-react';

interface AccountabilityPartnerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountabilityPartner: React.FC<AccountabilityPartnerProps> = ({
  isOpen,
  onClose
}) => {
  const [myCode, setMyCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [partnerCode, setPartnerCode] = useState('');

  const copyCode = () => {
    navigator.clipboard.writeText(myCode);
  };

  const connectPartner = () => {
    // Here you would implement the actual connection logic
    console.log('Connecting with partner code:', partnerCode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Accountability Partner 💪
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Your Partner Code</p>
            <div className="flex items-center gap-2">
              <Input value={myCode} readOnly className="text-center font-mono text-lg" />
              <Button size="sm" variant="outline" onClick={copyCode}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this code with your accountability partner
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">
              Connect with Partner
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter partner's code"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                className="font-mono"
              />
              <Button onClick={connectPartner} disabled={!partnerCode}>
                Connect
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountabilityPartner;
