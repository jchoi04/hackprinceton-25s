import * as LocalAuthentication from "expo-local-authentication";

export const handleBiometricAuth = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return "Biometric authentication is not available.";
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate",
    fallbackLabel: "Use Password",
  });

  return result.success ? "Biometric authentication successful!" : "Biometric authentication failed.";
};
