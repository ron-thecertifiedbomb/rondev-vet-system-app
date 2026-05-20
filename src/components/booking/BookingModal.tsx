import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { Slot } from "@/hooks/useBookingSystem";
import { formatTime } from "@/utils/date";

type Props = {
    visible: boolean;
    date: string;
    slots: Slot[];
    onClose: () => void;
    onSubmit: (data: {
        ownerName: string;
        petName: string;
        serviceType: string;
        time: string;
    }) => void;
};

export default function BookingModal({
    visible,
    date,
    slots,
    onClose,
    onSubmit,
}: Props) {
    const [ownerName, setOwnerName] = useState("");
    const [petName, setPetName] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/30 justify-center items-center px-4">
                <View className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">

                    <Text className="text-text-primary font-semibold text-lg mb-4">
                        Complete Booking
                    </Text>

                    <Text className="text-xs text-text-muted mb-2">
                        Select Time
                    </Text>

                    <View className="bg-surface border border-border rounded-xl mb-4">
                        <Picker
                            selectedValue={selectedTime}
                            onValueChange={(value) => setSelectedTime(value)}
                        >
                            <Picker.Item label="Select a time..." value="" />

                            {slots
                                .filter((slot) => slot.available)
                                .map((slot) => (
                                    <Picker.Item
                                        key={slot.time}
                                        label={formatTime(slot.time)}
                                        value={slot.time}
                                    />
                                ))}
                        </Picker>
                    </View>

                    <TextInput
                        placeholder="Owner Name"
                        value={ownerName}
                        onChangeText={setOwnerName}
                        className="bg-surface border border-border rounded-xl px-4 py-3 mb-3"
                    />

                    <TextInput
                        placeholder="Pet Name"
                        value={petName}
                        onChangeText={setPetName}
                        className="bg-surface border border-border rounded-xl px-4 py-3 mb-3"
                    />

                    <TextInput
                        placeholder="Service Type"
                        value={serviceType}
                        onChangeText={setServiceType}
                        className="bg-surface border border-border rounded-xl px-4 py-3 mb-4"
                    />

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={onClose}
                            className="flex-1 border rounded-lg py-3"
                        >
                            <Text className="text-center">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={!selectedTime}
                            onPress={() => {
                                onSubmit({
                                    ownerName,
                                    petName,
                                    serviceType,
                                    time: selectedTime,
                                });

                                setOwnerName("");
                                setPetName("");
                                setServiceType("");
                                setSelectedTime("");

                                onClose();
                            }}
                            className="flex-1 border rounded-lg py-3"
                        >
                            <Text className="text-center font-medium">
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}
