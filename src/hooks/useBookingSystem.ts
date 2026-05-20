import { useEffect, useState } from "react";
import { API } from "@/utils/config/api";
import { parse } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export type Slot = {
  time: string;
  available: boolean;
};

export const useBookingSystem = (date: string) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isTimeMismatch, setIsTimeMismatch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!date) return;
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/appointments/slots?date=${date}`);
      const data = await res.json();

      setSlots(data.slots);

      // ✅ time validation
      const parsedPH = parse(data.now, "MMM d, yyyy, h:mm:ss a", new Date());

      const serverTime = fromZonedTime(parsedPH, "Asia/Manila");
      const clientPH = toZonedTime(new Date(), "Asia/Manila");

      const diffMinutes =
        Math.abs(serverTime.getTime() - clientPH.getTime()) / 60000;

      setIsTimeMismatch(diffMinutes > 5);
    } catch (err) {
      console.log("Booking system fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    slots,
    isTimeMismatch,
    loading,
  };
};
