import app from './app';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/connection';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server Open & Connected To Database 🤟');
    });
  })
  .catch((err) => console.log(err));
