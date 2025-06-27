/**
 * Direccionador
 * de comandos.
 *
 * @author Dev Gui
 */
const {
  DangerError,
  WarningError,
  InvalidParameterError,
} = require("../errors");
const { findCommandImport } = require(".");
const {
  verifyPrefix,
  hasTypeOrCommand,
  isLink,
  isAdmin,
} = require("../middlewares");
const { checkPermission } = require("../middlewares/checkPermission");
const {
  isActiveGroup,
  getAutoResponderResponse,
  isActiveAutoResponderGroup,
  isActiveAntiLinkGroup,
  isActiveOnlyAdmins,
} = require("./database");
const { errorLog } = require("../utils/logger");
const { ONLY_GROUP_ID } = require("../config");
const { badMacHandler } = require("./badMacHandler");

exports.dynamicCommand = async (paramsHandler, startProcess) => {
  const {
    commandName,
    prefix,
    sendWarningReply,
    sendErrorReply,
    remoteJid,
    sendReply,
    socket,
    userJid,
    fullMessage,
    webMessage,
  } = paramsHandler;

  const activeGroup = isActiveGroup(remoteJid);

  if (activeGroup && isActiveAntiLinkGroup(remoteJid) && isLink(fullMessage)) {
    if (!userJid) {
      return;
    }

    if (!(await isAdmin({ remoteJid, userJid, socket }))) {
      await socket.groupParticipantsUpdate(remoteJid, [userJid], "remove");

      await sendReply(
        "¡Anti-link activado! ¡Fuiste removido por enviar un enlace!"
      );

      await socket.sendMessage(remoteJid, {
        delete: {
          remoteJid,
          fromMe: false,
          id: webMessage.key.id,
          participant: webMessage.key.participant,
        },
      });

      return;
    }
  }

  const { type, command } = findCommandImport(commandName);

  if (ONLY_GROUP_ID && ONLY_GROUP_ID !== remoteJid) {
    return;
  }

  if (
    activeGroup &&
    (!verifyPrefix(prefix) || !hasTypeOrCommand({ type, command }))
  ) {
    if (isActiveAutoResponderGroup(remoteJid)) {
      const response = getAutoResponderResponse(fullMessage);

      if (response) {
        await sendReply(response);
      }
    }

    return;
  }

  if (activeGroup && !(await checkPermission({ type, ...paramsHandler }))) {
    await sendErrorReply("¡No tienes permiso para ejecutar este comando!");
    return;
  }

  if (
    activeGroup &&
    isActiveOnlyAdmins(remoteJid) &&
    !(await isAdmin({ remoteJid, userJid, socket }))
  ) {
    await sendWarningReply(
      "¡Solo los administradores pueden ejecutar comandos!"
    );
    return;
  }

  if (!activeGroup && command.name !== "on") {
    await sendWarningReply(
      "¡Este grupo está desactivado! ¡Pide al propietario del grupo que active el bot!"
    );

    return;
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
      startProcess,
    });
  } catch (error) {
    if (badMacHandler.handleError(error, `command:${command.name}`)) {
      await sendWarningReply(
        "Error temporal de sincronización. Inténtalo nuevamente en unos segundos."
      );
      return;
    }

    if (badMacHandler.isSessionError(error)) {
      errorLog(
        `Error de sesión durante ejecución de comando ${command.name}: ${error.message}`
      );
      await sendWarningReply(
        "Error de comunicación. Intenta ejecutar el comando nuevamente."
      );
      return;
    }

    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`¡Parámetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      errorLog("Error al ejecutar comando", error);
      await sendErrorReply(
        `¡Ocurrió un error al ejecutar el comando ${command.name}! ¡El desarrollador fue notificado!
     
📄 *Detalles*: ${error.message}`
      );
    }
  }
};
