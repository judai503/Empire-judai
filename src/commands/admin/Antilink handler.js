import { isAntilinkActive } from '../utils/database.js';

client.ev.on("messages.upsert", async ({ messages }) => {
  const m = messages[0];
  if (!m.message || !m.key.remoteJid?.endsWith("@g.us")) return;

  const chatId = m.key.remoteJid;
  if (!await isAntilinkActive(chatId)) return;

  const text = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
  const regex = /(https?:\/\/)?(www\.)?(t\.me|chat\.whatsapp|wa\.me|youtube\.com|youtu\.be|instagram\.com|facebook\.com|fb\.watch|tiktok\.com|telegram\.me)/i;

  if (regex.test(text)) {
    const sender = m.key.participant;
    const isAdmin = await isUserAdmin(sender, chatId); // implementa esta función
    if (isAdmin) return; // Opcional: no borrar a admins

    try {
      await client.sendMessage(chatId, { delete: m.key });
      await client.sendMessage(chatId, {
        text: `⛔ *Mensaje eliminado por contener enlaces prohibidos.*`,
        mentions: [sender],
      });
    } catch (err) {
      console.error("Error eliminando mensaje antilink:", err);
    }
  }
});
