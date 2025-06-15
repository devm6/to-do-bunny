import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Copy, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAccountabilityPartner } from "@/hooks/useAccountabilityPartner";

interface AccountabilityPartnerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountabilityPartner: React.FC<AccountabilityPartnerProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    myCode,
    loading,
    error,
    createMyPartnerProfile,
    connectToPartner,
    partner,
    connectionStatus,
    respondToRequest,
    refresh,
    pendingRequest,
  } = useAccountabilityPartner();

  const [inputCode, setInputCode] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-generate my partner code if not created yet
  useEffect(() => {
    if (isOpen && !myCode && !loading) {
      createMyPartnerProfile();
    }
    // eslint-disable-next-line
  }, [isOpen, myCode, loading]);

  // Refresh partner state on open
  useEffect(() => {
    if (isOpen) {
      refresh();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  const handleCopy = () => {
    if (myCode) {
      navigator.clipboard.writeText(myCode);
      setSuccessMsg("Copied!");
      setTimeout(() => setSuccessMsg(null), 1000);
    }
  };

  const onConnect = async () => {
    await connectToPartner(inputCode.trim().toUpperCase());
    setInputCode("");
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
            <p className="text-sm text-muted-foreground mb-2">
              Your Partner Code
            </p>
            <div className="flex items-center gap-2 justify-center">
              <Input
                value={myCode || ""}
                readOnly
                className="text-center font-mono text-lg"
                disabled={loading}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                disabled={!myCode}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this code with your accountability partner
            </p>
            {successMsg && (
              <span className="text-xs text-green-500 flex items-center gap-1 mt-2 justify-center">
                <CheckCircle2 className="w-4 h-4" /> {successMsg}
              </span>
            )}
          </div>

          {/* Show errors */}
          {error && (
            <div className="flex items-center text-sm text-red-600 gap-2 justify-center">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Show loading state */}
          {loading && (
            <div className="flex justify-center">
              <Loader2 className="animate-spin w-6 h-6 text-pink-400" />
            </div>
          )}

          {/* Partner connection logic */}
          {connectionStatus === "accepted" && partner && (
            <div className="rounded-lg border border-green-200 bg-green-50 py-2 px-4 text-center">
              <div>
                <span className="font-semibold text-lg text-green-700">
                  Partner Connected!
                </span>
              </div>
              <div className="text-gray-700 mt-2 text-sm">
                You're linked with code:{" "}
                <span className="font-mono font-bold">{partner.code}</span>
              </div>
            </div>
          )}

          {connectionStatus === "pending" && !pendingRequest && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 py-2 px-4 text-center">
              <div className="font-medium text-blue-700">
                Awaiting partner to accept request...
              </div>
            </div>
          )}

          {/* Incoming request (only if partner_user_id is me) */}
          {connectionStatus === "pending" && pendingRequest && (
            <div className="rounded-lg border border-yellow-300 bg-yellow-50 py-2 px-4 text-center">
              <div className="font-medium text-yellow-700">
                You have a pending partner request!
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => respondToRequest(true)}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => respondToRequest(false)}
                >
                  Reject
                </Button>
              </div>
            </div>
          )}

          {!connectionStatus && (
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Connect with Partner
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter partner's code"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="font-mono"
                  maxLength={10}
                />
                <Button
                  onClick={onConnect}
                  disabled={!inputCode || loading}
                >
                  Connect
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountabilityPartner;

console.log("AccountabilityPartner component loaded");
