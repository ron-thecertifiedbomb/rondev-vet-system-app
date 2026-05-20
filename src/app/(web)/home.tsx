import { useState } from "react";
import {  View, Text } from "react-native";
import DateSelector from "@/components/booking/DateSelector";
import BookingModal from "@/components/booking/BookingModal";
import { createBooking } from "@/features/booking/api";
import { getTodayDate } from "@/utils/date";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [date, setDate] = useState(getTodayDate());
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="max-w-md mx-auto w-full px-6 py-10">

        {/* ✅ DATE SELECTOR */}
        <DateSelector
          date={date}
          onDateChange={setDate}
          onContinue={() => setShowModal(true)}
        />

      </View>

      {/* ✅ MODAL */}
      <BookingModal
        visible={showModal}
        date={date}
        onClose={() => setShowModal(false)}
        onSubmit={async (data) => {
          try {
            await createBooking({
              ...data,
              date,
            });

            // ✅ SHOW TOAST
            setToast(true);

            setTimeout(() => {
              setToast(false);
            }, 2000);

          } catch (err) {
            console.error("❌ Booking failed", err);
          }
        }}
      />

      {/* ✅ TOAST */}
      {toast && (
        <View className="absolute bottom-8 left-0 right-0 items-center">
          <View className="bg-black px-4 py-3 rounded-full">
            <Text className="text-white text-sm">
              ✅ Booking confirmed
            </Text>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}
``