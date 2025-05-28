import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reminderActive: {
    borderColor: "Ff6B68",
    borderWidth: 2,
  },
  reminderInactive: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  statuTime: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B4513",
    marginTop: 4,
  },
  LastCoffeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lastCoffeeLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  lastCoffeeType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
  },
  lastCoffeeTime: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  selectorContainer: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    paddingLeft: 5,
  },
  drinkButton: {
    backgroundColor: "#8B4513",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  drinkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B4513",
  },
  greetingContainer: {
    paddingTop: 32,
    paddingBottom: 8,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#8B4513",
    letterSpacing: 1,
  },
});

export default styles;
