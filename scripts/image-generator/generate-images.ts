import * as dotenv from 'dotenv';
import * as path from 'path';
import axios from 'axios';
import fs from 'fs';

// Load .env from project root
const projectRoot = path.resolve(__dirname, '..', '..');
const envPath = path.join(projectRoot, '.env');
dotenv.config({ path: envPath });

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
if (!STABILITY_API_KEY) {
  console.error('Error: STABILITY_API_KEY is not defined in .env');
  process.exit(1);
}

async function generateCartoonBackground() {
  const prompt = "Cartoon illustration of a bright green grassy hill under a vivid blue sky with fluffy white clouds, inspired by the Windows XP Bliss wallpaper, wide landscape, child-friendly, vibrant colors, no text";
  const response = await axios.post(
    'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
    {
      text_prompts: [{ text: prompt }],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      samples: 1,
      steps: 30,
    },
    {
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.data.artifacts || !response.data.artifacts[0].base64) {
    throw new Error('No image data returned from Stability API');
  }
  const outputPath = path.join(projectRoot, 'dogbreed-app', 'public', 'assets', 'images', 'background.png');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(response.data.artifacts[0].base64, 'base64'));
  console.log(`Saved cartoon background to ${outputPath}`);
}

generateCartoonBackground().catch(error => {
  console.error('Error generating cartoon background:', error);
  process.exit(1);
}); 