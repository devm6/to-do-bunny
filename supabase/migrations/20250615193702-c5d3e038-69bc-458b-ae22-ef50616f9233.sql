
-- 1. Create a table for storing a user's unique partner code
CREATE TABLE public.accountability_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  partner_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create a table to manage pending/accepted partner connections
CREATE TABLE public.partner_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  partner_user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, accepted, rejected, removed
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  UNIQUE(user_id, partner_user_id)
);

-- 3. Create a table to store partner activity updates (for notifications/gamification)
CREATE TABLE public.partner_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  partner_user_id UUID NOT NULL,
  activity TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. RLS for accountability_partners: only owner can select/insert/update/delete
ALTER TABLE public.accountability_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can manage own partner code"
  ON public.accountability_partners
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. RLS for partner_connections: only users involved can view/manage
ALTER TABLE public.partner_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view/manage own partner connections"
  ON public.partner_connections
  FOR ALL
  USING (auth.uid() = user_id OR auth.uid() = partner_user_id)
  WITH CHECK (auth.uid() = user_id OR auth.uid() = partner_user_id);

-- 6. RLS for partner_activities: only users involved can view
ALTER TABLE public.partner_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own/partner activities"
  ON public.partner_activities
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = partner_user_id);

CREATE POLICY "Users can insert activity involving themselves"
  ON public.partner_activities
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

