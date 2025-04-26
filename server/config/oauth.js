const dotenv = require('dotenv');
dotenv.config();

 const GOOGLE = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.VRAKSH_SERVER_URL}/api/auth/google/callback`,
  };
  
const GITHUB = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    redirect_uri: `${process.env.VRAKSH_SERVER_URL}/api/auth/github/callback`,
  };

  module.exports = {
    GOOGLE,
    GITHUB,
  };