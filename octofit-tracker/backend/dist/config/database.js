"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.getApiBaseUrl = exports.MONGO_URI = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};
exports.getApiBaseUrl = getApiBaseUrl;
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(exports.MONGO_URI);
        console.log(`Connected to MongoDB: ${exports.MONGO_URI}`);
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
