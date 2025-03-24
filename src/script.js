import { updateChao, setUpChao } from "./chao.js"
import { updateDino, setUpDino } from "./dino.js"

const MUNDO_WIDTH = 100
const MUNDO_HEIGHT = 20
const VELO_ESCALA_INCREASE = 0.00001

const mundoElem = document.querySelector("[data-mundo]")
const placarElem  = document.querySelector("[data-placar]")
const telaInicioElem = document.querySelector("[data-tela-inicio]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", lidarStart, { once: true })

let ultimoTempo 
let veloEscala
let placar

function update(tempo){
  if (ultimoTempo == null) {
    ultimoTempo = tempo
    window.requestAnimationFrame(update)
    return
  }
  const delta  = tempo - ultimoTempo
  updateChao(delta, veloEscala)
  updateDino(delta, veloEscala)
  updateVeloEscala(delta)
  updatePlacar(delta)

  ultimoTempo = tempo
window.requestAnimationFrame(update)
}

function updateVeloEscala(delta) {
  veloEscala += delta * VELO_ESCALA_INCREASE
}

function updatePlacar(delta) {
  placar += delta * 0.01
  placarElem.textContent = Math.floor(placar)
}

function lidarStart() {
 ultimoTempo = null
 veloEscala = 1
 placar = 0
 setUpChao()
 setUpDino()
 telaInicioElem.classList.add("esconde")
 window.requestAnimationFrame(update)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < MUNDO_WIDTH / MUNDO_HEIGHT) {
    worldToPixelScale = window.innerWidth / MUNDO_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / MUNDO_HEIGHT
  }

  mundoElem.style.width = `${MUNDO_WIDTH * worldToPixelScale}px`
  mundoElem.style.height = `${MUNDO_HEIGHT * worldToPixelScale}px`
}