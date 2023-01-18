import getAllContinents from "./allContinents.js";
import getWeatherData from "../WeatherData.js";
import { getCityDateAndTime } from "./../index.js";

const getPopularContinentCities = async () => {
  const weatherData = await getWeatherData();
  const allContinents = await getAllContinents(weatherData);
  const continentCityMap = new Map();

  for (let continent of allContinents) {
    continentCityMap.set(continent, []);
  }

  for (let city in weatherData) {
    const continent = weatherData[city].timeZone.split("/")[0];
    const eachContinentCityNumber = continentCityMap.get(continent).length;
    const cityTime = getCityDateAndTime(weatherData[city].dateAndTime)[1].split(
      "-"
    )[0];
    const isAm = getCityDateAndTime(weatherData[city].dateAndTime)[2];
    const formattedTime = isAm ? cityTime + " AM" : cityTime + " PM";
    const cityWeather = {
      continentName: continent,
      cityName: weatherData[city].cityName,
      cityTime: formattedTime,
      cityTemperature: weatherData[city].temperature,
      cityHumidity: weatherData[city].humidity,
    };

    if (continent !== "Pacific" && eachContinentCityNumber < 2) {
      const currentContinent = continentCityMap.get(continent);
      currentContinent.push(cityWeather);
      continentCityMap.set(continent, currentContinent);
    }
  }

  return continentCityMap;
};

export default getPopularContinentCities;