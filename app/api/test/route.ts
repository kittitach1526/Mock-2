// app/api/test/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // จำลองข้อมูลที่ปกติจะดึงจาก Database
  const data = {
    status: "Online",
    message: "ระบบเชื่อมต่อเรียบร้อยแล้ว!",
    serverTime: new Date().toLocaleTimeString()
  };

  return NextResponse.json(data);
}