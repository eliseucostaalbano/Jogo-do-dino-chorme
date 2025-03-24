import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomValue.js"

const VELO = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const mundoElem = document.querySelector("[data-mundo]")

let proximoTempoCactus

export function setUpCactus() {
proximoTempoCactus = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateCactus(delta, veloEscala) {

  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * veloEscala * VELO * -1)
    if(getCustomProperty(cactus, "--left") <= -100) {
       cactus.remove()
    }
  })


  if (proximoTempoCactus <= 0) {
    criarCactus()
    proximoTempoCactus = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / veloEscala
  }
    proximoTempoCactus -= delta
}

function criarCactus() {
  const cactus = document.createElement("img")
  cactus.classList.add("cactus")
  cactus.dataset.cactus = true
  cactus.src = "images/cactus.png" 
  setCustomProperty(cactus, "--left", 100)
  mundoElem.append(cactus)
}


function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
