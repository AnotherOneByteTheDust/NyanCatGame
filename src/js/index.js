import { NyanCat } from "./NyanCat.js";
import { Asteroid } from "./Asteroid.js";
import { Howl, Howler } from "howler";

import music from "../assets/sound/nyan-cat.mp3";
import nyanCatImage from "../assets/img/nyan-cat.png";

const gameSound = new Howl({
  src: music
});

const page = document.querySelector(".screen");
const asteroids = [];

function startGame () {
  const game = document.getElementById("game");
  const asteroidsDom = document.getElementById("asteroids");

  const nyanCat = new NyanCat();
  game.appendChild(nyanCat);

  setInterval(() => {
    const asteroid = new Asteroid();
    asteroidsDom.appendChild(asteroid);
    asteroids.push(asteroid);
  }, 800);

  window.addEventListener("keydown", (event) => {
    const keyName = event.key;

    if (keyName === "ArrowUp") {
      nyanCat.moveUp();
    } else if (keyName === "ArrowDown") {
      nyanCat.moveDown();
    }
  });

  setInterval(() => {
    asteroids.forEach((asteroid) => {
      const removeAsteroid = asteroid.move();

      if (removeAsteroid) {
        asteroidsDom.removeChild(asteroid);
        asteroids.splice(0, 1);
      }

      const catPosition = nyanCat.getCoords();
      asteroid.hit(catPosition);
    });
  }, 25);
}

function prepareGame () {
  page.textContent = "";
  gameSound.play();
  const element = document.createElement("div");
  element.id = "game";
  const parent = document.createElement("div");
  parent.classList.add("flex");
  element.appendChild(parent);
  const child = document.createElement("div");
  child.id = "asteroids";
  parent.appendChild(child);
  page.appendChild(element);
  startGame();
}

function displayMenu () {
  const element = document.createElement("div");
  element.id = "menu";
  let child = document.createElement("button");
  child.id = "play";
  child.textContent = "play";
  child.setAttribute("type", "button");
  child.addEventListener("click", prepareGame);
  element.appendChild(child);
  child = document.createElement("img");
  child.setAttribute("src", nyanCatImage);
  element.appendChild(child);
  page.appendChild(element);
}

displayMenu();
