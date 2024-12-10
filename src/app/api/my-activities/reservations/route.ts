import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 2️⃣ **Query Parameters**
    const { searchParams } = new URL(request.url);
    const activityId = searchParams.get("activityId");
    const cursorId = searchParams.get("cursorId") ? Number(searchParams.get("cursorId")) : undefined;
    const size = searchParams.get("size") ? Number(searchParams.get("size")) : 10; // 기본값 10
    const scheduleId = searchParams.get("scheduleId");
    const status = searchParams.get("status");

    // 🔥 **필수 필드 검증**
    if (!scheduleId) return NextResponse.json({ error: "scheduleId is required" }, { status: 400 });
    if (!status) return NextResponse.json({ error: "status is required" }, { status: 400 });

    // 🔥 **API 요청을 구성**
    const queryParams = new URLSearchParams({
      ...(cursorId && { cursorId: cursorId.toString() }),
      ...(size && { size: size.toString() }),
      scheduleId: scheduleId.toString(),
      status: status.toString(),
    });

    const apiUrl = `${API_URL}/my-activities/${activityId}/reservations?${queryParams.toString()}`;

    // 🔥 **외부 API 요청 보내기**
    const response = await customFetch(apiUrl, {
      method: "GET",
    });

    // 🔥 **응답 처리**
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: "Failed to fetch reservation data", details: error },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 });
  }
}
