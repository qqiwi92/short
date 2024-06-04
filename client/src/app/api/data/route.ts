export async function GET() {
  try {
    const data = await fetch("https://1082-5-18-225-126.ngrok-free.app/data", {
      method: "GET",
    });
    const json = await data.json();
    return new Response(JSON.stringify({data: json, error: false}));
  } catch (error) {
    return new Response(JSON.stringify({ error: true }));
  }
}
