/**
 * ʍɛռʊ
 *
 * @author Dev Judai
 */
const { BOT_NAME, PREFIX } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");

exports.menuMessage = () => {
  const date = new Date();

  return `🌀═「ℬ𝒾ℯ𝓃𝓋ℯ𝓃𝒾𝒹ℴ 」═🌀${readMore()}
┃👑
┃👑 • ${BOT_NAME}
┃👑 • Fecha: ${date.toLocaleDateString("es-es")}
┃👑 • Hora: ${date.toLocaleTimeString("es-es")}
┃👑 • Prefijo: ${PREFIX}
┃👑 • Versión: ${packageInfo.version}
🌀═「ℰ𝓂𝓅𝒾𝓇ℯ  」═🌀


╭━━⪩ DUEÑO ⪨━━
▢
▢ • ${PREFIX}exec
▢ • ${PREFIX}get-id
▢ • ${PREFIX}off
▢ • ${PREFIX}on
▢ • ${PREFIX}set-menu-image
▢
╰━━─「🌌」─━━

╭━━⪩ ΛDMIПIƧƬЯΛDӨЯΣƧ ⪨━━
▢
▢ • ${PREFIX}anti-link (1/0)
▢ • ${PREFIX}Invocar/Todos
▢ • ${PREFIX}Ban/Kick/Alv
▢ • ${PREFIX}clear
▢ • ${PREFIX}close
▢ • ${PREFIX}delete
▢ • ${PREFIX}demote
▢ • ${PREFIX}exit (1/0)
▢ • ${PREFIX}hidetag/N/Tag/Notificar
▢ • ${PREFIX}mute
▢ • ${PREFIX}only-admin (1/0)
▢ • ${PREFIX}open
▢ • ${PREFIX}promote
▢ • ${PREFIX}reveal
▢ • ${PREFIX}schedule-message
▢ • ${PREFIX}unmute
▢ • ${PREFIX}welcome (1/0)
▢
╰━━─「⭐」─━━

╭━━⪩ PRINCIPAL ⪨━━
▢
▢ • ${PREFIX}attp
▢ • ${PREFIX}fake-chat
▢ • ${PREFIX}generate-link
▢ • ${PREFIX}get-lid
▢ • ${PREFIX}google-search
▢ • ${PREFIX}perfil
▢ • ${PREFIX}profile
▢ • ${PREFIX}raw-message
▢ • ${PREFIX}rename
▢ • ${PREFIX}samples-of-messages
▢ • ${PREFIX}sticker
▢ • ${PREFIX}to-image
▢ • ${PREFIX}ttp
▢ • ${PREFIX}yt-search
▢
╰━━─「🚀」─━━

╭━━⪩ DESCARGAS ⪨━━
▢
▢ • ${PREFIX}play-audio
▢ • ${PREFIX}play-video
▢ • ${PREFIX} Spotify 
▢ • ${PREFIX}yt-mp3
▢ • ${PREFIX}yt-mp4
▢
╰━━─「🎶」─━━

╭━━⪩ JUEGOS ⪨━━
▢
▢ • ${PREFIX}abrazar
▢ • ${PREFIX}besar
▢ • ${PREFIX}bofetada
▢ • ${PREFIX}cenar
▢ • ${PREFIX}dado
▢ • ${PREFIX}golpear
▢ • ${PREFIX}luchar
▢ • ${PREFIX}matar
▢
╰━━─「🎡」─━━

╭━━⪩ IA ⪨━━
▢
▢ • ${PREFIX}gemini
▢ • ${PREFIX}ia-sticker
▢ • ${PREFIX}pixart
▢ • ${PREFIX}stable-diffusion-turbo
▢
╰━━─「🚀」─━━

╭━━⪩ LIENZO ⪨━━
▢
▢ • ${PREFIX}blur
▢ • ${PREFIX}contrast
▢ • ${PREFIX}gray
▢ • ${PREFIX}invert
▢ • ${PREFIX}jail
▢ • ${PREFIX}mirror
▢ • ${PREFIX}pixel
▢ • ${PREFIX}rip
▢
╰━━─「❇」─━━`;
};
