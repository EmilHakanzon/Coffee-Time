import Toast from "react-native-toast-message";

export function showCoffeeReminderToast() {
  Toast.show({
    type: "info",
    text1: "☕ Coffee Time!",
    text2: "It's time for your next coffee break!",
    position: "top",
    visibilityTime: 3500,
    autoHide: true,
    topOffset: 60,
    props: {},
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  });
}

