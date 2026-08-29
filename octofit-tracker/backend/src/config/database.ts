import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB: ${MONGO_URI}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};
