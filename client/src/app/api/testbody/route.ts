// /app/api/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Чтение тела запроса как JSON
    console.log(body);  
    return NextResponse.json({ message: "Hello, world!", body: body }); // Отправка ответа в формате JSON
  } catch (err) {
    console.error(err);
    return NextResponse.error(); // Обработка ошибок
  }
}
