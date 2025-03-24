import { updateChao, setUpChao } from "./chao.js"
import { updateDino, setUpDino, getDinoRect, setDinoDerrota } from "./dino.js"
import { updateCactus, setUpCactus, getCactusRects } from "./cactus.js"

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
  updateCactus(delta, veloEscala)
  updateVeloEscala(delta)
  updatePlacar(delta)
  
  if(checarDerrota()) {
  return lidarDerrota()
  }

  ultimoTempo = tempo
window.requestAnimationFrame(update)
}

function checarDerrota() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(react => colissao(react, dinoRect))
}

function colissao(rect1, rect2) {
  return rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top
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
 setUpCactus()
 telaInicioElem.classList.add("esconde")
 window.requestAnimationFrame(update)
}

function lidarDerrota() {
  setDinoDerrota()
  setTimeout(() => {
    document.addEventListener("keydown", lidarStart, { once: true })
    telaInicioElem.classList.remove("esconde")
  }, 100);
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