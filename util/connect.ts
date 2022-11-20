import mongoose from 'mongoose';


const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI as string);
const disconnectMongo = async () => mongoose.disconnect();

const db = { connectMongo, disconnectMongo };

export default db