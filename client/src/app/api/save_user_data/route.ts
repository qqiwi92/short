import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Чтение тела запроса как JSON
    await fetch(process.env.SERVER_URL + "/save_user_data", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ status: "success" }); // Отправка ответа в формате JSON
  } catch (err) {
    console.error(err);
    return NextResponse.error(); // Обработка ошибок
  }
}
