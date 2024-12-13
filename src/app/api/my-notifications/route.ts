import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const {searchParams} = new URL(request.url)
  const cursorId = searchParams.get("cursorId");
  const size = searchParams.get("size")
  
  try {
    let url = `${API_URL}/my-notifications?size=${size}`

    if (cursorId) url += `&cursorId=${cursorId}`

    const response = await customFetch(url);

    if (!response.ok) {
      return NextResponse.json({error: "데이터 요청 실패"}, {status: response.status})
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}