import { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { API } from "@/utils/config/api";
import { checkSystemTime } from "@/utils/time/checkSystemTime";
import { Slot } from "@/features/booking/types";



export const useBookingBootstrap = (date: string) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!date) return;
    bootstrap();
  }, [date]);

  const bootstrap = async () => {
    try {
      const res = await fetch(`${API}/appointments/slots?date=${date}`);
      const data = await res.json();

      setSlots(data.slots);

      const isMismatch = checkSystemTime(data.now);

      if (isMismatch && pathname !== "/invalid-time") {
        router.replace("/invalid-time");
        return;
      }
    } catch (err) {
      console.log("Bootstrap failed", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    slots,
    loading,
  };
};
``;
