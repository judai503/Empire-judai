let handler = async (m, { conn, isAdmin, isBotAdmin, command, participants }) => {
  // Verifica que esté en grupo
  if (!m.isGroup) return m.reply("❌ Este comando solo funciona en grupos.");
  if (!isAdmin) return m.reply("❌ Solo los administradores pueden usar este comando.");
  if (!isBotAdmin) return m.reply("⚠️ Necesito ser administrador para expulsar usuarios.");

  // Obtiene al usuario objetivo (mencionado o citado)
  let target;
  if (m.quoted) {
    target = m.quoted.sender;
  } else if (m.mentionedJid && m.mentionedJid.length) {
    target = m.mentionedJid[0];
  }

  if (!target) return m.reply("⚠️ Menciona o responde a un usuario para expulsarlo.");

  // Verifica que no sea admin el objetivo
  const isTargetAdmin = participants.some(p => p.id === target && p.admin);
  if (isTargetAdmin) return m.reply("❌ No puedo expulsar a un administrador.");

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], "remove");
    await conn.sendMessage(m.chat, {
      text: `👢 Usuario expulsado: @${target.split("@")[0]}`,
      mentions: [target]
    });
  } catch (err) {
    console.error(err);
    m.reply("❌ Ocurrió un error al expulsar al usuario.");
  }
};

handler.command = /^(kick|ban|alv)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
