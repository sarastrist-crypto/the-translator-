-- 1. Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    job_title TEXT,
    years_experience TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    responsibilities TEXT[] NOT NULL,
    resume_output JSONB NOT NULL,
    linkedin_output TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS (Optional, for public access from client side if needed)
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- 4. Create Policy (Allow INSERT from client-side if needed, but we handle it backend-side)
-- CREATE POLICY "Allow public insert" ON leads FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow public insert" ON submissions FOR INSERT WITH CHECK (true);
