import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { activityId: number } }) {
  const { activityId } = params;
  const { scheduleId, headCount } = await request.json();

  try {
    const response = await customFetch(`${API_URL}/activities/${activityId}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduleId, headCount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
