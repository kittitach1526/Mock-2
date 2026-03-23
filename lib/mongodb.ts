// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // ในโหมด development ใช้ตัวแปร global เพื่อป้องกันการสร้าง connection ใหม่ทุกครั้งที่เซิร์ฟเวอร์ reload
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // ในโหมด production สร้าง connection ใหม่ตามปกติ
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;