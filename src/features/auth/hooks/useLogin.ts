// src/features/auth/hooks/useLogin.ts

import { useState } from "react";
import { api } from "@/utils/api";
import { LoginResponse } from "../types";
import { logger } from "@/utils/logger";
import Toast from "react-native-toast-message";

type LoginPayload = {
  email: string;
  password: string;
};

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const login = async (
    payload: LoginPayload,
  ): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      logger.info("Attempting login", {
        email: payload.email,
      });

      const response = await api<LoginResponse>("/api/vet/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // ✅ store token
      localStorage.setItem("access_token", response.access_token);

      logger.info("Access token stored");
      logger.info("Login successful", response.user);

      setMessage(response.message);

      // ✅ success toast
      Toast.show({
        type: "success",
        text1: response.message,
      });

      return response;
    } catch (err: any) {
      logger.error("Login failed", err);

      const errorMessage = err?.message || "Failed to login";

      setError(errorMessage);

      // ✅ error toast
      Toast.show({
        type: "error",
        text1: errorMessage,
      });

      return null;
    } finally {
      setLoading(false);

      logger.info("Login request completed");
    }
  };

  return {
    login,
    loading,
    error,
    message,
  };
}
