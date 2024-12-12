"use server";
import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";

export const updateReservationStatus = async (
  activityId: string,
  reservationId: number,
  status: "confirmed" | "declined",
): Promise<void> => {
  try {
    const response = await customFetch(`${API_URL}/my-activities/${activityId}/reservations/${reservationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update reservation. Status: ${response.status}`);
    }
    console.log("✅ Reservation updated successfully.");
  } catch (error) {
    console.error("❌ Failed to update reservation:", error);
    throw error;
  }
};
