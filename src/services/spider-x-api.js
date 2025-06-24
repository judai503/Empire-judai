/**
 * Funciones de comunicación
 * con la API de Spider X.
 *
 * @author Dev Gui
 */
const axios = require("axios");

const { SPIDER_API_TOKEN, SPIDER_API_BASE_URL } = require("../config");

/**
 * No configures el token de la API de Spider X aquí, configúralo en: src/config.js
 */
const spiderAPITokenConfigured =
  SPIDER_API_TOKEN && SPIDER_API_TOKEN !== "tu_token_aqui";

exports.spiderAPITokenConfigured = spiderAPITokenConfigured;

exports.play = async (type, search) => {
  if (!search) {
    throw new Error("¡Necesitas introducir lo que quieres buscar!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/play-${type}?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.download = async (type, url) => {
  if (!url) {
    throw new Error(
      "¡Necesitas introducir una URL de YouTube de lo que quieres buscar!"
    );
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/downloads/${type}?url=${encodeURIComponent(
      url
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.gemini = async (text) => {
  if (!text) {
    throw new Error("¡Necesitas introducir el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  const { data } = await axios.post(
    `${SPIDER_API_BASE_URL}/ai/gemini?api_key=${SPIDER_API_TOKEN}`,
    {
      text,
    }
  );

  return data.response;
};

exports.attp = async (text) => {
  if (!text) {
    throw new Error("¡Necesitas introducir el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  return `${SPIDER_API_BASE_URL}/stickers/attp?text=${encodeURIComponent(
    text
  )}&api_key=${SPIDER_API_TOKEN}`;
};

exports.ttp = async (text) => {
  if (!text) {
    throw new Error("¡Necesitas introducir el parámetro de texto!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  return `${SPIDER_API_BASE_URL}/stickers/ttp?text=${encodeURIComponent(
    text
  )}&api_key=${SPIDER_API_TOKEN}`;
};

exports.search = async (type, search) => {
  if (!search) {
    throw new Error("¡Necesitas introducir el parámetro de búsqueda!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/search/${type}?search=${encodeURIComponent(
      search
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.welcome = (title, description, imageURL) => {
  if (!title || !description || !imageURL) {
    throw new Error(
      "¡Necesitas introducir el título, la descripción y la URL de la imagen!"
    );
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  return `${SPIDER_API_BASE_URL}/canvas/welcome?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(
    description
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${SPIDER_API_TOKEN}`;
};

exports.exit = (title, description, imageURL) => {
  if (!title || !description || !imageURL) {
    throw new Error(
      "¡Necesitas introducir el título, la descripción y la URL de la imagen!"
    );
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  return `${SPIDER_API_BASE_URL}/canvas/goodbye?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(
    description
  )}&image_url=${encodeURIComponent(imageURL)}&api_key=${SPIDER_API_TOKEN}`;
};

exports.imageAI = async (type, description) => {
  if (!description) {
    throw new Error("¡Necesitas introducir la descripción de la imagen!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  const paramSearch = type === "stable-diffusion-turbo" ? "search" : "text";

  const { data } = await axios.get(
    `${SPIDER_API_BASE_URL}/ai/${type}?${paramSearch}=${encodeURIComponent(
      description
    )}&api_key=${SPIDER_API_TOKEN}`
  );

  return data;
};

exports.canvas = (type, imageURL) => {
  if (!imageURL) {
    throw new Error("¡Necesitas introducir la URL de la imagen!");
  }

  if (!spiderAPITokenConfigured) {
    throw new Error("Token de la API de Spider X no configurado");
  }

  return `${SPIDER_API_BASE_URL}/canvas/${type}?image_url=${encodeURIComponent(
    imageURL
  )}&api_key=${SPIDER_API_TOKEN}`;
};
