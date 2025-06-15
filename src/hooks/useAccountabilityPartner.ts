
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type PartnerConnectionStatus = "pending" | "accepted" | "rejected" | "removed";

interface UseAccountabilityPartnerResult {
  myCode: string | null;
  partner: null | { code: string; userId: string };
  connectionStatus: PartnerConnectionStatus | null;
  loading: boolean;
  error: string | null;
  createMyPartnerProfile: () => Promise<void>;
  connectToPartner: (partnerCode: string) => Promise<void>;
  respondToRequest: (accept: boolean) => Promise<void>;
  refresh: () => void;
  pendingRequest: boolean;
}

// Helper to generate a code if UI wants to locally show it (not persistent) -- fallback only
function generatePartnerCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function useAccountabilityPartner(): UseAccountabilityPartnerResult {
  const { user } = useAuth();
  const [myCode, setMyCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<null | { code: string; userId: string }>(null);
  const [connectionStatus, setConnectionStatus] = useState<PartnerConnectionStatus | null>(null);
  const [pendingRequest, setPendingRequest] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch my partner code (from/accountability_partners)
  const getMyPartnerProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    // Check if user already has a partner code
    const { data, error: fetchErr } = await supabase
      .from("accountability_partners")
      .select("partner_code")
      .eq("user_id", user.id)
      .single();
    
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") {
        setMyCode(null);
      } else {
        setError("Could not fetch partner code.");
      }
    } else {
      setMyCode(data.partner_code);
    }
    setLoading(false);
  }, [user]);

  // Create if not exists
  const createMyPartnerProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    // First, see if already exists
    const { data: existing } = await supabase
      .from("accountability_partners")
      .select("id, partner_code")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      setMyCode(existing.partner_code);
      setLoading(false);
      return;
    }

    // Generate unique code
    let newCode = generatePartnerCode();
    let tries = 0;
    // Minimal collision check (ideally run on backend)
    while (tries < 5) {
      const { count } = await supabase
        .from("accountability_partners")
        .select("id", { count: "exact", head: true })
        .eq("partner_code", newCode);
      if ((count ?? 0) === 0) break;
      newCode = generatePartnerCode();
      tries++;
    }

    const { error: insertErr } = await supabase.from("accountability_partners").insert([
      { user_id: user.id, partner_code: newCode }
    ]);

    if (insertErr) {
      setError("Could not generate partner code.");
    } else {
      setMyCode(newCode);
    }
    setLoading(false);
  }, [user]);

  // Connection management
  // Find existing accepted connection
  const fetchConnection = useCallback(async () => {
    if (!user) return;
    setPartner(null);
    setConnectionStatus(null);
    setPendingRequest(false);

    // Is there an accepted connection involving this user?
    const { data: connections } = await supabase
      .from("partner_connections")
      .select("*")
      .or(`user_id.eq.${user.id},partner_user_id.eq.${user.id}`);

    // Check for accepted or pending connections
    let mainConn = connections?.find((c: any) => c.status === "accepted");
    if (mainConn) {
      const partnerId = mainConn.user_id === user.id ? mainConn.partner_user_id : mainConn.user_id;
      // Get partner's code
      const { data: partnerProfile } = await supabase
        .from("accountability_partners")
        .select("partner_code")
        .eq("user_id", partnerId)
        .single();
      if (partnerProfile) {
        setPartner({ code: partnerProfile.partner_code, userId: partnerId });
        setConnectionStatus("accepted");
      }
      setPendingRequest(false);
      return;
    }

    // Check for pending requests (incoming)
    mainConn = connections?.find(
      (c: any) =>
        c.status === "pending" &&
        c.partner_user_id === user.id // partner_user_id is me -> someone sent me a request
    );
    if (mainConn) {
      setConnectionStatus("pending");
      setPartner({ code: "", userId: mainConn.user_id });
      setPendingRequest(true);
      return;
    }

    // Outgoing pending
    mainConn = connections?.find(
      (c: any) =>
        c.status === "pending" &&
        c.user_id === user.id // I sent request
    );
    if (mainConn) {
      setConnectionStatus("pending");
      setPartner({ code: "", userId: mainConn.partner_user_id });
      setPendingRequest(false);
      return;
    }
  }, [user]);

  // Connect to a partner by code (send connection request)
  const connectToPartner = useCallback(async (partnerCode: string) => {
    setLoading(true);
    setError(null);
    if (!user) {
      setError("Not authenticated.");
      setLoading(false);
      return;
    }

    // Look up partner by code
    const { data: partner } = await supabase
      .from("accountability_partners")
      .select("user_id")
      .eq("partner_code", partnerCode)
      .maybeSingle();

    if (!partner) {
      setError("Partner code not found.");
      setLoading(false);
      return;
    }
    if (partner.user_id === user.id) {
      setError("You cannot connect with yourself!");
      setLoading(false);
      return;
    }

    // Insert connection (request)
    const { error: connErr } = await supabase.from("partner_connections").insert([
      {
        user_id: user.id,
        partner_user_id: partner.user_id,
        status: "pending"
      }
    ]);
    if (connErr) {
      if (connErr.code === "23505") setError("You already have a pending/accepted connection.");
      else setError("Could not send connection request.");
    } else {
      setConnectionStatus("pending");
    }
    setLoading(false);
    fetchConnection();
  }, [user, fetchConnection]);

  // Accept/reject incoming request
  const respondToRequest = useCallback(
    async (accept: boolean) => {
      if (!user) return;
      setLoading(true);
      setError(null);
      // Find pending request where partner_user_id is me and update
      const { data: connections } = await supabase
        .from("partner_connections")
        .select("*")
        .eq("partner_user_id", user.id)
        .eq("status", "pending");
      if (!connections || connections.length === 0) {
        setError("No pending request to respond to.");
        setLoading(false);
        return;
      }
      const connId = connections[0].id;
      const update = accept
        ? { status: "accepted", responded_at: new Date().toISOString() }
        : { status: "rejected", responded_at: new Date().toISOString() };
      const { error: updErr } = await supabase
        .from("partner_connections")
        .update(update)
        .eq("id", connId);
      if (updErr) setError("Could not update request.");
      setLoading(false);
      fetchConnection();
    },
    [user, fetchConnection]
  );

  // Utility for UI to force reload of all
  const refresh = useCallback(() => {
    getMyPartnerProfile();
    fetchConnection();
  }, [getMyPartnerProfile, fetchConnection]);

  // Initial load effect
  useEffect(() => {
    getMyPartnerProfile();
    fetchConnection();
    // eslint-disable-next-line
  }, [user]);

  return {
    myCode,
    partner,
    connectionStatus,
    loading,
    error,
    createMyPartnerProfile,
    connectToPartner,
    respondToRequest,
    refresh,
    pendingRequest,
  };
}
