import { Tabs } from "expo-router";

export default function AppLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="booking" options={{ title: "Booking" }} />
        </Tabs>
    );
}