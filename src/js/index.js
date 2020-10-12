import { NyanCat } from "./NyanCat.js";
import { Asteroid } from "./Asteroid.js";
import { Howl, Howler } from "howler";

import music from "../assets/sound/nyan-cat.mp3";
import nyanCatImage from "../assets/img/nyan-cat.png";

const gameSound = new Howl({
  src: music,
  loop: true
});

const page = document.querySelector(".screen");
const asteroids = [];

// Spawns NyanCat and Asteroids
function startGame () {
  const game = document.getElementById("game");
  const asteroidsDom = document.getElementById("asteroids");
  const scoreboard = document.querySelector(".score");
  const nyanCat = new NyanCat();
  let score = 0;
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
        scoreboard.textContent = (++score).toString().padStart(5, "0");
      }

      const catPosition = nyanCat.getCoords();
      asteroid.hit(catPosition);
    });
  }, 25);
}

// Create game screen
function prepareGame () {
  page.textContent = "";
  gameSound.play();
  const element = document.createElement("div");
  element.id = "game";
  let parent = document.createElement("div");
  parent.classList.add("flex");
  element.appendChild(parent);
  let child = document.createElement("div");
  child.id = "asteroids";
  parent.appendChild(child);
  parent = document.createElement("div");
  parent.id = "scoreboard";
  child = document.createElement("div");
  child.classList.add("score");
  child.textContent = "00000";
  parent.appendChild(child);
  element.appendChild(parent);

  page.appendChild(element);
  startGame();
}

// Create Menu Screen
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
