import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceApiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', routes);

app.get('/api', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiUrl: codespaceApiUrl
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at', mongoUri);
    console.log('API available at', codespaceApiUrl);
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

startServer();
