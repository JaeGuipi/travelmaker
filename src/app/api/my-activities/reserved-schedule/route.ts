import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activityId = searchParams.get("activityId");
  const date = searchParams.get("date");
  try {
    if (!activityId || !date) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const res = await customFetch(`${API_URL}/my-activities/${activityId}/reserved-schedule?date=${date}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch reservation schedule: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("🚨 서버 라우트 에러:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
