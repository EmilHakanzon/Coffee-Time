const fetch = require("node-fetch");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

async function sendPush(token, title, body) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: token,
      title,
      body,
    }),
  });
}

// Exempel: kör varje minut och kolla reminders
setInterval(async () => {
  const now = Date.now();
  const snapshot = await db.collection("users").get();
  snapshot.forEach(async (doc) => {
    const data = doc.data();
    if (data.reminderTime && data.reminderTime <= now && data.expoPushToken) {
      await sendPush(
        data.expoPushToken,
        "Kaffedags!",
        "Nu är det dags för nästa kaffe ☕️",
      );
      // Uppdatera reminderTime eller ta bort om du vill
    }
  });
}, 60 * 1000);
