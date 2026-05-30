import RegisterForm from "@/components/authentication/forms/RegisterForm";
import ScreenContainer from "@/components/common/layout/ScreenContainer";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { RegisterPayload } from "@/features/auth/types";
import { showAlert } from "@/hooks/crossPlatformAlert";
import { getRouteByRole } from "@/utils/routes/routeResolver";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function Registration() {
  const router = useRouter();
  const { register, loading } = useAuth();


    const handleRegister = async (data: RegisterPayload) => {
        try {
            const response = await register(data);

            if (response) {
                showAlert("", response.message);

                const role = response.user.role;
                const route = getRouteByRole(role, "app");

                router.replace(route);
            }
        } catch (err: any) {
            showAlert("", err.message);
        }
    };


  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >

        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 24,
          }}
        >

          <RegisterForm
            loading={loading}
            onSubmit={handleRegister}
            onLoginPress={() => router.push("/(auth)/login")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
