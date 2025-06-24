const { PREFIX } = require(`${BASE_DIR}/config`);
const { attp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "attp",
  description: "Crea stickers de texto animados.",
  commands: ["attp"],
  usage: `${PREFIX}attp prueba`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendWaitReact,
    args,
    sendStickerFromURL,
    sendSuccessReact,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Necesitas introducir el texto que quieres convertir en sticker."
      );
    }

    await sendWaitReact();

    const url = await attp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
