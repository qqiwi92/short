import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Чтение тела запроса как JSON
    console.log(body.mode);
    await fetch(process.env.SERVER_URL + "/send_now", {
      method: "POST",
      body: JSON.stringify({
        mode: body.mode,
      }),
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
