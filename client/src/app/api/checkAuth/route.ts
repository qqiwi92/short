import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function GET() {
  return new Response(
    JSON.stringify({
      auth: hasCookie("auth", { cookies })
        ? getCookie("auth", { cookies })
        : false,
    }),
    {
      status: 200,
    },
  );
}
