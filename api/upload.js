// api/upload.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64 } = req.body;

  if (!base64) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const uploadRes = await cloudinary.uploader.upload(base64, {
      folder: "nut-detector",
    });
    return res.status(200).json({ url: uploadRes.secure_url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
