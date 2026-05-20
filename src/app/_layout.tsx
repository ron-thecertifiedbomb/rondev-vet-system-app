import "../global.css";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { API } from "@/utils/config/api";


import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { parse } from "date-fns";

export default function RootLayout() {
  const [isTimeMismatch, setIsTimeMismatch] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    checkTime();
  }, []);

  const checkTime = async () => {
    try {
      const res = await fetch(`${API}/appointments/slots?date=2026-01-01`);
      const data = await res.json();

      const parsedPH = parse(
        data.now,
        "MMM d, yyyy, h:mm:ss a",
        new Date()
      );

      const serverTime = fromZonedTime(parsedPH, "Asia/Manila");

      // ✅ UPDATED HERE
      const clientPH = toZonedTime(new Date(), "Asia/Manila");

      const diffMinutes =
        Math.abs(serverTime.getTime() - clientPH.getTime()) / 60000;

      console.log("RAW SERVER:", data.now);
      console.log("SERVER TIME:", serverTime.toString());
      console.log("CLIENT TIME:", clientPH.toString());
      console.log("DIFF MINUTES:", diffMinutes);

      setIsTimeMismatch(diffMinutes > 5);
    } catch (err) {
      console.log("Time check failed", err);
    } finally {
      setChecked(true);
    }
  };

  if (!checked) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

 
  

  return <Slot />;
}