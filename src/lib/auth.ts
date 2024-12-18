// lib/auth.ts
import { jwtDecode } from "jwt-decode";
import API_URL from "../constants/config";

interface DecodedToken {
  exp?: number;
}

/**
 * 토큰의 유효성을 검증합니다.
 * @param token JWT 토큰 문자열
 * @returns 유효하면 true, 아니면 false
 */
export function verifyToken(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const expirationTime = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    return !!expirationTime && expirationTime > currentTime;
  } catch (error) {
    console.error("토큰 검증 중 오류 발생:", error);
    return false;
  }
}

/**
 * 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급받습니다.
 * @param refreshToken 리프레시 토큰
 * @returns 새로운 액세스 토큰 또는 null
 */
export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/auth/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      console.error("토큰 재발급 실패:", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return data.accessToken || null;
  } catch (error) {
    console.error("토큰 재발급 중 오류 발생:", error);
    return null;
  }
}
