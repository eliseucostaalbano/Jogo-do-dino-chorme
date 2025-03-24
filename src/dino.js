import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomValue.js"

const dinoElem = document.querySelector("[data-dino]")
const PULO_VELO = 0.45
const GRAVIDADE = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let estaPulando
let dinoFrame
let frameTimeAtual
let yVelocidade

export function setUpDino() {
    estaPulando = false
    dinoFrame = 0
    frameTimeAtual = 0
    yVelocidade = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", pular)
    document.addEventListener("keydown", pular)
}

export function updateDino(delta, veloEscala) {
    lidarCorrer(delta, veloEscala) 
    lidarPulo(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoDerrota() {
  dinoElem.src = "images/dino-lose.png"
}

function lidarCorrer(delta, veloEscala) {
  if (estaPulando) {
    dinoElem.src = "images/dino-stationary.png"
    return
  }

  if (frameTimeAtual >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `images/dino-run-${dinoFrame}.png`
    frameTimeAtual -= FRAME_TIME
  }
  frameTimeAtual += delta * veloEscala
}

function lidarPulo(delta) {
 if (!estaPulando) {
    return
  }

  incrementCustomProperty(dinoElem, "--bottom", yVelocidade * delta)

  if(getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    estaPulando = false
  }
   yVelocidade -= GRAVIDADE * delta
}

function pular(e) {
  if (e.code !== "Space" || estaPulando) return

  yVelocidade = PULO_VELO
  estaPulando = true
}