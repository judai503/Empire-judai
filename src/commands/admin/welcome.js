const { isActiveWelcomeGroup } = require(`${BASE_DIR}/utils/database`);

client.ev.on("group-participants.update", async (update) => {
  const { id: groupJid, participants, action } = update;

  if (action !== "add") return;

  const isWelcomeEnabled = await isActiveWelcomeGroup(groupJid);
  if (!isWelcomeEnabled) return;

  try {
    const metadata = await client.groupMetadata(groupJid);
    const description = metadata.desc || "¡Bienvenido al grupo!";

    for (const user of participants) {
      await client.sendMessage(groupJid, {
        text: `@${user.split("@")[0]}\n${description}`,
        mentions: [user],
      });
    }
  } catch (err) {
    console.error("Error al enviar mensaje de bienvenida:", err);
  }
});
