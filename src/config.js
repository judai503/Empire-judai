const path = require("path");

// Prefijo de los comandos.
exports.PREFIX = ".";

// Emoji del bot (cambia si lo prefieres).
exports.BOT_EMOJI = "🤖";

// Nombre del bot (cambia si lo prefieres).
exports.BOT_NAME = "EMPIRE";

// Número del bot.
// Solo números, exactamente como aparece en WhatsApp.
exports.BOT_NUMBER = "558112345678";

// Número del dueño del bot.
// Solo números, exactamente como aparece en WhatsApp.
exports.OWNER_NUMBER = "50360438371";

// LID del dueño del bot.
// Para obtener el LID del dueño del bot, usa el comando <prefijo>get-lid @mencionar o +teléfono del dueño.
exports.OWNER_LID = "219999999999999@lid";

// Directorio de los comandos
exports.COMMANDS_DIR = path.join(__dirname, "commands");

// Directorio de archivos de medios.
exports.DATABASE_DIR = path.resolve(__dirname, "..", "database");

// Directorio de archivos de medios.
exports.ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Directorio de archivos temporales.
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// Tiempo de espera en milisegundos por evento (evita el baneo).
exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 300;

// Plataforma de API's
exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Obtén tu token, creando una cuenta en: https://api.spiderx.com.br.
exports.SPIDER_API_TOKEN = "tu_token_aqui";

// Si deseas responder solo a un grupo específico,
// coloca su ID en la configuración siguiente.
// Para saber el ID del grupo, usa el comando <prefijo>getid
// Reemplaza <prefijo> por el prefijo del bot (ej: /getid).
exports.ONLY_GROUP_ID = "";

// Directorio base del proyecto.
exports.BASE_DIR = path.resolve(__dirname);

// Si deseas usar proxy.
exports.PROXY_PROTOCOL = "http";
exports.PROXY_HOST = "ip";
exports.PROXY_PORT = "puerto";
exports.PROXY_USERNAME = "usuario";
exports.PROXY_PASSWORD = "contraseña";
