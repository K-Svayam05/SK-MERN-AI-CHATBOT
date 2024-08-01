import https from 'https';
import fs from 'fs';
import app from './app';

const PORT = process.env.PORT || 5000;

const options = {
  key: fs.readFileSync('certs/private-key.pem'),
  cert: fs.readFileSync('certs/certificate.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
