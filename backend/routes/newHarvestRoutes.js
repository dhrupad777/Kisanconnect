

import { Router } from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

dotenv.config();
const router = Router();

// Initialize AI and sanitization
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    const sanitizedHTML = DOMPurify.sanitize(generatedText, {
      ALLOWED_TAGS: ['h3', 'p', 'ul', 'li', 'pre', 'br'],
      ALLOWED_ATTR: ['class'],
    });

    res.json({ generatedText: sanitizedHTML });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

export default router;