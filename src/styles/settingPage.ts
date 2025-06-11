import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f8f8f8" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 1,
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    top:20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
    color: "#8B4513",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  countryPickerButton: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#8B4513",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#8B4513",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  savedText: {
    color: "#388e3c",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
