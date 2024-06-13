import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await fetch(process.env.SERVER_URL + "/send_now", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
    }
    });
    return NextResponse.json({ status: "success" }); // Отправка ответа в формате JSON
  } catch (err) {
    console.error(err);
    return NextResponse.error(); // Обработка ошибок
  }
}
