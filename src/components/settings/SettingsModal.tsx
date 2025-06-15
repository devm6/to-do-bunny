
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    emailReminders: boolean;
    reminderHours: number;
    reminderDays: number;
  };
  onSettingsChange: (settings: any) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pookie Settings 💕</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-reminders" className="text-sm font-medium">
              Email Reminders
            </Label>
            <Switch
              id="email-reminders"
              checked={localSettings.emailReminders}
              onCheckedChange={(checked) => 
                setLocalSettings(prev => ({ ...prev, emailReminders: checked }))
              }
            />
          </div>

          {localSettings.emailReminders && (
            <div className="space-y-4 pl-4 border-l-2 border-primary/20">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Remind me how many hours before?
                </Label>
                <Select
                  value={localSettings.reminderHours.toString()}
                  onValueChange={(value) => 
                    setLocalSettings(prev => ({ ...prev, reminderHours: parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Or remind me how many days before?
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="7"
                  value={localSettings.reminderDays}
                  onChange={(e) => 
                    setLocalSettings(prev => ({ ...prev, reminderDays: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
