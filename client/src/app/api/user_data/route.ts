export async function GET() {
  try {
    const data = await fetch(process.env.SERVER_URL + "/user_data", {
      method: "GET", cache: "no-store"
    });
    const json = await data.json();
    return new Response(
      JSON.stringify({ emails: json.emails, tags: json.tags, error: false }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, private",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: [],
        error: true,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, private",
        },
      },
    );
  }
}
