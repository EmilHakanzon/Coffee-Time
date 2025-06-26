import Toast from "react-native-toast-message";

export const showToast = {
  success: (message: string) => {
    Toast.show({
      type: "success",
      text1: "✅ Done!",
      text2: message,
      visibilityTime: 3000,
    });
  },

  info: (message: string) => {
    Toast.show({
      type: "info",
      text1: "ℹ️ Info",
      text2: message,
      visibilityTime: 3000,
    });
  },

  error: (message: string) => {
    Toast.show({
      type: "error",
      text1: "❌ Error",
      text2: message,
      visibilityTime: 4000,
    });
  },
};

export default showToast
