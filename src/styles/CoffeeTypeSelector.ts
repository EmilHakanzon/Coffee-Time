import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  typeButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    minWidth: 80,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedType: {
    borderColor: "#8B4513",
    backgroundColor: "#FFF8DC",
  },
  typeImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  typeName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  selectedTypeName: {
    color: "#8B4513",
    fontWeight: "600",
  },
});

export default styles