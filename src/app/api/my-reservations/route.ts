import API_URL from "@/constants/config";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get("cursorId");
  const size = searchParams.get("size") || "2";

  const response = await fetch(`${API_URL}/my-reservations?size=${size}&cursorId=${cursorId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "데이터 요청 실패",
      },
      {
        status: response.status,
      },
    );
  }
  const data = await response.json();
  return NextResponse.json(data);
}
