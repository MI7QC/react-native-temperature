import { UNITS } from "../constant";

/**
 * Fonction qui retourne l'unité de température opposée à celle fournie en paramètre.
 * @param {string} unit - L'unité de température actuelle.
 * @returns {string} - L'unité de température opposée.
 */
function getOppositUnit(unit) {
  return unit == UNITS.celcius ? UNITS.faranheit : UNITS.celcius;
}

/**
 * Fonction qui convertit une température d'une unité à une autre.
 * @param {string} unit - L'unité de température actuelle de la valeur.
 * @param {number} value - La valeur de température à convertir.
 * @returns {number} - La valeur de température convertie.
 */
function convertTemperatureTo(unit, value) {
  if (unit == UNITS.celcius) {
    return (value - 32) / 1.8;
  } else {
    return value * 1.8 + 32;
  }
}

/**
 * Fonction qui vérifie si une température est considérée comme "froide" en fonction de son unité.
 * @param {number} value - La valeur de température à vérifier.
 * @param {string} unit - L'unité de température de la valeur.
 * @returns {boolean} - True si la température est considérée comme "froide", sinon false.
 */
function isIceTemperature(value, unit) {
  if (unit === UNITS.celcius) {
    return value < 0;
  } else {
    return value < 32;
  }
}

// Exporter les fonctions pour les rendre disponibles pour d'autres modules
export { getOppositUnit, convertTemperatureTo, isIceTemperature };
