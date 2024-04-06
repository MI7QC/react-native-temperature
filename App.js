import { ImageBackground, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { InputTemperature } from "./componnents/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "./componnents/TemperatureDisplay/TemperatureDisplay";
import { DEFAUL_TEMPERATURE, DEFAUL_UNIT } from "./constant";
import {
  convertTemperatureTo,
  getOppositUnit,
  isIceTemperature,
} from "./services/temperature-service";
import { ButtonConvert } from "./componnents/ButtonConvert/ButtonConvert";

/**
 * Point d'entrée de l'application.
 */
export default function App() {
  // État pour la température saisie par l'utilisateur
  const [inputValue, setInputValue] = useState(DEFAUL_TEMPERATURE);
  // État pour l'unité de température actuellement affichée
  const [currentUnit, setCurrectUnit] = useState(DEFAUL_UNIT);
  // État pour l'image de fond actuellement affichée
  const [currentBackground, setCurrentBackground] = useState();

  // Calcul de l'unité opposée
  const oppositUnit = getOppositUnit(currentUnit);

  // useEffect(() => {...}, [inputValue, currentUnit]) : 
  // Cet effet est exécuté chaque fois que les valeurs de inputValue ou currentUnit changent.
  // Il surveille ces valeurs et déclenche l'effet chaque fois qu'elles sont mises à jour.
  // Effet pour mettre à jour l'image de fond en fonction de la température saisie
  useEffect(() => {
    // Conversion de la température saisie en un nombre à virgule flottante
    const temperatureAsFloat = Number.parseFloat(inputValue);

    // Vérification si la température saisie est un nombre
    if (!isNaN(temperatureAsFloat)) {
      // Vérification si la température est suffisamment basse pour être considérée comme "froide"
      const isColdBackground = isIceTemperature(inputValue, currentUnit);

      // Mise à jour de l'image de fond en fonction du résultat
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  }, [inputValue, currentUnit]);

  /**
   * Fonction pour obtenir la température convertie dans l'unité opposée.
   * @returns La température convertie avec une décimale.
   */
  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    if (!isNaN(valueAsFloat)) {
      return convertTemperatureTo(oppositUnit, valueAsFloat).toFixed(1);
    } else {
      return "";
    }
  }

  // Rendu de l'interface utilisateur
  return (
    <ImageBackground source={currentBackground} style={s.container}>
      <View style={s.workspace}>
        {/* Affichage de la température convertie */}
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={oppositUnit}
        />
        {/* Saisie de la température */}
        <InputTemperature
          onChangeText={setInputValue}
          defaultValue={DEFAUL_TEMPERATURE}
          unit={currentUnit}
        />
        {/* Bouton de conversion d'unité */}
        <ButtonConvert
          onPress={() => {
            setCurrectUnit(oppositUnit);
          }}
          unit={currentUnit}
        />
      </View>
    </ImageBackground>
  );
}
