import { setCityInfo, setCitySelector } from "./topSection.js";
import getAllCities from "./getAllCities.js";
import { dynamicCard, carouselSlider } from "./midSection.js";
import { dynamicContinentCard } from "./dynamicContinentCard.js";
import {
  sortContinentByName,
  sortContinentByTemperature,
} from "./sortContinent.js";

export let cityInputSelector = document.querySelector(
  ".city-selector > input[type=text]"
);

const preferenceIconSelector = document.querySelectorAll(
  ".preference-icon > .icons"
);

export const spinnerSelector = document.querySelector("#top-picker");

export const continentCardSelector = document.querySelector(
  ".continent-temp-data"
);

export const carouselSelector = document.querySelector(".carousel-container");

const leftArrowSelector = document.querySelector(".left-arrow");

const rightArrowSelector = document.querySelector(".right-arrow");

let activeElementSelector = document.querySelector(".active");

export let activePreferenceIconSelector = document.querySelectorAll(
  ".active > .icons > img"
);

let sortContinetByContinentNameSelector = document.querySelector(
  ".sort-continent_name"
);

let sortByContinentTemperatureSelector = document.querySelector(".sort-temp");

//IIFE for first page load.

(() => {
  const allCities = getAllCities();

  setCityInfo(allCities[0]);
  setCitySelector();
  dynamicCard("sunny");
  let sortedPopularContinentCities = sortContinentByName(true);
  const isSortedAscending = false;
  sortedPopularContinentCities = sortContinentByTemperature(
    sortedPopularContinentCities,
    isSortedAscending
  );

  dynamicContinentCard(sortedPopularContinentCities);
})();

// On Input change event listener for top section when city name changes

cityInputSelector.addEventListener("change", (e) => {
  cityInputSelector = document.querySelector(
    ".city-selector > input[type=text]"
  );
  let currentCityValue = cityInputSelector.value;
  const allCities = getAllCities();

  if (allCities.includes(currentCityValue)) {
    setCityInfo(currentCityValue);
  } else {
    alert("Please input correct city name");
    e.target.value = "";
  }
});

cityInputSelector.addEventListener("click", (e) => {
  e.target.value = "";
});

// Event listeners for all the icons in middle section of the UI.

preferenceIconSelector.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const weatherType = event.target.alt.split(" ")[0];
    activeElementSelector = document.querySelector(".active");

    activeElementSelector.classList.remove("active");
    el.parentElement.classList.add("active");

    dynamicCard(weatherType);
  });
});

// On input change event listener for mid section spinner

spinnerSelector.addEventListener("change", (e) => {
  const spinnerValue = e.target.value;
  if (spinnerValue > 10 || spinnerValue < 3) {
    console.error("Please select values between 10 and 3");
    if (spinnerValue < 3) spinnerSelector.value = 3;
    else spinnerSelector.value = 10;
  } else {
    let weatherType = document.querySelector(".active img").alt.split(" ")[0];
    dynamicCard(weatherType);
  }
});

// Left and right carousel button event Listeners

leftArrowSelector.addEventListener("click", carouselSlider);
rightArrowSelector.addEventListener("click", carouselSlider);

// Event listener to handle sorting of continent cards based on continent name

sortContinetByContinentNameSelector.addEventListener("click", (e) => {
  e.preventDefault();
  let ascendingSort =
    e.target.nextElementSibling.alt === "sort_up" ? true : false;

  if (ascendingSort) {
    e.target.nextElementSibling.alt = "sort_down";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowDown.svg";
    ascendingSort = false;
  } else {
    e.target.nextElementSibling.alt = "sort_up";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowUp.svg";
    ascendingSort = true;
  }

  let sortedMap = sortContinentByName(ascendingSort);
  sortByContinentTemperatureSelector = document.querySelector(".sort-temp");
  const continentAscendingTempSort =
    sortByContinentTemperatureSelector.querySelector("img").alt === "sort_up"
      ? true
      : false;
  sortedMap = sortContinentByTemperature(sortedMap, continentAscendingTempSort);
  dynamicContinentCard(sortedMap);
});

// Event listener to handle sorting of continent cards based on continent city temperature

sortByContinentTemperatureSelector.addEventListener("click", (e) => {
  e.preventDefault();
  let ascendingSort =
    e.target.nextElementSibling.alt === "sort_up" ? true : false;

  if (ascendingSort) {
    e.target.nextElementSibling.alt = "sort_down";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowDown.svg";
    ascendingSort = false;
  } else {
    e.target.nextElementSibling.alt = "sort_up";
    e.target.nextElementSibling.src = "./assets/Images_Icons/arrowUp.svg";
    ascendingSort = true;
  }
  sortContinetByContinentNameSelector = document.querySelector(
    ".sort-continent_name"
  );
  const continentAscendingContinentSort =
    sortContinetByContinentNameSelector.querySelector("img").alt === "sort_up"
      ? true
      : false;
  let sortedMap = sortContinentByName(continentAscendingContinentSort);
  sortedMap = sortContinentByTemperature(sortedMap, ascendingSort);
  dynamicContinentCard(sortedMap);
});