const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const fs = require("fs");
const { canvas } = require(`${BASE_DIR}/services/spider-x-api`);
const { catBoxUpload } = require(`${BASE_DIR}/services/catbox`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "jail",
  description:
    "Genero una edición como si la persona estuviera en la cárcel con la imagen que envíes",
  commands: ["carcel", "cadeia", "jail"],
  usage: `${PREFIX}jail (marca la imagen) o ${PREFIX}jail (responde la imagen)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromURL,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "¡Necesitas marcar una imagen o responder a una imagen!"
      );
    }

    await sendWaitReact();

    const filePath = await downloadImage(
      webMessage,
      `${getRandomNumber(10_000, 99_999)}`
    );

    const buffer = fs.readFileSync(filePath);
    const link = await catBoxUpload(buffer);
    const url = canvas("jail", link);

    await sendSuccessReact();

    await sendImageFromURL(url, "¡Imagen generada!");

    fs.unlinkSync(filePath);
  },
};
