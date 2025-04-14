const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function cloudinaryHandler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { public_id, upload_preset } = req.body;

  const timestamp = Math.floor(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      upload_preset,
      public_id,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.status(200).json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}

module.exports = cloudinaryHandler;
