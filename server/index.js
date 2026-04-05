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
    const prompt = `
      You are an elite career strategist for hospitality workers transition to high-level corporate roles.
      
      User Info:
      Target Role: ${jobTitle}
      Years: ${years}
      Manual Inputs: ${responsibilities.join(', ')}
      ${resumeText ? `Uploaded Resume Text: ${resumeText}` : ''}

      Guidelines:
      - Transform service industry skills (high-volume, high-pressure, service excellence) into corporate power descriptors (operational efficiency, de-escalation, service delivery management, client retention).
      - Reframe the "Shift Hustle" into "Strategic Corporate Dominance."
      - Output exactly 4 powerful resume bullet points.
      - Output a LinkedIn "About" section (3-4 sentences in first person, confident, modern, not stiff).

      Format response as JSON:
      {
        "resume": ["str", "str", "str", "str"],
        "linkedin": "str"
      }
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
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

// Elite Transformation Endpoint (Paywall Placeholder)
app.post('/api/elite-checkout', async (req, res) => {
    const { email } = req.body;
    try {
        // Here we would normally create a Stripe checkout session
        // For this demo, we'll simulate a successful " Elite" order creation
        console.log(`Elite Checkout initiated for ${email}`);
        res.json({ success: true, message: 'Processing your Elite Transformation PDF generation.' });
    } catch (err) {
        res.status(500).json({ error: 'Payment processing failed.' });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Elite Translator API running on port ${PORT}`);
});
