import { NyanCat } from "./NyanCat.js";
import { Asteroid } from "./Asteroid.js";
import { Howl, Howler } from "howler";

import music from "../assets/sound/nyan-cat.mp3";
import nyanCatImage from "../assets/img/nyan-cat.png";

const gameSound = new Howl({
  src: music,
  loop: true,
  preload: true
});

const gameOverSound = new Howl({
  src: music,
  loop: true,
  preload: true,
  volume: 0.5,
  rate: 0.75
});

const page = document.querySelector(".screen");

class MeteorCreator {
  constructor (nyanCat) {
    this.asteroids = [];

    this.asteroidsDom = document.getElementById("asteroids");
    this.scoreboard = document.querySelector(".score");
    this.score = 0;
    this.nyanCat = nyanCat;
    this.asteroidsCreator = setInterval(() => {
      const asteroid = new Asteroid();
      this.asteroidsDom.appendChild(asteroid);
      this.asteroids.push(asteroid);
    }, 800);

    this.astoroidsSpawn = setInterval(() => {
      this.asteroids.forEach((asteroid) => {
        const removeAsteroid = asteroid.move();

        if (removeAsteroid) {
          this.asteroidsDom.removeChild(asteroid);
          this.asteroids.splice(0, 1);
          this.scoreboard.textContent = (++this.score).toString().padStart(5, "0");
        }

        const catPosition = this.nyanCat.getCoords();

        if (asteroid.hit(catPosition)) {
          this.gameover();
        }
      });
    }, 25);
  }

  // Game over
  gameover () {
    clearInterval(this.asteroidsCreator);
    clearInterval(this.astoroidsSpawn);
    // Creates Game Over window
    const game = document.getElementById("game");
    const element = document.createElement("div");
    element.classList.add("flexcenter");
    const parent = document.createElement("div");
    parent.classList.add("gameover", "flexcolumn");
    let child = document.createElement("span");
    child.textContent = "Game Over";
    parent.appendChild(child);
    child = document.createElement("button");
    child.textContent = "Exit";
    child.id = "exit";
    child.addEventListener("click", displayMenu);
    parent.appendChild(child);
    element.appendChild(parent);
    game.appendChild(element);
  }
}

function startGame () {
  const game = document.getElementById("game");
  const nyanCat = new NyanCat();
  game.appendChild(nyanCat);

  window.addEventListener("keydown", (event) => {
    const keyName = event.key;

    if (keyName === "ArrowUp") {
      nyanCat.moveUp();
    } else if (keyName === "ArrowDown") {
      nyanCat.moveDown();
    }
  });

  const gameplay = new MeteorCreator(nyanCat);
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
  if (gameSound.playing) {
    gameSound.stop();
  }
  page.textContent = "";
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
