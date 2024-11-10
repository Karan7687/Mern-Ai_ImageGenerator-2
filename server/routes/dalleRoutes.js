import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai'; // Import the default OpenAI class

dotenv.config();

const router = express.Router();

// Initialize OpenAI instance with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Generate image using DALL-E model
    const aiResponse = await openai.images.generate({
      prompt,
      model: 'dall-e-3', 
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data[0].b64_json; 

    res.status(200).json({ photo: image });

  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data?.error?.message || 'Error occurred during image generation.');
  }
});

export default router;
