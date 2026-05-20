import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { API } from "../../utils/api";



export default function HomeScreen() {

  type Slot = {
    time: string;
    available: boolean;
  };

  const [slots, setSlots] = useState<Slot[]>([]);




  const fetchSlots = async () => {
    console.log("Using API:", API); // DEBUG

    const res = await fetch(
      `${API}/appointments/slots?date=2026-05-20`
    );

    const data = await res.json();
    setSlots(data);
  };


  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">

      {/* Title */}
      <Text className="text-xl font-bold mb-4">
        🐾 Vet Booking
      </Text>

      {/* Slots */}
      {slots.map((slot) => (
        <TouchableOpacity
          key={slot.time}
          disabled={!slot.available}
          className={`p-4 mb-2 rounded-lg ${slot.available
              ? "bg-cyan-500"
              : "bg-gray-300"
            }`}
        >
          <Text
            className={`text-base ${slot.available
                ? "text-white"
                : "text-gray-500"
              }`}
          >
            {slot.time}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}