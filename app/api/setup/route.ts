import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const dbName = process.env.MONGODB_DB

    const client = await clientPromise;
    const db = client.db(dbName);

    // 1. เช็คว่ามี User นี้หรือยัง
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "มีชื่อผู้ใช้นี้ในระบบแล้ว" }, { status: 400 });
    }

    // 2. แฮชรหัสผ่าน (เพื่อความปลอดภัย ไม่เก็บตัวหนังสือตรงๆ)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. บันทึกลง MongoDB
    await db.collection("users").insertOne({
      username,
      password: hashedPassword,
      role: "Operator", // ค่าเริ่มต้น
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, message: "ลงทะเบียนสำเร็จ" });
  } catch (error) {
    return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}