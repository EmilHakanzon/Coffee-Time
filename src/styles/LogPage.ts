
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 1,
  },
  dayCard: {
    backgroundColor: "#f8f4f0",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#8B4513",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  dayTitle: { fontWeight: "bold", fontSize: 18, color: "#8B4513" },
  daySummary: { color: "#8B4513", marginTop: 6, fontSize: 15 },
  dayDetails: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#8B4513",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  logImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#f3e9e2",
  },
  logType: { fontWeight: "bold", fontSize: 16, color: "#8B4513" },
  logTime: { color: "#666", fontSize: 13, marginTop: 2 },
});

export default styles;