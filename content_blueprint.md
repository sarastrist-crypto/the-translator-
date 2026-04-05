# The Translator Landing Page & Content Guide

## Copy Breakdown

### Hero Section
- **Headline**: Translate Service into **Strategy.**
- **Subheadline**: You've built elite professional skills in hospitality. We help you reframe them for the corporate roles you're ready for.
- **CTA Button**: Translate My Experience

### "How it Works" (The Professional Bridge)
1. **Input Your Role**: Tell us what you do daily in the service industry (Lead Server, Bar Manager, Concierge).
2. **AI Re-framing**: Our AI (powered by Claude) translates your direct tasks into corporate-level competencies.
3. **Get Your Results**: Receive professional, ready-to-use resume bullet points and a confident LinkedIn "About" section.

### Tone & Style
- **Warm & Confident**: Avoid clinical "Resume Builder" vibes. The UI uses warm ambers and soft charcoals.
- **Human-Centric**: "Managed difficult guests" becomes "De-escalated high-pressure client situations while maintaining service standards."

---

## Technical Integration Guide

### 1. Supabase Setup
- Run the [supabase_schema.sql](file:///Users/tristianwalker/Antigravity%20Skills%20/the-translator/supabase_schema.sql) in your Supabase SQL Editor.
- Get your `SUPABASE_URL` and `SUPABASE_KEY` from settings.

### 2. Claude API
- Get your Anthropic API Key from the Console.
- Update the [.env](file:///Users/tristianwalker/Antigravity%20Skills%20/the-translator/server/.env) with your key.

---

## Deployment
- **Frontend**: Connect your GitHub repo to **Vercel** or **Netlify**.
- **Backend**: Deploy to **Render** or **Railway** (or use Next.js if you want to bundle it).
