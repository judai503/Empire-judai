let handler = async (m, { args, isGroup, isAdmin, command }) => {
  if (!isGroup) return m.reply("❌ Este comando solo funciona en grupos.");
  if (!isAdmin) return m.reply("❌ Solo los administradores pueden usar este comando.");

  const mode = args[0]?.toLowerCase();
  if (command === "on" && mode === "antilink") {
    if (await isAntilinkActive(m.chat)) return m.reply("⚠️ Antilink ya está activo.");
    await activateAntilink(m.chat);
    return m.reply("✅ Antilink activado.");
  }

  if (command === "off" && mode === "antilink") {
    if (!await isAntilinkActive(m.chat)) return m.reply("⚠️ Antilink ya está desactivado.");
    await deactivateAntilink(m.chat);
    return m.reply("❌ Antilink desactivado.");
  }
};

handler.command = /^(on|off)$/i;

export default handler;
