import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { getSlots } from "@/features/booking/api";
import { formatTime } from "@/utils/date";

type Props = {
    visible: boolean;
    date: string;
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
    onClose,
    onSubmit,
}: Props) {
    const [ownerName, setOwnerName] = useState("");
    const [petName, setPetName] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [slots, setSlots] = useState<any[]>([]);
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        if (visible) loadSlots();
    }, [visible, date]);

    const loadSlots = async () => {
        const data = await getSlots(date);
        setSlots(data);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/30 justify-center items-center px-4">
                <View className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">

                    <Text className="text-text-primary font-semibold text-lg mb-4">
                        Complete Booking
                    </Text>

                    {/* ✅ Dropdown */}
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

                    {/* ✅ Inputs */}
                    <TextInput
                        placeholder="Owner Name"
                        value={ownerName}
                        onChangeText={setOwnerName}
                        placeholderTextColor="#9ca3af"
                        className="bg-surface border border-border rounded-xl px-4 py-3 mb-3 text-text-primary"
                    />

                    <TextInput
                        placeholder="Pet Name"
                        value={petName}
                        onChangeText={setPetName}
                        placeholderTextColor="#9ca3af"
                        className="bg-surface border border-border rounded-xl px-4 py-3 mb-3 text-text-primary"
                    />

                    <TextInput
                        placeholder="Service Type"
                        value={serviceType}
                        onChangeText={setServiceType}
                        placeholderTextColor="#9ca3af"
                        className="bg-surface border border-border rounded-xl px-4 py-3 mb-4 text-text-primary"
                    />

                    {/* ✅ Buttons */}
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={onClose}
                            className="flex-1 border border-border rounded-lg py-3"
                        >
                            <Text className="text-center text-text-secondary">
                                Cancel
                            </Text>
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
                            className="flex-1 bg-surfaceSoft border border-border rounded-lg py-3"
                        >
                            <Text className="text-center text-text-primary font-medium">
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}