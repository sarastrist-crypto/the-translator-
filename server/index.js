import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Multi-part form handling for Resume upload
const upload = multer({ storage: multer.memoryStorage() });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post('/api/translate', upload.single('resume'), async (req, res) => {
  const { name, email, jobTitle, years, responsibilities: responsibilitiesRaw } = req.body;
  const responsibilities = JSON.parse(responsibilitiesRaw || '[]');
  
  let resumeText = "";
  if (req.file) {
    try {
      const data = await pdf(req.file.buffer);
      resumeText = data.text;
      console.log('Resume parsed successfully');
    } catch (err) {
      console.error('PDF Parse Error:', err);
    }
  }

  try {
    // 1. Save/Update Lead to Supabase
    const { data: lead, error: leadErr } = await supabase
      .from('leads')
      .upsert([{ name, email, job_title: jobTitle, years_experience: years }], { onConflict: 'email' })
      .select()
      .single();

    if (leadErr) throw leadErr;

      // 2. Call Claude to Translate
      const systemPrompt = `You are a high-fidelity career concierge for executive hospitality transitions.
      Your task is to reframe professional expertise in relationship management and high-stakes service quality into corporate boardroom narratives.
      
      TONE DIRECTIVES:
      - QUALITY OVER QUANTITY: Never generate percentages, dollar amounts, or quantified metrics (e.g., "98%", "increased by 22%", "$5M revenue") unless the user explicitly provided them.
      - RELATIONSHIP INTELLIGENCE: Focus on the high-level psychological and operational ability to maintain brand fidelity and client relationship equity.
      - HUMAN-CENTRIC: Write naturally. Avoid generic AI jargon. 
      - INDUSTRY ACUITY: Pivot service saves into relationship intelligence and professional dominance.
      
      Output exactly 4 high-fidelity bullet points focusing on service quality and a confident narrative. 
      Return ONLY as JSON:
      {
        "resume": ["str", "str", "str", "str"],
        "linkedin": "A discreet, boardroom-ready narrative."
      }`;

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-latest',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: `Target: ${jobTitle}. Inputs: ${responsibilities.join(', ')}. ${resumeText ? `Resume: ${resumeText}` : ''}` }],
      });

    const results = JSON.parse(response.content[0].text);

    // 3. Save Submission to Supabase
    const { error: subErr } = await supabase
      .from('submissions')
      .insert([{ 
        lead_id: lead.id, 
        responsibilities, 
        resume_output: results.resume, 
        linkedin_output: results.linkedin 
      }]);

    if (subErr) throw subErr;

    res.json(results);

  } catch (err) {
    console.error('Translation Error:', err);
    res.status(500).json({ error: 'Failed to sync with AI. Please check your inputs and try again.' });
  }
});

// Elite Transformation Endpoint
app.post('/api/elite-checkout', async (req, res) => {
    const { email } = req.body;
    try {
        console.log(`Elite Transformation ($2.99) initiated for ${email}`);
        res.json({ success: true, message: 'Processing your Boardroom Elite Portfolio generation.' });
    } catch (err) {
        res.status(500).json({ error: 'Elite payment processing failed.' });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Elite Translator API running on port ${PORT}`);
});
