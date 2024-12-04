import { customFetch } from "@/utils/customFetch";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const body = await request.json();

  try {
    const response = await customFetch(`${API_URL}/my-reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "데이터 삭제 (수정)실패" }, { status: response.status });
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
