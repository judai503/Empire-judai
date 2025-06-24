const fs = require("node:fs");
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { catBoxUpload } = require(`${BASE_DIR}/services/catbox`);
const { imgbbUpload } = require(`${BASE_DIR}/services/img-bb`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "generate-link",
  description: "Sube imágenes",
  commands: ["generate-link", "up", "upload"],
  usage: `${PREFIX}generate-link (etiqueta la imagen) o ${PREFIX}generar-link (responde a la imagen)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendReply,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "¡Debes etiquetar o responder una imagen!"
      );
    }

    await sendWaitReact();

    const filePath = await downloadImage(
      webMessage,
      `${getRandomNumber(10_000, 99_999)}`
    );

    const buffer = fs.readFileSync(filePath);

    let link = null;

    try {
      link = await catBoxUpload(buffer);
    } catch (error) {
      console.log(error);
      link = await imgbbUpload(buffer, {
        name: `upload-${getRandomNumber(1000, 9999)}`,
      });
    }

    await sendSuccessReact();

    await sendReply(`¡Aquí está el enlace de tu imagen!\n\n- ${link}`);

    fs.unlinkSync(filePath);
  },
};
