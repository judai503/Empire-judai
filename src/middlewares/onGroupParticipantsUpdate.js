/**
 * Evento llamado cuando un usuario
 * entra o sale de un grupo de WhatsApp.
 *
 * @author Dev Gui
 */
const { getProfileImageData } = require("../services/baileys");
const fs = require("fs");
const { onlyNumbers } = require("../utils");
const {
  isActiveWelcomeGroup,
  isActiveExitGroup,
} = require("../utils/database");

const { catBoxUpload } = require("../services/catbox");
const {
  spiderAPITokenConfigured,
  exit,
  welcome,
} = require("../services/spider-x-api");

exports.onGroupParticipantsUpdate = async ({
  userJid,
  remoteJid,
  socket,
  action,
}) => {
  try {
    if (!remoteJid.endsWith("@g.us")) {
      return;
    }

    if (isActiveWelcomeGroup(remoteJid) && action === "add") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Enlace inválido");
          }

          const url = welcome(
            "participante",
            "¡Eres el nuevo miembro del grupo!",
            link
          );

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `¡Bienvenido a nuestro grupo, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `¡Bienvenido a nuestro grupo, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `¡Bienvenido a nuestro grupo, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    } else if (isActiveExitGroup(remoteJid) && action === "remove") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Enlace inválido");
          }

          const url = exit("miembro", "Fuiste un buen miembro", link);

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `¡Adiós, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `¡Adiós, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `¡Adiós, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    }
  } catch (error) {
    console.error("Error al procesar evento onGroupParticipantsUpdate:", error);
    process.exit(1);
  }
};
