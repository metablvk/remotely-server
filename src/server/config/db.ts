import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Conneccted: ${conn.connection.host}`);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export default connectDB;
